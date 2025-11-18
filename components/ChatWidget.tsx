
import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { Chat, Content, LiveSession, LiveServerMessage, Blob } from '@google/genai';
import { startChat, connectToLiveSession } from '../services/geminiService';
import type { ChatMessage } from '../types';
import { BotIcon } from './icons/BotIcon';
import { CloseIcon } from './icons/CloseIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { MicrophoneIcon } from './icons/MicrophoneIcon';
import { StopCircleIcon } from './icons/StopCircleIcon';
import { encode, LiveAudioUtils } from '../utils/audioUtils';
import { CopyIcon } from './icons/CopyIcon';
import { CheckIcon } from './icons/CheckIcon';

const CHAT_HISTORY_KEY = 'business-ai-solver-chat-history';

interface ChatWidgetProps {
    onAnalyzeRequest: (text: string) => void;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ onAnalyzeRequest }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>(() => {
        try {
            const saved = localStorage.getItem(CHAT_HISTORY_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed;
                }
            }
        } catch (error) {
            console.error("Failed to load chat history:", error);
        }
        return [{ role: 'model', content: '¡Hola! Soy tu asistente de negocios. ¿Cómo puedo ayudarte hoy?' }];
    });
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isVoiceMode, setIsVoiceMode] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [copiedMessageIndex, setCopiedMessageIndex] = useState<number | null>(null);

    const chatRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const sessionPromiseRef = useRef<Promise<LiveSession> | null>(null);
    const inputAudioContextRef = useRef<AudioContext | null>(null);
    const outputAudioContextRef = useRef<AudioContext | null>(null);
    const mediaStreamRef = useRef<MediaStream | null>(null);
    const mediaStreamSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
    const outputSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
    const nextStartTimeRef = useRef<number>(0);
    const currentInputTranscriptionRef = useRef<string>('');
    const currentOutputTranscriptionRef = useRef<string>('');

    useEffect(() => {
        if (isOpen && !chatRef.current) {
            const historyForApi = messages.slice();
            if (historyForApi.length > 0 && historyForApi[0].role === 'model') {
                historyForApi.shift();
            }

            const history: Content[] = historyForApi.map(msg => ({
                role: msg.role,
                parts: [{ text: msg.content }],
            }));
            chatRef.current = startChat(history);
        }
    }, [isOpen, messages]);

    useEffect(() => {
        try {
            localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages));
        } catch (error) {
            console.error("Failed to save chat history:", error);
        }
    }, [messages]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading, isListening]);

    const cleanupVoice = useCallback(async () => {
        if (sessionPromiseRef.current) {
            try {
                const session = await sessionPromiseRef.current;
                session.close();
            } catch (e) {
                console.error("Error closing session:", e);
            }
        }
        mediaStreamRef.current?.getTracks().forEach(track => track.stop());
        mediaStreamSourceRef.current?.disconnect();
        scriptProcessorRef.current?.disconnect();
        if (inputAudioContextRef.current?.state !== 'closed') {
          inputAudioContextRef.current?.close();
        }
        if (outputAudioContextRef.current?.state !== 'closed') {
          outputAudioContextRef.current?.close();
        }

        sessionPromiseRef.current = null;
        inputAudioContextRef.current = null;
        outputAudioContextRef.current = null;
        mediaStreamRef.current = null;
        mediaStreamSourceRef.current = null;
        scriptProcessorRef.current = null;
        setIsVoiceMode(false);
        setIsListening(false);
        setIsSpeaking(false);
    }, []);

    const handleAnalyze = useCallback((content: string) => {
        onAnalyzeRequest(content);
        setIsOpen(false);
        cleanupVoice();
    }, [onAnalyzeRequest, cleanupVoice]);

    const handleToggleVoiceMode = async () => {
        if (isVoiceMode) {
            await cleanupVoice();
        } else {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                mediaStreamRef.current = stream;
                setIsVoiceMode(true);
                setIsListening(true);

                inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
                outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });

                sessionPromiseRef.current = connectToLiveSession({
                    onopen: () => {
                        console.log("Voice session opened.");
                        if (!mediaStreamRef.current || !inputAudioContextRef.current) return;
                        mediaStreamSourceRef.current = inputAudioContextRef.current.createMediaStreamSource(mediaStreamRef.current);
                        scriptProcessorRef.current = inputAudioContextRef.current.createScriptProcessor(4096, 1, 1);
                        scriptProcessorRef.current.onaudioprocess = (audioProcessingEvent) => {
                            const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
                            const l = inputData.length;
                            const int16 = new Int16Array(l);
                            for (let i = 0; i < l; i++) {
                                int16[i] = inputData[i] * 32768;
                            }
                            const pcmBlob: Blob = {
                                data: encode(new Uint8Array(int16.buffer)),
                                mimeType: 'audio/pcm;rate=16000',
                            };
                            sessionPromiseRef.current?.then((session) => {
                                session.sendRealtimeInput({ media: pcmBlob });
                            });
                        };
                        mediaStreamSourceRef.current.connect(scriptProcessorRef.current);
                        scriptProcessorRef.current.connect(inputAudioContextRef.current.destination);
                    },
                    onmessage: async (message: LiveServerMessage) => {
                        if (message.serverContent?.inputTranscription) {
                            currentInputTranscriptionRef.current += message.serverContent.inputTranscription.text;
                        }
                         if (message.serverContent?.outputTranscription) {
                            setIsSpeaking(true);
                            currentOutputTranscriptionRef.current += message.serverContent.outputTranscription.text;
                        }

                        const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData.data;
                        if (base64Audio && outputAudioContextRef.current) {
                            setIsSpeaking(true);
                            nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputAudioContextRef.current.currentTime);
                            const audioBuffer = await LiveAudioUtils.decodeAudioData(LiveAudioUtils.decode(base64Audio), outputAudioContextRef.current, 24000, 1);
                            const source = outputAudioContextRef.current.createBufferSource();
                            source.buffer = audioBuffer;
                            source.connect(outputAudioContextRef.current.destination);
                            source.addEventListener('ended', () => {
                                outputSourcesRef.current.delete(source);
                                if (outputSourcesRef.current.size === 0) {
                                    setIsSpeaking(false);
                                }
                            });
                            source.start(nextStartTimeRef.current);
                            nextStartTimeRef.current += audioBuffer.duration;
                            outputSourcesRef.current.add(source);
                        }
                        
                         if (message.serverContent?.turnComplete) {
                            if (currentInputTranscriptionRef.current.trim()) {
                                setMessages(prev => [...prev, { role: 'user', content: currentInputTranscriptionRef.current.trim() }]);
                            }
                             if (currentOutputTranscriptionRef.current.trim()) {
                                setMessages(prev => [...prev, { role: 'model', content: currentOutputTranscriptionRef.current.trim() }]);
                            }
                            currentInputTranscriptionRef.current = '';
                            currentOutputTranscriptionRef.current = '';
                        }
                        
                        if (message.serverContent?.interrupted) {
                            for (const source of outputSourcesRef.current.values()) {
                                source.stop();
                                outputSourcesRef.current.delete(source);
                            }
                            nextStartTimeRef.current = 0;
                            setIsSpeaking(false);
                        }
                    },
                    onerror: (e: ErrorEvent) => {
                        console.error("Voice session error:", e);
                        setMessages(prev => [...prev, { role: 'model', content: "Hubo un error con la sesión de voz. Por favor, intenta de nuevo." }]);
                        cleanupVoice();
                    },
                    onclose: (e: CloseEvent) => {
                        console.log("Voice session closed.");
                        cleanupVoice();
                    },
                });
            } catch (error) {
                console.error("Failed to start voice mode:", error);
                alert("No se pudo acceder al micrófono. Por favor, revisa los permisos en tu navegador.");
                setIsVoiceMode(false);
                setIsListening(false);
            }
        }
    };
    
    useEffect(() => {
        return () => {
            cleanupVoice();
        };
    }, [cleanupVoice]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        const userMessage: ChatMessage = { role: 'user', content: inputValue };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        if (chatRef.current) {
            try {
                const result = await chatRef.current.sendMessage(userMessage.content);
                const modelMessage: ChatMessage = { role: 'model', content: result.text };
                setMessages(prev => [...prev, modelMessage]);
            } catch (error) {
                console.error("Chat error:", error);
                const errorMessage: ChatMessage = { role: 'model', content: 'Lo siento, ocurrió un error. Por favor, intenta de nuevo.' };
                setMessages(prev => [...prev, errorMessage]);
            } finally {
                setIsLoading(false);
            }
        }
    };
    
    const handleCopy = (index: number, content: string) => {
        navigator.clipboard.writeText(content);
        setCopiedMessageIndex(index);
        setTimeout(() => setCopiedMessageIndex(null), 2000);
    };

    const renderVoiceFooter = () => (
        <div className="p-4 border-t border-slate-700 flex flex-col items-center justify-center h-[76px]">
            <div className="flex items-center gap-4">
                <button
                    onClick={handleToggleVoiceMode}
                    className="p-4 bg-red-600/80 text-white rounded-full shadow-lg hover:bg-red-700/80 transition-transform transform hover:scale-110"
                    aria-label="Detener chat de voz"
                >
                    <StopCircleIcon className="h-6 w-6" />
                </button>
            </div>
            <p className="text-xs text-gray-400 mt-2">
                 {isListening && !isSpeaking && 'Escuchando...'}
                 {isSpeaking && 'Hablando...'}
            </p>
        </div>
    );

    const renderTextFooter = () => (
         <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-700">
            <div className="relative">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Escribe tu pregunta..."
                    className="w-full p-3 pr-24 bg-slate-800 border border-slate-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    disabled={isLoading || isVoiceMode}
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                    <button
                        type="button"
                        onClick={handleToggleVoiceMode}
                        className="flex items-center justify-center w-12 text-gray-400 hover:text-orange-400"
                        aria-label="Iniciar chat de voz"
                    >
                         <MicrophoneIcon />
                    </button>
                    <button type="submit" className="flex items-center justify-center w-12 text-gray-400 hover:text-orange-400 disabled:opacity-50" disabled={isLoading || !inputValue.trim()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                    </button>
                </div>
            </div>
        </form>
    );

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-5 right-5 bg-orange-600 text-white p-4 rounded-full shadow-lg hover:bg-orange-700 transition-transform transform hover:scale-110"
                aria-label="Abrir chat de ayuda"
            >
                <BotIcon className="h-6 w-6" />
            </button>
        );
    }

    return (
        <div className="fixed bottom-5 right-5 w-[calc(100%-2.5rem)] max-w-sm h-[70vh] max-h-[600px] flex flex-col bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 z-50 chat-widget-enter">
            <header className="flex items-center justify-between p-4 border-b border-slate-700">
                <h3 className="text-lg font-bold flex items-center gap-2"><SparklesIcon className="text-orange-400 h-5 w-5"/> Asistente Rápido</h3>
                <button onClick={() => { setIsOpen(false); cleanupVoice(); }} className="p-1 rounded-full hover:bg-slate-800">
                    <CloseIcon className="h-5 w-5" />
                </button>
            </header>

            <div className="flex-grow p-4 overflow-y-auto space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} fade-in`}>
                        <div className={`max-w-xs md:max-w-sm px-4 py-2 ${msg.role === 'user' 
                                ? 'bg-orange-600 text-white rounded-t-xl rounded-bl-xl' 
                                : 'bg-slate-700 text-gray-200 rounded-t-xl rounded-br-xl'}`}>
                            <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                        </div>
                         {msg.role === 'model' && (
                            <div className="mt-2 flex items-center gap-2">
                                <button 
                                    onClick={() => handleCopy(index, msg.content)}
                                    className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-orange-400 transition-colors p-1 rounded-md hover:bg-slate-700"
                                >
                                    {copiedMessageIndex === index ? <CheckIcon className="h-3 w-3 text-green-400"/> : <CopyIcon className="h-3 w-3" />}
                                    {copiedMessageIndex === index ? 'Copiado' : 'Copiar'}
                                </button>
                                <button
                                     onClick={() => handleAnalyze(msg.content)}
                                     className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-orange-400 transition-colors p-1 rounded-md hover:bg-slate-700"
                                >
                                    <SparklesIcon className="h-3 w-3" />
                                    Analizar
                                </button>
                            </div>
                        )}
                    </div>
                ))}
                {(isLoading || isListening) && (
                    <div className="flex justify-start">
                         <div className={`max-w-xs md:max-w-sm rounded-xl px-4 py-2 bg-slate-700 text-gray-200 ${isListening ? 'animate-pulse' : ''}`}>
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                )}
                 <div ref={messagesEndRef} />
            </div>

            {isVoiceMode ? renderVoiceFooter() : renderTextFooter()}
        </div>
    );
};
