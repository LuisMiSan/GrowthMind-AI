import React, { useState, useMemo } from 'react';
import type { SolutionRecord, BusinessArea, SolutionStep } from '../types';
import { SolutionModal } from './SolutionModal';
import { MultiRecordPdfExporter, PdfExporter } from './PdfExporter';
import { DatabaseIcon } from './icons/DatabaseIcon';
import { EyeIcon } from './icons/EyeIcon';
import { FileDownIcon } from './icons/FileDownIcon';
import { BusinessAreaDisplay } from './BusinessAreaDisplay';
import { SearchIcon } from './icons/SearchIcon';
import { FileJsonIcon } from './icons/FileJsonIcon';
import { SheetIcon } from './icons/SheetIcon';
import { FileTextIcon } from './icons/FileTextIcon';
import { Trash2Icon } from './icons/Trash2Icon';

interface SolutionDatabaseProps {
    records: SolutionRecord[];
    onDeleteRecord: (id: string) => void;
}

export const SolutionDatabase: React.FC<SolutionDatabaseProps> = ({ records, onDeleteRecord }) => {
    const [selectedRecord, setSelectedRecord] = useState<SolutionRecord | null>(null);
    const [exportingRecordId, setExportingRecordId] = useState<string | null>(null);
    const [isExportingPdf, setIsExportingPdf] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [areaFilter, setAreaFilter] = useState<BusinessArea | 'all'>('all');
    const [dateFilter, setDateFilter] = useState<'all' | 'last7days' | 'last30days' | 'lastyear'>('all');
    const [recordToDelete, setRecordToDelete] = useState<SolutionRecord | null>(null);

    const handleViewRecord = (record: SolutionRecord) => {
        setSelectedRecord(record);
    };

    const handleCloseModal = () => {
        setSelectedRecord(null);
    };
    
    const recordToExport = records.find(r => r.id === exportingRecordId);

    const filteredRecords = useMemo(() => {
        const now = new Date();
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);

        return records.filter(record => {
            const lowerCaseQuery = searchQuery.toLowerCase();
            const matchesSearch = lowerCaseQuery === '' ||
                record.companyType.toLowerCase().includes(lowerCaseQuery) ||
                record.niche.toLowerCase().includes(lowerCaseQuery) ||
                record.problemDescription.toLowerCase().includes(lowerCaseQuery);

            const matchesArea = areaFilter === 'all' || record.businessArea === areaFilter;

            const recordDate = new Date(record.timestamp);
            let matchesDate = true;
            switch (dateFilter) {
                case 'last7days':
                    matchesDate = recordDate >= sevenDaysAgo;
                    break;
                case 'last30days':
                    matchesDate = recordDate >= thirtyDaysAgo;
                    break;
                case 'lastyear':
                    matchesDate = recordDate >= oneYearAgo;
                    break;
                default:
                    matchesDate = true;
            }

            return matchesSearch && matchesArea && matchesDate;
        });
    }, [records, searchQuery, areaFilter, dateFilter]);
    
    const handleExportJson = () => {
        if (filteredRecords.length === 0) return;
        const jsonString = JSON.stringify(filteredRecords, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `GrowthMind_AI_Export_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleExportCsv = () => {
        if (filteredRecords.length === 0) return;

        const escapeCsvField = (field: any): string => {
            const stringField = String(field ?? '');
            if (stringField.includes(',') || stringField.includes('"') || stringField.includes('\n')) {
                return `"${stringField.replace(/"/g, '""')}"`;
            }
            return stringField;
        };

        const formatSteps = (steps: SolutionStep[]) => 
            steps.map(s => `${s.step}. ${s.title}: ${s.description}`).join(' | ');

        const headers = [
            'ID', 'Timestamp', 'Company Type', 'Niche', 'Problem Description', 'Business Area', 
            'Result Type', 'Grounded Answer', 'Sources', 'Identified Problem', 'Problem Impact',
            'Short Term Title', 'Short Term Summary', 'Short Term Steps',
            'Long Term Title', 'Long Term Summary', 'Long Term Steps',
        ];

        const csvRows = filteredRecords.map(record => {
            const row: (string | number)[] = [
                record.id,
                record.timestamp,
                record.companyType,
                record.niche,
                record.problemDescription,
                record.businessArea,
            ];

            if ('answer' in record.result) { // GroundedAnswer
                row.push(
                    'Grounded',
                    record.result.answer,
                    record.result.sources.map(s => `${s.title} (${s.uri})`).join(' | '),
                    '', '', '', '', '', '', '', ''
                );
            } else { // AnalysisResult
                row.push(
                    'Analysis',
                    '', '', // No answer/sources
                    record.result.problemAnalysis.identifiedProblem,
                    record.result.problemAnalysis.impact,
                    record.result.shortTermSolution.title,
                    record.result.shortTermSolution.summary,
                    formatSteps(record.result.shortTermSolution.steps),
                    record.result.longTermSolution.title,
                    record.result.longTermSolution.summary,
                    formatSteps(record.result.longTermSolution.steps),
                );
            }
            return row.map(escapeCsvField).join(',');
        });

        const csvString = [headers.join(','), ...csvRows].join('\n');
        const blob = new Blob([`\uFEFF${csvString}`], { type: 'text/csv;charset=utf-8;' }); // BOM for Excel
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `GrowthMind_AI_Export_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const confirmDelete = () => {
        if (recordToDelete) {
            onDeleteRecord(recordToDelete.id);
            setRecordToDelete(null);
        }
    };

    const noResultsMessage = (
        <div className="text-center text-gray-400 py-10 px-4">
            <p>No se encontraron resultados.</p>
            <p className="text-sm">Intenta ajustar tus filtros de búsqueda.</p>
        </div>
    );
    
    const noRecordsMessage = (
        <div className="text-center text-gray-400 py-10 px-4">
            <p>Aún no has generado ninguna solución.</p>
            <p className="text-sm">Completa el formulario de arriba para empezar a construir tu base de conocimiento.</p>
        </div>
    );


    return (
        <>
            <div className="w-full max-w-4xl mt-12 slide-in-up" style={{animationDelay: '200ms'}}>
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-200 flex items-center justify-center gap-3">
                    <DatabaseIcon className="h-6 w-6 text-orange-400" />
                    Base de Conocimiento
                </h2>
                <p className="text-center text-gray-400 mb-6">Aquí se guardan todos los análisis que has generado. Puedes buscar, filtrar, ver los detalles o exportar a PDF.</p>
                
                <div className="bg-blue-950/50 rounded-2xl border border-blue-800 overflow-hidden p-4 sm:p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="relative">
                            <label htmlFor="search-records" className="sr-only">Buscar...</label>
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <SearchIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="search"
                                id="search-records"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Buscar por empresa, nicho..."
                                className="w-full pl-10 p-2.5 bg-blue-900 border border-blue-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <select
                                value={areaFilter}
                                onChange={(e) => setAreaFilter(e.target.value as BusinessArea | 'all')}
                                className="w-full p-2.5 bg-blue-900 border border-blue-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                                aria-label="Filtrar por área de negocio"
                            >
                                <option value="all">Todas las Áreas</option>
                                <optgroup label="Áreas Digitales">
                                    <option value="marketing">Marketing Digital</option>
                                    <option value="ecommerce">E-commerce</option>
                                    <option value="social_media">Redes Sociales</option>
                                    <option value="content">Contenido y SEO</option>
                                    <option value="ux_ui">Experiencia de Usuario (UX/UI)</option>
                                    <option value="data_analytics">Analítica de Datos</option>
                                </optgroup>
                                <optgroup label="Áreas de Negocio">
                                    <option value="general">General</option>
                                    <option value="sales">Ventas</option>
                                    <option value="logistics">Logística</option>
                                    <option value="hr">Recursos Humanos</option>
                                    <option value="finance">Finanzas</option>
                                    <option value="it">TI</option>
                                </optgroup>
                            </select>
                        </div>
                        <div>
                            <select
                                value={dateFilter}
                                onChange={(e) => setDateFilter(e.target.value as any)}
                                className="w-full p-2.5 bg-blue-900 border border-blue-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                                aria-label="Filtrar por fecha"
                            >
                                <option value="all">Cualquier Fecha</option>
                                <option value="last7days">Últimos 7 días</option>
                                <option value="last30days">Últimos 30 días</option>
                                <option value="lastyear">Último año</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center justify-end gap-4 mb-6 border-b border-blue-800 pb-6">
                        <span className="text-sm text-gray-400 mr-auto">Exportar {filteredRecords.length} {filteredRecords.length === 1 ? 'resultado' : 'resultados'}:</span>
                        <button
                            onClick={handleExportJson}
                            disabled={filteredRecords.length === 0}
                            className="flex items-center gap-2 text-sm text-gray-300 hover:text-white bg-blue-800 hover:bg-blue-700 px-3 py-1.5 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Exportar a JSON"
                        >
                            <FileJsonIcon className="h-4 w-4" />
                            JSON
                        </button>
                        <button
                            onClick={handleExportCsv}
                            disabled={filteredRecords.length === 0}
                            className="flex items-center gap-2 text-sm text-gray-300 hover:text-white bg-blue-800 hover:bg-blue-700 px-3 py-1.5 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Exportar a CSV"
                        >
                            <SheetIcon className="h-4 w-4" />
                            CSV
                        </button>
                        <button
                            onClick={() => setIsExportingPdf(true)}
                            disabled={filteredRecords.length === 0 || isExportingPdf || !!exportingRecordId}
                            className="flex items-center gap-2 text-sm text-gray-300 hover:text-white bg-blue-800 hover:bg-blue-700 px-3 py-1.5 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Exportar todo a PDF"
                        >
                            {isExportingPdf ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Exportando...
                                </>
                            ) : (
                                <>
                                    <FileTextIcon className="h-4 w-4" />
                                    PDF
                                </>
                            )}
                        </button>
                    </div>

                    {records.length === 0 ? noRecordsMessage : (
                        <>
                            {/* Desktop Table View */}
                            <div className="overflow-x-auto hidden md:block">
                                <table className="min-w-full divide-y divide-blue-800">
                                    <thead className="bg-black/20">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Empresa / Nicho</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Problema</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Área</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Fecha</th>
                                            <th scope="col" className="relative px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                                                Acciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-blue-800">
                                        {filteredRecords.length > 0 ? (
                                            filteredRecords.map((record) => (
                                                <tr key={record.id} className="hover:bg-blue-900/50 transition-all duration-200">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-200">{record.companyType}</div>
                                                        <div className="text-sm text-gray-400">{record.niche}</div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <p className="text-sm text-gray-300 max-w-xs truncate">{record.problemDescription}</p>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                                        <BusinessAreaDisplay area={record.businessArea} />
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                                        {new Date(record.timestamp).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <div className="flex items-center justify-end space-x-3">
                                                            <button onClick={() => handleViewRecord(record)} className="text-orange-400 hover:text-orange-300 flex items-center gap-1.5 transition transform hover:scale-110" aria-label="Ver detalles">
                                                                <EyeIcon className="h-4 w-4" />
                                                                Ver
                                                            </button>
                                                            <button 
                                                                onClick={() => setExportingRecordId(record.id)} 
                                                                className="text-blue-400 hover:text-blue-300 flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-wait transition transform hover:scale-110"
                                                                aria-label="Exportar a PDF"
                                                                disabled={!!exportingRecordId || isExportingPdf}
                                                            >
                                                                {exportingRecordId === record.id ? (
                                                                    <>
                                                                        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                        </svg>
                                                                        ...
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                      <FileDownIcon className="h-4 w-4" />
                                                                      PDF
                                                                    </>
                                                                )}
                                                            </button>
                                                            <button onClick={() => setRecordToDelete(record)} className="text-red-500 hover:text-red-400 flex items-center gap-1.5 transition transform hover:scale-110" aria-label="Eliminar registro">
                                                                <Trash2Icon className="h-4 w-4" />
                                                                Eliminar
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr><td colSpan={5}>{noResultsMessage}</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                             {/* Mobile Card View */}
                             <div className="md:hidden">
                                {filteredRecords.length > 0 ? (
                                    <div className="space-y-4">
                                        {filteredRecords.map(record => (
                                           <div key={record.id} className="bg-blue-900/50 rounded-xl p-4 border border-blue-800 flex flex-col gap-3 transition-all duration-300 hover:border-orange-500/50">
                                                {/* Header */}
                                                <div>
                                                    <div className="flex justify-between items-start">
                                                        <h3 className="font-bold text-gray-100">{record.companyType}</h3>
                                                        <BusinessAreaDisplay area={record.businessArea} className="text-xs" />
                                                    </div>
                                                    <p className="text-sm text-gray-400">{record.niche}</p>
                                                </div>
                            
                                                {/* Description */}
                                                <p className="text-sm text-gray-300 line-clamp-3">{record.problemDescription}</p>
                                                
                                                {/* Footer with actions */}
                                                <div className="flex justify-between items-center mt-2 pt-3 border-t border-blue-800/50">
                                                    <p className="text-xs text-gray-500">
                                                        {new Date(record.timestamp).toLocaleDateString()}
                                                    </p>
                                                    <div className="flex items-center justify-end space-x-1 sm:space-x-2">
                                                         <button 
                                                            onClick={() => setExportingRecordId(record.id)} 
                                                            className="text-blue-400 hover:text-blue-300 p-2 rounded-full hover:bg-blue-900/80 flex items-center disabled:opacity-50 disabled:cursor-wait transition-all"
                                                            aria-label="Exportar a PDF"
                                                            disabled={!!exportingRecordId || isExportingPdf}
                                                        >
                                                            {exportingRecordId === record.id ? (
                                                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                                            ) : (
                                                                <FileDownIcon className="h-5 w-5" />
                                                            )}
                                                        </button>
                                                        <button onClick={() => setRecordToDelete(record)} className="text-red-500 hover:text-red-400 p-2 rounded-full hover:bg-red-900/50 flex items-center transition-all" aria-label="Eliminar registro">
                                                            <Trash2Icon className="h-5 w-5" />
                                                        </button>
                                                         <button onClick={() => handleViewRecord(record)} className="bg-orange-600 hover:bg-orange-700 text-white font-bold flex items-center gap-1.5 transition-all transform hover:scale-105 px-3 sm:px-4 py-2 rounded-lg text-sm" aria-label="Ver detalles">
                                                            <EyeIcon className="h-4 w-4" />
                                                            <span>Ver</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    noResultsMessage
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
            {selectedRecord && <SolutionModal record={selectedRecord} onClose={handleCloseModal} />}
            
            {recordToDelete && (
                <div 
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex justify-center items-center p-4 fade-in"
                    onClick={() => setRecordToDelete(null)}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="delete-confirmation-title"
                >
                    <div 
                        className="bg-blue-950 rounded-2xl shadow-2xl border border-blue-800 w-full max-w-md scale-in p-6 text-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 id="delete-confirmation-title" className="text-lg font-bold text-red-400">Confirmar Eliminación</h3>
                        <p className="text-gray-400 my-4">
                            ¿Estás seguro de que deseas eliminar este registro? Esta acción no se puede deshacer.
                        </p>
                        <div className="flex justify-center gap-4 mt-6">
                            <button onClick={() => setRecordToDelete(null)} className="px-6 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-950 focus:ring-gray-500">
                                Cancelar
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-950 focus:ring-red-500"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Off-screen exporter component */}
            {exportingRecordId && (
                <div className="fixed left-[-9999px] top-[-9999px]" aria-hidden="true">
                    <PdfExporter 
                        record={recordToExport} 
                        onComplete={() => setExportingRecordId(null)} 
                    />
                </div>
            )}
            
            {isExportingPdf && (
                <div className="fixed left-[-9999px] top-[-9999px]" aria-hidden="true">
                    <MultiRecordPdfExporter 
                        records={filteredRecords} 
                        onComplete={() => setIsExportingPdf(false)} 
                    />
                </div>
            )}
        </>
    );
};