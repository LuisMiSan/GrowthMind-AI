import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { ProblemSolver } from './components/ProblemSolver';
import { ChatWidget } from './components/ChatWidget';
import { SolutionDatabase } from './components/SolutionDatabase';
import { PasswordProtection } from './components/PasswordProtection';
import type { SolutionRecord } from './types';
import { seedRecords } from './data/seedData';

const SOLUTION_DATABASE_KEY = 'business-ai-solver-database';
const AUTH_KEY = 'growthmind-beta-auth';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem(AUTH_KEY) === 'true';
  });
  
  const [mainDescription, setMainDescription] = useState('');
  const problemSolverRef = useRef<HTMLDivElement>(null);

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

  const handleDeleteRecord = (recordId: string) => {
    setSolutionRecords(prevRecords => prevRecords.filter(record => record.id !== recordId));
  };
  
  const handleAuthSuccess = () => {
    sessionStorage.setItem(AUTH_KEY, 'true');
    setIsAuthenticated(true);
  }
  
  const handleAnalyzeRequest = (text: string) => {
    setMainDescription(text);
    problemSolverRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };


  if (!isAuthenticated) {
    return <PasswordProtection onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="min-h-screen flex flex-col fade-in">
      <Header />
      <main className="flex-grow container mx-auto p-4 flex flex-col items-center">
        <ProblemSolver 
          ref={problemSolverRef}
          description={mainDescription}
          onDescriptionChange={setMainDescription}
          onSolutionGenerated={handleSolutionGenerated} 
        />
        <SolutionDatabase records={solutionRecords} onDeleteRecord={handleDeleteRecord} />
      </main>
      <ChatWidget onAnalyzeRequest={handleAnalyzeRequest} />
      <footer className="text-center p-4 text-blue-400 text-sm">
        <p className="mb-2">
            <strong>Aviso:</strong> Esta es una versión beta con fines de prueba. No introduzcas datos comerciales críticos o sensibles. 
            Toda la información generada se guarda únicamente en tu navegador.
        </p>
        <p>&copy; {new Date().getFullYear()} GrowthMind AI. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default App;