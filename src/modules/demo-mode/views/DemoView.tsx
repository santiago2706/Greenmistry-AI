import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    PlayCircle,
    Presentation,
    Zap,
    ShieldAlert,
    FileBarChart,
    ArrowRight,
    ChevronRight,
    Sparkles,
    RotateCcw
} from 'lucide-react';
import { useDemoState } from '@core/hooks/useDemoState';
import { useNotificationStore } from '@core/stores/useNotificationStore';

interface ScenarioCardProps {
    title: string;
    description: string;
    icon: React.ElementType;
    path: string;
    accentColor: string;
    tags: string[];
}

const ScenarioCard: React.FC<ScenarioCardProps> = ({ title, description, icon: Icon, path, accentColor, tags }) => {
    const navigate = useNavigate();

    return (
        <div className="group relative bg-[#111827] border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-all duration-500 overflow-hidden cursor-pointer"
            onClick={() => navigate(path)}>
            {/* Hover Glow */}
            <div className={`absolute -top-24 -right-24 w-48 h-48 bg-${accentColor}/10 rounded-full blur-3xl group-hover:opacity-100 opacity-0 transition-opacity duration-700`}></div>

            <div className="relative z-10">
                <div className={`w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-white/5`}>
                    <Icon className={`w-6 h-6 text-${accentColor}`} />
                </div>

                <h2 className="text-3xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">
                    {title}
                </h2>

                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                    {tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 bg-white/5 rounded text-[10px] text-slate-300 uppercase tracking-wider font-semibold">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="flex items-center text-xs font-bold uppercase tracking-widest text-slate-300 group-hover:text-white transition-colors duration-300">
                    <PlayCircle className="w-4 h-4 mr-2" />
                    Iniciar Escenario
                    <ChevronRight className="w-4 h-4 ml-auto transform group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
        </div>
    );
};

const DemoView: React.FC = () => {
    const navigate = useNavigate();
    const { setPreset, resetDemo, score } = useDemoState();
    const { notify } = useNotificationStore();

    return (
        <div className="min-h-screen bg-[#0B0F14] text-slate-200 p-6 sm:p-10 font-sans selection:bg-cyan-500/30">
            <div className="max-w-7xl mx-auto">

                {/* TOP BAR */}
                <div className="flex justify-between items-center mb-16">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                            <Presentation className="w-5 h-5 text-black" />
                        </div>
                        <div>
                            <span className="text-xs font-black tracking-[0.2em] text-cyan-500 uppercase">Executive</span>
                            <h2 className="text-sm font-bold text-white tracking-tight">DEMO MODE CONTROL</h2>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate('/dashboard')}
                        className="text-xs font-bold text-slate-400 hover:text-white transition-colors flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10"
                    >
                        Salir del Modo Demo
                    </button>
                </div>

                {/* HERO SECTION */}
                <div className="mb-16 relative">
                    <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-cyan-500/5 to-transparent blur-3xl pointer-events-none"></div>

                    <div className="relative z-10 max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-6">
                            <Sparkles className="w-3 h-3" />
                            Ready for Stakeholders
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-[1.1] tracking-tight">
                            Presenta el Futuro de la <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Química Verde</span>.
                        </h1>
                        <p className="text-lg text-slate-400 leading-relaxed mb-10">
                            Selecciona la configuración inicial del motor de análisis para contrastar resultados durante la presentación.
                        </p>

                        <div className="flex flex-wrap gap-4 mb-2">
                            <button
                                onClick={() => {
                                    setPreset('initial');
                                    notify('Carga de Escenario', 'system', 'Iniciando Baseline [ESC-01]: Alto Riesgo. Monitoreo de riesgos críticos activo.');
                                }}
                                className={`px-5 py-3 rounded-xl border text-xs font-bold transition-all ${score <= 45 ? 'bg-red-500/20 border-red-500/50 text-red-400 font-black' : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'}`}
                            >
                                [ESC-01] Estado Base (Alto Riesgo)
                            </button>
                            <button
                                onClick={() => {
                                    setPreset('optimized');
                                    notify('Carga de Escenario', 'system', 'Optimizando Procesos [ESC-02]: Transición verde. Rediseño de solventes en curso.');
                                }}
                                className={`px-5 py-3 rounded-xl border text-xs font-bold transition-all ${score > 50 && score < 90 ? 'bg-amber-500/20 border-amber-500/50 text-amber-400 font-black' : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'}`}
                            >
                                [ESC-02] Proceso Optimizado
                            </button>
                            <button
                                onClick={() => {
                                    setPreset('compliance');
                                    notify('Carga de Escenario', 'compliance', 'Validación Total [ESC-03]: Estado Certificado. Cumplimiento normativo alcanzado.');
                                }}
                                className={`px-5 py-3 rounded-xl border text-xs font-bold transition-all ${score >= 90 ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400 font-black' : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'}`}
                            >
                                [ESC-03] Cumplimiento (Audit Ready)
                            </button>
                        </div>
                    </div>
                </div>

                {/* SCENARIOS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    <ScenarioCard
                        title="Optimización Sostenible"
                        description="Muestra cómo la sustitución de solventes halogenados impacta positivamente el Reporte Ambiental en tiempo real."
                        icon={Zap}
                        path="/processes"
                        accentColor="emerald-400"
                        tags={['R&D', 'Material Science', 'ESG']}
                    />
                    <ScenarioCard
                        title="Auditoría de Cumplimiento"
                        description="Simula una revisión regulatoria REACH/EPA y cómo el sistema alerta sobre riesgos toxicológicos críticos."
                        icon={ShieldAlert}
                        path="/regulatory"
                        accentColor="red-400"
                        tags={['Legal', 'Compliance', 'Safety']}
                    />
                    <ScenarioCard
                        title="Dashboard Ejecutivo"
                        description="Vista de alto nivel con métricas agregadas de sostenibilidad para toma de decisiones estratégica."
                        icon={FileBarChart}
                        path="/dashboard"
                        accentColor="cyan-400"
                        tags={['Management', 'ROI', 'Green KPIs']}
                    />
                </div>

                {/* FOOTER CALL TO ACTION */}
                <div className="bg-gradient-to-r from-slate-900 to-slate-900 border border-white/5 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">¿Necesitas una demo personalizada?</h3>
                        <p className="text-slate-400">El sistema permite inyectar datasets específicos para cada sector industrial.</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <button
                            onClick={() => {
                                resetDemo();
                                notify('Reinicio de Sistema', 'alert', 'Estado del demo restablecido. El cockpit vuelve a su estado base de monitoreo primario.');
                            }}
                            className="whitespace-nowrap px-8 py-3 border border-red-500/30 text-red-400 font-bold text-xs rounded-xl hover:bg-red-500/10 transition-all flex items-center justify-center gap-2"
                        >
                            <RotateCcw className="w-4 h-4" />
                            Restablecer Demo
                        </button>
                        <button className="whitespace-nowrap px-8 py-4 bg-white text-black font-black text-sm rounded-xl hover:bg-slate-200 transition-all flex items-center gap-3">
                            Configurar Dataset Demo
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DemoView;
