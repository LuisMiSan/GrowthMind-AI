
import React, { useState } from 'react';
import type { AnalysisResult, GroundedAnswer } from '../types';
import { getTtsAudio } from '../services/geminiService';
import { playAudio } from '../utils/audioUtils';
import { VolumeUpIcon } from './icons/VolumeUpIcon';
import { SparklesIcon } from './icons/SparklesIcon';

interface SolutionDisplayProps {
    result: AnalysisResult | GroundedAnswer | null;
    isLoading: boolean;
}

const LoadingSkeleton: React.FC = () => (
    <div className="animate-pulse space-y-8">
        <div className="space-y-3">
            <div className="h-6 bg-gray-700 rounded w-1/3"></div>
            <div className="h-4 bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-700 rounded w-5/6"></div>
        </div>
        <div className="space-y-3">
            <div className="h-6 bg-gray-700 rounded w-1/2"></div>
            <div className="h-4 bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-700 rounded w-4/6"></div>
        </div>
    </div>
);

// FIX: Add `style` prop to allow passing inline styles.
const SolutionSection: React.FC<{ title: string; children: React.ReactNode; textToSpeak: string; isPremium?: boolean; className?: string; style?: React.CSSProperties }> = ({ title, children, textToSpeak, isPremium, className, style }) => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    
    const handleSpeak = async () => {
        setIsSpeaking(true);
        try {
            const audio = await getTtsAudio(textToSpeak);
            await playAudio(audio);
        } catch (error) {
            console.error("TTS Error:", error);
            alert("No se pudo reproducir el audio.");
        } finally {
            setIsSpeaking(false);
        }
    };
    
    return (
        <div className={`bg-blue-950/30 p-6 rounded-xl border border-blue-800/50 slide-in-up ${className}`} style={style}>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-orange-400 flex items-center gap-2">
                    {title}
                    {isPremium && (
                        <span className="text-xs font-semibold inline-flex items-center px-2.5 py-0.5 rounded-full bg-orange-500 text-orange-900">
                            <SparklesIcon className="w-3 h-3 mr-1.5" />
                            Premium
                        </span>
                    )}
                </h3>
                <button
                    onClick={handleSpeak}
                    disabled={isSpeaking}
                    className="p-2 rounded-full hover:bg-white/10 transition-all transform hover:scale-110 disabled:opacity-50 disabled:cursor-wait"
                    aria-label="Escuchar texto"
                >
                    {isSpeaking ? (
                        <svg className="animate-spin h-5 w-5 text-orange-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                        <VolumeUpIcon className="h-5 w-5 text-gray-400" />
                    )}
                </button>
            </div>
            {children}
        </div>
    );
};

export const SolutionDisplay: React.FC<SolutionDisplayProps> = ({ result, isLoading }) => {
    if (isLoading) {
        return <LoadingSkeleton />;
    }

    if (!result) {
        return <div className="text-center text-gray-500 py-10">Los resultados de tu análisis aparecerán aquí.</div>;
    }

    if ('answer' in result) { // GroundedAnswer
        const { answer, sources } = result;
        const textToSpeak = `${answer} ${sources.length > 0 ? 'Fuentes consultadas:' : ''} ${sources.map(s => s.title).join(', ')}`;
        return (
             <SolutionSection title="Análisis con Búsqueda Web" textToSpeak={textToSpeak} style={{ animationDelay: '100ms' }}>
                 <p className="text-gray-300 whitespace-pre-wrap">{answer}</p>
                 {sources.length > 0 && (
                     <div className="mt-6">
                         <h4 className="font-semibold text-gray-300 mb-2">Fuentes:</h4>
                         <ul className="space-y-2">
                             {sources.map((source, index) => (
                                 <li key={index}>
                                     <a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-sm">
                                         {source.title || source.uri}
                                     </a>
                                 </li>
                             ))}
                         </ul>
                     </div>
                 )}
            </SolutionSection>
        );
    }

    const { problemAnalysis, shortTermSolution, longTermSolution } = result as AnalysisResult;

    const shortTermText = `${shortTermSolution.title}. ${shortTermSolution.summary}. Pasos: ${shortTermSolution.steps.map(s => `${s.step}. ${s.title}: ${s.description}`).join(' ')}`;
    const longTermText = `${longTermSolution.title}. ${longTermSolution.summary}. Pasos: ${longTermSolution.steps.map(s => `${s.step}. ${s.title}: ${s.description}`).join(' ')}`;
    
    return (
        <div className="space-y-8">
            <SolutionSection title="Diagnóstico del Problema" textToSpeak={`Problema identificado: ${problemAnalysis.identifiedProblem}. Impacto: ${problemAnalysis.impact}`} style={{ animationDelay: '100ms' }}>
                <div>
                    <h4 className="font-semibold text-gray-300">Problema Identificado:</h4>
                    <p className="text-gray-400 mt-1">{problemAnalysis.identifiedProblem}</p>
                </div>
                <div className="mt-4">
                    <h4 className="font-semibold text-gray-300">Impacto en el Negocio:</h4>
                    <p className="text-gray-400 mt-1">{problemAnalysis.impact}</p>
                </div>
            </SolutionSection>

            <SolutionSection title={shortTermSolution.title} textToSpeak={shortTermText} isPremium={shortTermSolution.isPremium} style={{ animationDelay: '250ms' }}>
                <p className="text-gray-400 mb-4">{shortTermSolution.summary}</p>
                 <ul className="space-y-3">
                    {shortTermSolution.steps.map((step) => (
                        <li key={step.step} className="flex items-start">
                            <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center bg-orange-800 text-orange-300 rounded-full font-bold text-sm mr-3">{step.step}</span>
                            <div>
                                <h5 className="font-semibold text-gray-300">{step.title}</h5>
                                <p className="text-gray-400 text-sm">{step.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </SolutionSection>

             <SolutionSection title={longTermSolution.title} textToSpeak={longTermText} isPremium={longTermSolution.isPremium} style={{ animationDelay: '400ms' }}>
                <p className="text-gray-400 mb-4">{longTermSolution.summary}</p>
                 <ul className="space-y-3">
                    {longTermSolution.steps.map((step) => (
                        <li key={step.step} className="flex items-start">
                             <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center bg-blue-800 text-blue-300 rounded-full font-bold text-sm mr-3">{step.step}</span>
                            <div>
                                <h5 className="font-semibold text-gray-300">{step.title}</h5>
                                <p className="text-gray-400 text-sm">{step.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </SolutionSection>
        </div>
    );
};
