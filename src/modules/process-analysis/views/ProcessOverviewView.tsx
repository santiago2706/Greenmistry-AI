import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Activity,
    ArrowRight,
    Layers,
    AlertTriangle,
    Info,
    ChevronRight,
    Beaker
} from 'lucide-react';
import { useDemoState } from '@core/hooks/useDemoState';

interface ProcessStage {
    id: string;
    title: string;
    description: string;
    status: 'stable' | 'critical' | 'warning';
    details: string;
    impacts: {
        toxicity: number;
        waste: number;
        bioMaterials: number;
        regulatory: 'High' | 'Medium' | 'Low';
    };
}

const stages: ProcessStage[] = [
    {
        id: 'reaction-basis',
        title: 'Contexto del Proceso',
        description: 'Síntesis basada en fase líquida halogenada.',
        status: 'warning',
        details: 'Tipo de Reacción: Sustitución Nucleofílica. Solventes: Cloroformo / Diclorometano.',
        impacts: { toxicity: 85, waste: 40, bioMaterials: 10, regulatory: 'High' }
    },
    {
        id: 'catalytic-reaction',
        title: '1. Reacción Catalítica & 2. Separación',
        description: 'Etapa de filtración y destilación térmica.',
        status: 'stable',
        details: 'Catalizador base metálica. Alta demanda energética en destilación.',
        impacts: { toxicity: 20, waste: 15, bioMaterials: 30, regulatory: 'Low' }
    },
    {
        id: 'purification',
        title: '3. Purificación y Residuos',
        description: 'Gestión de subproductos y refinamiento.',
        status: 'critical',
        details: 'Generación de lodos tóxicos no tratables in-situ.',
        impacts: { toxicity: 95, waste: 90, bioMaterials: 5, regulatory: 'High' }
    }
];

const ProcessOverviewView: React.FC = () => {
    const navigate = useNavigate();
    const { isOptimized } = useDemoState();
    const [selectedStage, setSelectedStage] = useState<ProcessStage>(stages[0]);

    const getStatusColor = (status: string) => {
        if (status === 'critical') return 'border-red-500 text-red-400';
        if (status === 'warning') return 'border-amber-500 text-amber-400';
        return 'border-cyan-500 text-cyan-400';
    };

    const getStatusBadge = (status: string) => {
        if (status === 'critical') return <span className="absolute -top-2 -right-2 bg-red-600 text-[8px] font-black px-1.5 py-0.5 rounded uppercase">crítico</span>;
        if (status === 'warning') return <span className="absolute -top-2 -right-2 bg-amber-600 text-[8px] font-black px-1.5 py-0.5 rounded uppercase">revisión</span>;
        return null;
    };

    return (
        <div className="min-h-screen bg-[#0B0F14] text-slate-200 p-6 sm:p-10 font-sans selection:bg-cyan-500/30">
            <div className="max-w-7xl mx-auto">

                {/* HEADER */}
                <header className="mb-12 flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">Proceso Químico</h1>
                        <p className="text-slate-400 text-sm">Modelo técnico del proceso actual</p>
                    </div>
                    <div className="text-right">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/5">
                            Estado base (sin optimización)
                        </span>
                    </div>
                </header>

                {/* CENTRAL EXPLORER AREA */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">

                    {/* FLOW DIAGRAM (MAIN) */}
                    <div className="lg:col-span-8 bg-[#111827]/50 border border-white/5 rounded-3xl p-10 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/5 via-transparent to-transparent"></div>

                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 transition-all duration-500">
                            {stages.map((stage, idx) => (
                                <React.Fragment key={stage.id}>
                                    <div
                                        onClick={() => setSelectedStage(stage)}
                                        className={`relative w-full md:w-64 p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 ${selectedStage.id === stage.id
                                            ? `${getStatusColor(stage.status)} bg-white/5 shadow-[0_0_20px_rgba(34,211,238,0.1)]`
                                            : 'border-white/10 grayscale hover:grayscale-0 hover:border-white/20'
                                            }`}
                                    >
                                        {getStatusBadge(stage.status)}
                                        <h4 className="text-xs font-black uppercase tracking-wider mb-2 opacity-80">{stage.title}</h4>
                                        <p className="text-[11px] text-slate-400 leading-relaxed mb-4">{stage.description}</p>
                                        <div className="text-[10px] font-medium text-slate-500 bg-black/20 p-2 rounded backdrop-blur">
                                            {stage.details}
                                        </div>
                                    </div>
                                    {idx < stages.length - 1 && (
                                        <div className="hidden md:block flex-1 h-px bg-gradient-to-r from-white/5 via-white/20 to-white/5 relative">
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#111827] border border-white/20 flex items-center justify-center">
                                                <ArrowRight className="w-2.5 h-2.5 text-slate-500" />
                                            </div>
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>

                        {/* Connection Overlay Lines (Visual Only) */}
                        <div className="absolute top-1/2 left-0 w-full h-1/4 pointer-events-none opacity-20">
                            <svg className="w-full h-full" viewBox="0 0 800 100" fill="none">
                                <path d="M100,50 Q400,100 700,50" stroke="url(#gradient-line)" strokeWidth="1" strokeDasharray="5,5" />
                                <defs>
                                    <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#ef4444" />
                                        <stop offset="50%" stopColor="#22d3ee" />
                                        <stop offset="100%" stopColor="#ef4444" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                    </div>

                    {/* IMPACT PREVIEW PANEL (RIGHT) */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-[#111827] border border-white/5 rounded-3xl p-8 h-full">
                            <h3 className="text-sm font-bold text-white mb-8 flex items-center gap-2">
                                <Activity className="w-4 h-4 text-cyan-400" />
                                Vista Previa de Impacto
                            </h3>

                            <div className="space-y-8">
                                {/* Toxicity */}
                                <div>
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">Toxicidad Estimada</span>
                                        <div className={`flex items-center gap-1 text-xs font-bold ${selectedStage.impacts.toxicity > 70 ? 'text-red-400' : 'text-emerald-400'}`}>
                                            {selectedStage.impacts.toxicity > 70 ? 'ALTO' : 'BAJO'}
                                            <AlertTriangle className="w-3 h-3" />
                                        </div>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full transition-all duration-1000 ${selectedStage.impacts.toxicity > 70 ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]'}`}
                                            style={{ width: `${selectedStage.impacts.toxicity}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Waste */}
                                <div>
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">Generación de Residuos</span>
                                        <span className={`text-xs font-bold text-slate-300 tracking-tighter`}>{selectedStage.impacts.waste}kg / ton</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-amber-500 transition-all duration-1000"
                                            style={{ width: `${selectedStage.impacts.waste}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Bio-materials */}
                                <div>
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">Materias Renovables</span>
                                        <span className="text-xs font-bold text-cyan-400">{selectedStage.impacts.bioMaterials}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-cyan-500 transition-all duration-1000"
                                            style={{ width: `${selectedStage.impacts.bioMaterials}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Regulatory Risk */}
                                <div className="pt-6 border-t border-white/5">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedStage.impacts.regulatory === 'High' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                                            }`}>
                                            <AlertTriangle className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-bold text-slate-500 uppercase">Riesgo Regulatorio Pre-auditoría</div>
                                            <div className={`text-sm font-black tracking-tight ${selectedStage.impacts.regulatory === 'High' ? 'text-red-400' : 'text-emerald-400'}`}>
                                                {selectedStage.impacts.regulatory === 'High' ? 'RESTRICCIÓN CRÍTICA' : 'CUMPLIMIENTO ESTABLE'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 p-4 bg-white/5 rounded-2xl border border-white/5">
                                <p className="text-[10px] text-slate-400 leading-relaxed italic">
                                    {isOptimized
                                        ? "Cálculo actualizado tras la aplicación de sustitución de solventes halogenados por alternativas verdes base-limoneno."
                                        : "Los datos mostrados corresponden a mediciones históricas del proceso sin aplicar optimizaciones de substitución química."
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* DYNAMIC NAVIGATION BAR */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                        onClick={() => navigate('/processes')}
                        className="group relative h-20 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-2xl p-px overflow-hidden shadow-lg shadow-emerald-900/20 transition-all hover:scale-[1.02]"
                    >
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative h-full w-full bg-[#111827]/30 backdrop-blur-xl rounded-2xl flex items-center justify-center gap-4">
                            <Beaker className="w-6 h-6 text-emerald-400" />
                            <div className="text-left">
                                <span className="block text-xs font-black text-emerald-400 uppercase tracking-widest">Siguiente Fase</span>
                                <span className="block text-sm font-bold text-white">Iniciar Rediseño Ambiental</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-white/50 ml-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </button>

                    <button
                        onClick={() => navigate('/environmental-report')}
                        className="h-20 bg-[#111827] border border-white/5 rounded-2xl px-6 flex items-center gap-4 hover:border-white/20 transition-colors"
                    >
                        <Layers className="w-5 h-5 text-slate-500" />
                        <div className="text-left">
                            <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Contexto</span>
                            <span className="block text-sm font-bold text-white">Ver Impacto Ambiental</span>
                        </div>
                    </button>

                    <button
                        onClick={() => navigate('/demo')}
                        className="h-20 bg-[#111827] border border-white/5 rounded-2xl px-6 flex items-center gap-4 hover:border-white/20 transition-colors"
                    >
                        <Info className="w-5 h-5 text-slate-500" />
                        <div className="text-left">
                            <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Ayuda</span>
                            <span className="block text-sm font-bold text-white">Guía Detallada de la Demo</span>
                        </div>
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ProcessOverviewView;
