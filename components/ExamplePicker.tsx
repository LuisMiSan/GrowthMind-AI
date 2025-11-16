import React from 'react';
import type { Example } from '../types';
import { examples } from '../data/examples';

interface ExamplePickerProps {
    onSelectExample: (example: Example) => void;
}

export const ExamplePicker: React.FC<ExamplePickerProps> = ({ onSelectExample }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-center text-gray-200 mb-2">Comienza con un Ejemplo</h2>
            <p className="text-center text-gray-400 mb-6">¿No sabes por dónde empezar? Selecciona uno de estos escenarios comunes.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {examples.map((example, index) => (
                    <button
                        key={index}
                        onClick={() => onSelectExample(example)}
                        className="text-left p-4 bg-blue-900/50 border border-blue-800 rounded-lg hover:bg-blue-900/80 hover:border-orange-500/50 transition-all duration-200 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        aria-label={`Seleccionar ejemplo: ${example.title}`}
                    >
                        <h3 className="font-bold text-gray-200">{example.title}</h3>
                        <p className="text-sm text-gray-400 mt-1 line-clamp-3">{example.description}</p>
                    </button>
                ))}
            </div>
        </div>
    );
};