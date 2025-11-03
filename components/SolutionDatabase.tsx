import React, { useState } from 'react';
import type { SolutionRecord, AnalysisResult, SolutionStep, GroundedAnswer } from '../types';
import { SolutionModal } from './SolutionModal';
import { DatabaseIcon } from './icons/DatabaseIcon';
import { EyeIcon } from './icons/EyeIcon';
import { DownloadIcon } from './icons/DownloadIcon';
import { FileTextIcon } from './icons/FileTextIcon';
import { SheetIcon } from './icons/SheetIcon';
import { FileJsonIcon } from './icons/FileJsonIcon';

interface SolutionDatabaseProps {
    records: SolutionRecord[];
}

const downloadFile = (content: string, fileName: string, contentType: string) => {
    const blob = new Blob([content], { type: contentType });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
};

const formatStepsForMarkdown = (steps: SolutionStep[]): string => {
    return steps.map(s => `1. **${s.title}**: ${s.description}`).join('\n');
};

const recordToMarkdown = (record: SolutionRecord): string => {
    const { companyType, niche, problemDescription, businessArea, result, timestamp } = record;
    let content = `
# Solución para: ${companyType} - ${niche}

**Fecha:** ${new Date(timestamp).toLocaleString()}
**Área:** ${businessArea}

## Problema Descrito
> ${problemDescription}

---

## Análisis y Solución
`;

    if ('answer' in result) {
        const res = result as GroundedAnswer;
        content += `${res.answer}\n\n`;
        if (res.sources && res.sources.length > 0) {
            content += '### Fuentes\n';
            res.sources.forEach(source => {
                content += `- [${source.title || 'Fuente sin título'}](${source.uri})\n`;
            });
        }
    } else {
        const res = result as AnalysisResult;
        content += `
### Diagnóstico del Problema
**Problema Identificado:** ${res.problemAnalysis.identifiedProblem}
**Impacto en el Negocio:** ${res.problemAnalysis.impact}

### Solución a Corto Plazo: ${res.shortTermSolution.title} ${res.shortTermSolution.isPremium ? '**(Premium)**' : ''}
**Resumen:** ${res.shortTermSolution.summary}
**Pasos:**
${formatStepsForMarkdown(res.shortTermSolution.steps)}

### Solución a Largo Plazo: ${res.longTermSolution.title} ${res.longTermSolution.isPremium ? '**(Premium)**' : ''}
**Resumen:** ${res.longTermSolution.summary}
**Pasos:**
${formatStepsForMarkdown(res.longTermSolution.steps)}
`;
    }
    return content;
};

export const SolutionDatabase: React.FC<SolutionDatabaseProps> = ({ records }) => {
    const [selectedRecord, setSelectedRecord] = useState<SolutionRecord | null>(null);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedIds(records.map(r => r.id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelectOne = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(selectedId => selectedId !== id) : [...prev, id]
        );
    };
    
    const handleViewRecord = (record: SolutionRecord) => {
        setSelectedRecord(record);
    };

    const handleCloseModal = () => {
        setSelectedRecord(null);
    };

    const handleExportMarkdown = () => {
        const selectedRecords = records.filter(r => selectedIds.includes(r.id));
        if (selectedRecords.length === 0) return;
        
        const markdownContent = selectedRecords.map(recordToMarkdown).join('\n\n---\n\n');
        downloadFile(markdownContent, `soluciones_exportadas_${Date.now()}.md`, 'text/markdown;charset=utf-8;');
    };
    
    const handleExportJson = () => {
        if (records.length === 0) return;
        const jsonContent = JSON.stringify(records, null, 2);
        downloadFile(jsonContent, `base_conocimiento_${Date.now()}.json`, 'application/json');
    };
    
    const handleExportCsv = () => {
        if (records.length === 0) return;

        const headers = [
            'id', 'timestamp', 'companyType', 'niche', 'businessArea', 'problemDescription',
            'resultType', 'groundedAnswer', 'groundedSources', 'pa_identifiedProblem', 'pa_impact',
            'st_title', 'st_summary', 'st_steps', 'st_isPremium', 'lt_title', 'lt_summary', 'lt_steps', 'lt_isPremium'
        ];

        const escapeCsvCell = (cell: any): string => {
            if (cell === null || cell === undefined) return '';
            const str = String(cell);
            if (str.includes(',') || str.includes('"') || str.includes('\n')) {
                return `"${str.replace(/"/g, '""')}"`;
            }
            return str;
        };

        const rows = records.map(record => {
            const row: Record<string, any> = {
                id: record.id,
                timestamp: record.timestamp,
                companyType: record.companyType,
                niche: record.niche,
                businessArea: record.businessArea,
                problemDescription: record.problemDescription,
            };

            if ('answer' in record.result) {
                row.resultType = 'GroundedAnswer';
                row.groundedAnswer = record.result.answer;
                row.groundedSources = JSON.stringify(record.result.sources);
            } else {
                const res = record.result as AnalysisResult;
                row.resultType = 'AnalysisResult';
                row.pa_identifiedProblem = res.problemAnalysis.identifiedProblem;
                row.pa_impact = res.problemAnalysis.impact;
                row.st_title = res.shortTermSolution.title;
                row.st_summary = res.shortTermSolution.summary;
                row.st_steps = JSON.stringify(res.shortTermSolution.steps);
                row.st_isPremium = res.shortTermSolution.isPremium || false;
                row.lt_title = res.longTermSolution.title;
                row.lt_summary = res.longTermSolution.summary;
                row.lt_steps = JSON.stringify(res.longTermSolution.steps);
                row.lt_isPremium = res.longTermSolution.isPremium || false;
            }

            return headers.map(header => escapeCsvCell(row[header])).join(',');
        });

        const csvContent = [headers.join(','), ...rows].join('\n');
        downloadFile(csvContent, `base_conocimiento_${Date.now()}.csv`, 'text/csv;charset=utf-8;');
    };

    return (
        <>
            <div className="w-full max-w-4xl mt-12">
                <h2 className="text-2xl font-bold mb-4 text-center text-slate-200 flex items-center justify-center gap-3">
                    <DatabaseIcon className="h-6 w-6 text-cyan-400" />
                    Base de Conocimiento
                </h2>
                <p className="text-center text-slate-400 mb-6">Aquí se guardan todos los análisis que has generado.</p>
                
                {records.length > 0 && (
                    <div className="mb-6 p-4 bg-slate-800 rounded-xl border border-slate-700">
                        <h3 className="text-lg font-semibold text-slate-300 mb-3 flex items-center gap-2"><DownloadIcon className="h-5 w-5"/> Opciones de Exportación</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <button 
                                onClick={handleExportMarkdown} 
                                disabled={selectedIds.length === 0}
                                className="flex items-center justify-center gap-2 text-sm bg-slate-700 hover:bg-slate-600/70 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                <FileTextIcon className="h-4 w-4" />
                                <span>Exportar {selectedIds.length > 0 ? `(${selectedIds.length}) ` : ''}a Markdown</span>
                            </button>
                             <button 
                                onClick={handleExportCsv}
                                disabled={records.length === 0}
                                className="flex items-center justify-center gap-2 text-sm bg-slate-700 hover:bg-slate-600/70 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                <SheetIcon className="h-4 w-4" />
                                <span>Exportar todo a CSV</span>
                            </button>
                             <button 
                                onClick={handleExportJson}
                                disabled={records.length === 0}
                                className="flex items-center justify-center gap-2 text-sm bg-slate-700 hover:bg-slate-600/70 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                <FileJsonIcon className="h-4 w-4" />
                                <span>Exportar todo a JSON</span>
                            </button>
                        </div>
                    </div>
                )}

                <div className="bg-slate-800 rounded-2xl shadow-2xl shadow-slate-950/50 border border-slate-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        {records.length > 0 ? (
                            <table className="min-w-full divide-y divide-slate-700">
                                <thead className="bg-slate-900/50">
                                    <tr>
                                        <th scope="col" className="p-4">
                                            <input 
                                                type="checkbox" 
                                                className="h-4 w-4 bg-slate-700 border-slate-600 text-cyan-600 focus:ring-cyan-500 rounded"
                                                checked={records.length > 0 && selectedIds.length === records.length}
                                                onChange={handleSelectAll}
                                                aria-label="Seleccionar todos los registros"
                                            />
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Empresa / Nicho</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Problema</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Fecha</th>
                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">Ver</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-slate-800 divide-y divide-slate-700">
                                    {records.map((record) => (
                                        <tr key={record.id} className={`transition-colors ${selectedIds.includes(record.id) ? 'bg-cyan-900/40' : 'hover:bg-slate-700/50'}`}>
                                            <td className="p-4">
                                                <input
                                                    type="checkbox"
                                                    className="h-4 w-4 bg-slate-700 border-slate-600 text-cyan-600 focus:ring-cyan-500 rounded"
                                                    checked={selectedIds.includes(record.id)}
                                                    onChange={() => handleSelectOne(record.id)}
                                                    aria-label={`Seleccionar registro para ${record.companyType}`}
                                                />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-slate-200">{record.companyType}</div>
                                                <div className="text-sm text-slate-400">{record.niche}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm text-slate-300 max-w-xs truncate">{record.problemDescription}</p>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                                                {new Date(record.timestamp).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button onClick={() => handleViewRecord(record)} className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5" aria-label="Ver solución">
                                                    <EyeIcon className="h-4 w-4" />
                                                    Ver
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="text-center text-slate-500 py-10 px-4">
                                <p>Aún no has generado ninguna solución.</p>
                                <p className="text-sm">Completa el formulario de arriba para empezar a construir tu base de conocimiento.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {selectedRecord && <SolutionModal record={selectedRecord} onClose={handleCloseModal} />}
        </>
    );
};