
import React from 'react';
import { BrainCircuitIcon } from './icons/BrainCircuitIcon';

export const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/70 backdrop-blur-sm sticky top-0 z-50 border-b border-slate-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center space-x-3">
          <BrainCircuitIcon className="h-8 w-8 text-cyan-400" />
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-indigo-400 text-transparent bg-clip-text">
            GrowthMind AI
          </h1>
        </div>
      </div>
    </header>
  );
};
