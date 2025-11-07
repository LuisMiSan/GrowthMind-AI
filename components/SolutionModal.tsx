import React, { useEffect } from 'react';
import type { SolutionRecord } from '../types';
import { SolutionDisplay } from './SolutionDisplay';
import { CloseIcon } from './icons/CloseIcon';
import { BusinessAreaDisplay } from './BusinessAreaDisplay';


interface SolutionModalProps {
    record: SolutionRecord;
    onClose: () => void;
}

export const SolutionModal: React.FC<SolutionModalProps> = ({ record, onClose }) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    return (
        <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-center items-center p-4"
            aria-labelledby="solution-modal-title"
            role="dialog"
            aria-modal="true"
            onClick={onClose}
        >
            <div 
                className="bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 w-full max-w-4xl max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <header className="flex items-center justify-between p-4 border-b border-slate-700 flex-shrink-0">
                    <div>
                         <h2 id="solution-modal-title" className="text-xl font-bold text-slate-200">{record.companyType}</h2>
                         <div className="flex items-center gap-x-4 gap-y-1 flex-wrap mt-1">
                            <p className="text-sm text-slate-400">{record.niche}</p>
                            <BusinessAreaDisplay area={record.businessArea} className="text-sm text-slate-400" />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-700 transition-colors" aria-label="Cerrar modal">
                            <CloseIcon className="h-5 w-5" />
                        </button>
                    </div>
                </header>
                <main className="overflow-y-auto p-6">
                    <div className="mb-6">
                        <h3 className="font-semibold text-slate-300 mb-2">Problema Descrito:</h3>
                        <p className="text-slate-400 bg-slate-900/50 p-3 rounded-lg border border-slate-700">{record.problemDescription}</p>
                    </div>
                    <SolutionDisplay result={record.result} isLoading={false} />
                </main>
            </div>
        </div>
    );
};