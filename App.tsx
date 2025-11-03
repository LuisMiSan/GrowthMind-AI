
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ProblemSolver } from './components/ProblemSolver';
import { ChatWidget } from './components/ChatWidget';
import { SolutionDatabase } from './components/SolutionDatabase';
import type { SolutionRecord } from './types';
import { seedRecords } from './data/seedData';

const SOLUTION_DATABASE_KEY = 'business-ai-solver-database';

const App: React.FC = () => {
  const [solutionRecords, setSolutionRecords] = useState<SolutionRecord[]>(() => {
    try {
      const saved = localStorage.getItem(SOLUTION_DATABASE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (error) {
      console.error("Failed to load solution database:", error);
    }
    return seedRecords;
  });

  useEffect(() => {
    try {
      localStorage.setItem(SOLUTION_DATABASE_KEY, JSON.stringify(solutionRecords));
    } catch (error) {
      console.error("Failed to save solution database:", error);
    }
  }, [solutionRecords]);

  const handleSolutionGenerated = (recordData: Omit<SolutionRecord, 'id' | 'timestamp'>) => {
    const newRecord: SolutionRecord = {
      ...recordData,
      id: `sol-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    setSolutionRecords(prevRecords => [newRecord, ...prevRecords]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 flex flex-col items-center">
        <ProblemSolver onSolutionGenerated={handleSolutionGenerated} />
        <SolutionDatabase records={solutionRecords} />
      </main>
      <ChatWidget />
      <footer className="text-center p-4 text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} GrowthMind AI. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default App;
