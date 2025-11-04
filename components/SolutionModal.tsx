
import React, { useEffect, useRef, useState } from 'react';
import type { SolutionRecord } from '../types';
import { SolutionDisplay } from './SolutionDisplay';
import { CloseIcon } from './icons/CloseIcon';
import { FileDownIcon } from './icons/FileDownIcon';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';


interface SolutionModalProps {
    record: SolutionRecord;
    onClose: () => void;
}

export const SolutionModal: React.FC<SolutionModalProps> = ({ record, onClose }) => {
    const [isExporting, setIsExporting] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

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

    const handleExportPdf = async () => {
        if (!contentRef.current || isExporting) return;
        setIsExporting(true);

        try {
            const canvas = await html2canvas(contentRef.current, {
                scale: 2,
                backgroundColor: '#1e293b',
                useCORS: true,
            });
            
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: 'a4',
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const ratio = canvasWidth / canvasHeight;
            const imgWidth = pdfWidth - 20;
            const imgHeight = imgWidth / ratio;
            
            let heightLeft = imgHeight;
            let position = 10;
            
            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;

            while (heightLeft > 0) {
                position = position - pdfHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                heightLeft -= pdfHeight;
            }

            pdf.save(`solucion-${record.companyType.replace(/\s+/g, '_')}-${Date.now()}.pdf`);
        } catch (error) {
            console.error("Error exporting to PDF:", error);
            alert("Ocurrió un error al exportar a PDF.");
        } finally {
            setIsExporting(false);
        }
    };

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
                         <p className="text-sm text-slate-400">{record.niche}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={handleExportPdf} 
                            className="p-2 rounded-full hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-wait" 
                            aria-label="Exportar a PDF"
                            disabled={isExporting}
                        >
                            {isExporting ? (
                                <svg className="animate-spin h-5 w-5 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <FileDownIcon className="h-5 w-5" />
                            )}
                        </button>
                        <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-700 transition-colors" aria-label="Cerrar modal">
                            <CloseIcon className="h-5 w-5" />
                        </button>
                    </div>
                </header>
                <main className="overflow-y-auto p-6" ref={contentRef}>
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