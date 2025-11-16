import React from 'react';
import { BrainCircuitIcon } from './icons/BrainCircuitIcon';

export const Header: React.FC = () => {
  return (
    <header className="bg-blue-950/80 backdrop-blur-sm sticky top-0 z-50 border-b border-blue-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center space-x-3">
          <BrainCircuitIcon className="h-8 w-8 text-orange-400" />
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-orange-400 to-blue-400 text-transparent bg-clip-text">
            GrowthMind AI
          </h1>
        </div>
      </div>
    </header>
  );
};