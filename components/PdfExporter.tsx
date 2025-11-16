import React, { useEffect, useRef } from 'react';
import type { SolutionRecord } from '../types';
import { SolutionDisplay } from './SolutionDisplay';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { BusinessAreaDisplay } from './BusinessAreaDisplay';

interface PdfExporterProps {
    record: SolutionRecord | undefined;
    onComplete: () => void;
}

export const PdfExporter: React.FC<PdfExporterProps> = ({ record, onComplete }) => {
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const exportPdf = async () => {
            if (!contentRef.current || !record) {
                onComplete();
                return;
            }

            try {
                const canvas = await html2canvas(contentRef.current, {
                    scale: 2,
                    backgroundColor: '#172554', // blue-900
                    useCORS: true,
                    width: 1024,
                    windowWidth: 1024,
                });
                
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'px',
                    format: 'a4',
                });

                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();
                const imgHeight = canvas.height * pdfWidth / canvas.width;
                
                let heightLeft = imgHeight;
                let position = 0;
                
                pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
                heightLeft -= pdfHeight;

                while (heightLeft > 0) {
                    position = position - pdfHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
                    heightLeft -= pdfHeight;
                }

                pdf.save(`solucion-${record.companyType.replace(/\s+/g, '_')}-${Date.now()}.pdf`);
            } catch (error) {
                console.error("Error exporting to PDF:", error);
                alert("Ocurrió un error al exportar a PDF.");
            } finally {
                onComplete();
            }
        };
        
        const timer = setTimeout(exportPdf, 100);
        return () => clearTimeout(timer);

    }, [record, onComplete]);

    if (!record) return null;

    return (
        <div ref={contentRef} className="bg-blue-950 text-white p-6 w-[1024px]">
             <style>
                {`
                    body .pdf-export-mode [aria-label="Escuchar texto"] {
                        display: none !important;
                    }
                `}
            </style>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-200">{record.companyType} - {record.niche}</h2>
                <hr className="my-4 border-blue-800" />
                <h3 className="font-semibold text-gray-300 mb-2">Problema Descrito:</h3>
                <p className="text-gray-400 bg-blue-900/50 p-3 rounded-lg border border-blue-700">{record.problemDescription}</p>
            </div>
            <SolutionDisplay result={record.result} isLoading={false} />
        </div>
    );
};

interface MultiRecordPdfExporterProps {
    records: SolutionRecord[];
    onComplete: () => void;
}

const RecordForPdf: React.FC<{ record: SolutionRecord }> = ({ record }) => (
    <div className="p-4 mb-4 border-b border-blue-800 last:border-b-0 bg-blue-950/50 rounded-lg">
        <h2 className="text-xl font-bold text-gray-200">{record.companyType} - {record.niche}</h2>
        <div className="flex items-center gap-x-4 gap-y-1 flex-wrap mt-1 text-sm text-gray-400">
            <BusinessAreaDisplay area={record.businessArea} />
            <span>{new Date(record.timestamp).toLocaleDateString()}</span>
        </div>
        <hr className="my-3 border-blue-700" />
        <h3 className="font-semibold text-gray-300 mb-1">Problema:</h3>
        <p className="text-gray-400 text-sm mb-3">{record.problemDescription}</p>
        {'answer' in record.result ? (
            <div>
                 <h3 className="font-semibold text-gray-300 mb-1">Respuesta (Búsqueda Web):</h3>
                 <p className="text-gray-400 text-sm whitespace-pre-wrap">{record.result.answer}</p>
            </div>
        ) : (
            <div>
                 <h3 className="font-semibold text-gray-300 mb-1">Diagnóstico del Problema:</h3>
                 <p className="text-gray-400 text-sm">{record.result.problemAnalysis.identifiedProblem}</p>
                 <h3 className="font-semibold text-gray-300 mb-1 mt-2">Solución a Corto Plazo:</h3>
                 <p className="text-gray-400 text-sm">{record.result.shortTermSolution.summary}</p>
                 <h3 className="font-semibold text-gray-300 mb-1 mt-2">Solución a Largo Plazo:</h3>
                 <p className="text-gray-400 text-sm">{record.result.longTermSolution.summary}</p>
            </div>
        )}
    </div>
);


export const MultiRecordPdfExporter: React.FC<MultiRecordPdfExporterProps> = ({ records, onComplete }) => {
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const exportPdf = async () => {
            if (!contentRef.current || records.length === 0) {
                onComplete();
                return;
            }

            try {
                const canvas = await html2canvas(contentRef.current, {
                    scale: 2,
                    backgroundColor: '#0c1434', // custom dark blue, like blue-950
                    useCORS: true,
                    width: 1024,
                    windowWidth: 1024,
                });
                
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'px',
                    format: 'a4',
                });

                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();
                const imgHeight = canvas.height * pdfWidth / canvas.width;
                
                let heightLeft = imgHeight;
                let position = 0;
                
                pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
                heightLeft -= pdfHeight;

                while (heightLeft > 0) {
                    position = position - pdfHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
                    heightLeft -= pdfHeight;
                }

                pdf.save(`GrowthMind_AI_Export_${new Date().toISOString().split('T')[0]}.pdf`);
            } catch (error) {
                console.error("Error exporting to PDF:", error);
                alert("Ocurrió un error al exportar a PDF.");
            } finally {
                onComplete();
            }
        };
        
        const timer = setTimeout(exportPdf, 100);
        return () => clearTimeout(timer);

    }, [records, onComplete]);

    return (
        <div ref={contentRef} className="bg-blue-950 text-white p-6 w-[1024px]">
            <div className="text-center mb-6 border-b border-blue-700 pb-4">
              <h1 className="text-3xl font-bold">Exportación de Soluciones</h1>
              <p className="text-gray-400">GrowthMind AI</p>
            </div>
            {records.map(record => <RecordForPdf key={record.id} record={record} />)}
        </div>
    );
};