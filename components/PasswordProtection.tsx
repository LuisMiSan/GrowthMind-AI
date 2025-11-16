import React, { useState } from 'react';
import { BrainCircuitIcon } from './icons/BrainCircuitIcon';

interface PasswordProtectionProps {
    onAuthSuccess: () => void;
}

// Contraseña simple para la beta. En una app real, esto sería mucho más seguro.
const CORRECT_PASSWORD = 'GrowthMindBeta2024';

export const PasswordProtection: React.FC<PasswordProtectionProps> = ({ onAuthSuccess }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === CORRECT_PASSWORD) {
            setError('');
            onAuthSuccess();
        } else {
            setError('Contraseña incorrecta. Por favor, solicita acceso.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-blue-950 p-4">
            <div className="w-full max-w-md text-center">
                <div className="flex items-center justify-center space-x-3 mb-6">
                  <BrainCircuitIcon className="h-10 w-10 text-orange-400" />
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-blue-400 text-transparent bg-clip-text">
                    GrowthMind AI
                  </h1>
                </div>
                <div className="bg-blue-950/80 p-8 rounded-2xl shadow-2xl border border-blue-800 scale-in">
                    <h2 className="text-xl font-bold text-gray-200 mb-2">Acceso a la Beta Privada</h2>
                    <p className="text-gray-400 mb-6">Esta aplicación está en fase de prueba. Introduce la contraseña para continuar.</p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="password" className="sr-only">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Introduce la contraseña"
                                className="w-full p-3 bg-blue-900 border border-blue-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none text-center"
                            />
                        </div>
                        {error && <p className="text-red-400 text-sm">{error}</p>}
                        <button
                            type="submit"
                            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                        >
                            Acceder
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};