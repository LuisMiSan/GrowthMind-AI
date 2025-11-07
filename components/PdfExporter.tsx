import React, { useEffect, useRef } from 'react';
import type { SolutionRecord } from '../types';
import { SolutionDisplay } from './SolutionDisplay';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

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
                    backgroundColor: '#1e293b', // slate-800
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
        <div ref={contentRef} className="bg-slate-800 text-white p-6 w-[1024px]">
             <style>
                {`
                    body .pdf-export-mode [aria-label="Escuchar texto"] {
                        display: none !important;
                    }
                `}
            </style>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-200">{record.companyType} - {record.niche}</h2>
                <hr className="my-4 border-slate-700" />
                <h3 className="font-semibold text-slate-300 mb-2">Problema Descrito:</h3>
                <p className="text-slate-400 bg-slate-900/50 p-3 rounded-lg border border-slate-700">{record.problemDescription}</p>
            </div>
            <SolutionDisplay result={record.result} isLoading={false} />
        </div>
    );
};