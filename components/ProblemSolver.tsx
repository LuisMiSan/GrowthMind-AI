import React, { useState, forwardRef } from 'react';
import type { BusinessArea, AnalysisResult, GroundedAnswer, Example, SolutionRecord } from '../types';
import { analyzeProblemWithThinking, analyzeProblemWithSearch } from '../services/geminiService';
import { SolutionDisplay } from './SolutionDisplay';
import { SparklesIcon } from './icons/SparklesIcon';
import { ExamplePicker } from './ExamplePicker';

interface ProblemSolverProps {
    onSolutionGenerated: (record: Omit<SolutionRecord, 'id' | 'timestamp'>) => void;
    description: string;
    onDescriptionChange: (value: string) => void;
}

export const ProblemSolver = forwardRef<HTMLDivElement, ProblemSolverProps>(({ onSolutionGenerated, description, onDescriptionChange }, ref) => {
    const [area, setArea] = useState<BusinessArea>('marketing');
    const [companyType, setCompanyType] = useState('');
    const [niche, setNiche] = useState('');
    const [useSearch, setUseSearch] = useState(false);
    const [useThinkingMode, setUseThinkingMode] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<AnalysisResult | GroundedAnswer | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!description.trim() || !companyType.trim() || !niche.trim()) {
            setError('Por favor, completa todos los campos: descripción, tipo de empresa y nicho.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            let response: AnalysisResult | GroundedAnswer;
            if (useSearch) {
                response = await analyzeProblemWithSearch(description, area);
            } else {
                response = await analyzeProblemWithThinking(description, area);
            }
            setResult(response);
            onSolutionGenerated({
                companyType,
                niche,
                problemDescription: description,
                businessArea: area,
                result: response,
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ocurrió un error inesperado.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleChange = (mode: 'search' | 'thinking') => {
        if (mode === 'search') {
            setUseSearch(true);
            setUseThinkingMode(false);
        } else {
            setUseSearch(false);
            setUseThinkingMode(true);
        }
    }
    
    const handleSelectExample = (example: Example) => {
        onDescriptionChange(example.description);
        setArea(example.area);
    };


    return (
        <div ref={ref} className="w-full max-w-4xl p-4 md:p-6 bg-blue-950/70 rounded-2xl border border-blue-800 slide-in-up">
            <ExamplePicker onSelectExample={handleSelectExample} />

            <div className="relative my-8">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-blue-800" />
                </div>
                <div className="relative flex justify-center">
                    <span className="bg-blue-950/70 px-2 text-sm text-gray-400">O</span>
                </div>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-center text-gray-200">Describe tu problema</h2>
            <p className="text-center text-gray-400 mb-6">Nuestra IA analizará tu situación y te proporcionará posibles soluciones a medida.</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => onDescriptionChange(e.target.value)}
                        placeholder="Ej: Nuestras ventas han caído un 20% en el último trimestre y no sabemos por qué..."
                        className="w-full h-36 p-3 bg-blue-900 border border-blue-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none transition-shadow"
                        disabled={isLoading}
                    />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="companyType" className="block text-sm font-medium text-gray-400 mb-2">Tipo de Empresa</label>
                        <input
                            type="text"
                            id="companyType"
                            value={companyType}
                            onChange={(e) => setCompanyType(e.target.value)}
                            placeholder="Ej: E-commerce de moda"
                            className="w-full p-3 bg-blue-900 border border-blue-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                            disabled={isLoading}
                        />
                    </div>
                    <div>
                        <label htmlFor="niche" className="block text-sm font-medium text-gray-400 mb-2">Nicho de Mercado</label>
                        <input
                            type="text"
                            id="niche"
                            value={niche}
                            onChange={(e) => setNiche(e.target.value)}
                            placeholder="Ej: Ropa sostenible para jóvenes"
                            className="w-full p-3 bg-blue-900 border border-blue-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                            disabled={isLoading}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                        <label htmlFor="area" className="block text-sm font-medium text-gray-400 mb-2">Área de Negocio</label>
                        <select
                            id="area"
                            value={area}
                            onChange={(e) => setArea(e.target.value as BusinessArea)}
                            className="w-full p-3 bg-blue-900 border border-blue-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                            disabled={isLoading}
                        >
                            <optgroup label="Áreas Digitales">
                                <option value="marketing">Marketing Digital</option>
                                <option value="ecommerce">E-commerce</option>
                                <option value="social_media">Redes Sociales</option>
                                <option value="content">Contenido y SEO</option>
                                <option value="ux_ui">Experiencia de Usuario (UX/UI)</option>
                                <option value="data_analytics">Analítica de Datos</option>
                            </optgroup>
                            <optgroup label="Áreas de Negocio">
                                <option value="general">General</option>
                                <option value="sales">Ventas</option>
                                <option value="logistics">Logística</option>
                                <option value="hr">Recursos Humanos</option>
                                <option value="finance">Finanzas</option>
                                <option value="it">TI</option>
                            </optgroup>
                        </select>
                    </div>

                     <div className="flex flex-col space-y-2">
                        <label className="block text-sm font-medium text-gray-400">Modo de Análisis</label>
                        <div className="flex bg-blue-900 rounded-lg border border-blue-700 p-1">
                            <button type="button" onClick={() => handleToggleChange('thinking')} className={`w-1/2 py-2 text-sm rounded-md transition-all duration-200 transform hover:scale-105 ${useThinkingMode ? 'bg-orange-600 text-white shadow-md' : 'hover:bg-blue-800/80'}`}>Análisis Avanzado</button>
                            <button type="button" onClick={() => handleToggleChange('search')} className={`w-1/2 py-2 text-sm rounded-md transition-all duration-200 transform hover:scale-105 ${useSearch ? 'bg-orange-600 text-white shadow-md' : 'hover:bg-blue-800/80'}`}>Búsqueda Web</button>
                        </div>
                         <p className="text-xs text-gray-500 px-1 text-center">
                            {useThinkingMode
                                ? 'Usa un modelo de IA superior para un análisis más profundo y soluciones complejas.'
                                : 'Usa búsqueda web para respuestas rápidas y basadas en información actual.'
                            }
                        </p>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Analizando...
                        </>
                    ) : (
                        <>
                            <SparklesIcon className="h-5 w-5"/>
                            Generar y Guardar Solución
                        </>
                    )}
                </button>
            </form>

            {error && <div className="mt-6 p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg">{error}</div>}
            
            <div className="mt-8">
                <SolutionDisplay result={result} isLoading={isLoading} />
            </div>
        </div>
    );
});