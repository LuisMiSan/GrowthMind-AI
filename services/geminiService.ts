
import { GoogleGenAI, Type, Modality, Chat, GenerateContentResponse, Content, LiveSession, LiveServerMessage } from "@google/genai";
import type { AnalysisResult, GroundedAnswer } from '../types';

// Use a safe check for process.env to prevent ReferenceError in browsers
const apiKey = (typeof process !== 'undefined' && process.env) ? process.env.API_KEY : undefined;

if (!apiKey) {
    // We throw here if the key is truly missing to alert the developer, 
    // but the typeof check above prevents a crash if 'process' itself is undefined.
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey });

const analysisSchema = {
    type: Type.OBJECT,
    properties: {
        problemAnalysis: {
            type: Type.OBJECT,
            properties: {
                identifiedProblem: { type: Type.STRING, description: "El problema principal detectado en la descripción del usuario." },
                impact: { type: Type.STRING, description: "Cómo este problema impacta al negocio." },
            },
            required: ['identifiedProblem', 'impact'],
        },
        shortTermSolution: {
            type: Type.OBJECT,
            properties: {
                title: { type: Type.STRING, description: "Título para la solución a corto plazo." },
                summary: { type: Type.STRING, description: "Resumen de la estrategia a corto plazo." },
                steps: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            step: { type: Type.INTEGER },
                            title: { type: Type.STRING },
                            description: { type: Type.STRING },
                        },
                        required: ['step', 'title', 'description']
                    }
                },
                isPremium: { type: Type.BOOLEAN, description: "Marcar como true si esta es una solución avanzada." }
            },
            required: ['title', 'summary', 'steps']
        },
        longTermSolution: {
            type: Type.OBJECT,
            properties: {
                title: { type: Type.STRING, description: "Título para la solución a largo plazo." },
                summary: { type: Type.STRING, description: "Resumen de la estrategia a largo plazo." },
                steps: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            step: { type: Type.INTEGER },
                            title: { type: Type.STRING },
                            description: { type: Type.STRING },
                        },
                        required: ['step', 'title', 'description']
                    }
                },
                isPremium: { type: Type.BOOLEAN, description: "Marcar como true si esta es una solución avanzada." }
            },
            required: ['title', 'summary', 'steps']
        }
    },
    required: ['problemAnalysis', 'shortTermSolution', 'longTermSolution']
};


const generatePrompt = (description: string, area: string): string => {
    return `
      Analiza el siguiente problema empresarial en el área de ${area}.
      Descripción del problema: "${description}"

      Proporciona un análisis detallado que incluya:
      1.  Un diagnóstico claro del problema raíz.
      2.  El impacto potencial en el negocio.
      3.  Una solución a corto plazo con pasos accionables.
      4.  Una solución estratégica a largo plazo con pasos detallados.
      
      Sé claro, conciso y práctico en tus recomendaciones. Una de las soluciones (corto o largo plazo) debe ser marcada como premium aleatoriamente.
    `;
};


export const analyzeProblemWithThinking = async (description: string, area: string): Promise<AnalysisResult> => {
    const prompt = generatePrompt(description, area);
    const response = await ai.models.generateContent({
        model: "gemini-2.5-pro",
        contents: prompt,
        config: {
            thinkingConfig: { thinkingBudget: 32768 },
            responseMimeType: "application/json",
            responseSchema: analysisSchema,
        },
    });

    const jsonText = response.text.trim();
    try {
        return JSON.parse(jsonText) as AnalysisResult;
    } catch (e) {
        console.error("Failed to parse complex analysis JSON:", e);
        throw new Error("La respuesta de la IA no tuvo un formato válido.");
    }
};

export const analyzeProblemWithSearch = async (description: string, area: string): Promise<GroundedAnswer> => {
    const prompt = `
      Basado en información web actualizada, analiza el siguiente problema empresarial en el área de ${area} y proporciona una solución.
      Descripción: "${description}"
      Proporciona una respuesta clara y lista las fuentes que utilizaste.
    `;
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            tools: [{ googleSearch: {} }],
        },
    });

    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
        ?.map(chunk => chunk.web)
        .filter(web => web?.uri && web?.title) as { uri: string, title: string }[] || [];

    return {
        answer: response.text,
        sources: sources,
    };
};

export const getTtsAudio = async (text: string): Promise<string> => {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `Lee el siguiente texto de forma clara y profesional: ${text}` }] }],
        config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
                voiceConfig: {
                    prebuiltVoiceConfig: { voiceName: 'Kore' },
                },
            },
        },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
        throw new Error("No se pudo generar el audio.");
    }
    return base64Audio;
};

export const startChat = (history: Content[]): Chat => {
    return ai.chats.create({
        model: 'gemini-2.5-flash',
        history,
        config: {
            systemInstruction: 'Eres un asistente de negocios amigable y servicial. Responde preguntas de forma concisa.',
        },
    });
};

export const connectToLiveSession = (callbacks: {
    onopen: () => void;
    onmessage: (message: LiveServerMessage) => void;
    onerror: (e: ErrorEvent) => void;
    onclose: (e: CloseEvent) => void;
}): Promise<LiveSession> => {
    return ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks,
        config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
                voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
            },
            systemInstruction: 'Eres un asistente de negocios amigable y servicial. Responde preguntas de forma concisa. Mantén tus respuestas breves.',
            inputAudioTranscription: {},
            outputAudioTranscription: {},
        },
    });
};
