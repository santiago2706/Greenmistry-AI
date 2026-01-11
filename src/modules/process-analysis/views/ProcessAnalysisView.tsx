import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FlaskConical,
    AlertTriangle,
    ArrowRight,
    Info,
    Activity,
    FileText,
    Upload,
    X,
    Zap,
    ShieldCheck,
    Skull,
    Flame,
    Thermometer,
    Gauge,
    Droplets
} from 'lucide-react';
import { useNotificationStore } from '@core/stores/useNotificationStore';
import { useContextualInsight } from '@core/stores/useContextualInsight';
import { useReactionStore, Chemical } from '@core/stores/useReactionStore';
import { chemicalRegistry } from '@core/data/chemicalRegistry';

export const ProcessAnalysisView: React.FC = () => {
    const navigate = useNavigate();
    const { notify } = useNotificationStore();
    const { openInsight } = useContextualInsight();

    const {
        activeMixture: mixture,
        addToMixture,
        removeFromMixture,
        reactionTemp,
        setTemp: setReactionTemp,
        reactionPH,
        setPH: setReactionPH,
        hasProtocol: hasFile,
        setHasProtocol: setHasFile,
        clearMixture
    } = useReactionStore();

    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const toggleToMixture = (chem: Chemical) => {
        if (mixture.find(c => c.id === chem.id)) {
            removeFromMixture(chem.id);
        } else if (mixture.length < 10) {
            addToMixture(chem);
        } else {
            notify('Límite Alcanzado', 'alert', 'No se pueden mezclar más de 10 productos simultáneamente.');
        }
    };

    const swapInMixture = (oldId: string, newId: string) => {
        const substitute = chemicalRegistry.find(c => c.id === newId);
        if (substitute) {
            removeFromMixture(oldId);
            addToMixture(substitute);
            notify('Optimización Realizada', 'success', `Sustitución exitosa: ${substitute.name} ha reemplazado al componente crítico.`);
        }
    };

    const handleRunAIAnalysis = () => {
        if (mixture.length === 0) return;
        setIsAnalyzing(true);
        setTimeout(() => {
            setIsAnalyzing(false);
            const highRisk = mixture.filter(c => c.hazard === 'high');
            if (highRisk.length > 0) {
                notify(
                    'Análisis Químico Crítico',
                    'alert',
                    `Se han detectado ${highRisk.length} componentes de alto impacto. Recomendamos usar el Swapper Directo.`
                );
            } else {
                notify('Fórmula Estable', 'success', 'La mezcla actual cumple con los estándares de Química Verde.');
            }
        }, 2000);
    };

    const getGHSIcon = (ghs?: string) => {
        switch (ghs) {
            case 'skull': return <Skull className="w-3 h-3 text-red-500" />;
            case 'flame': return <Flame className="w-3 h-3 text-orange-500" />;
            case 'corrosive': return <Droplets className="w-3 h-3 text-amber-500" />;
            case 'bio': return <Activity className="w-3 h-3 text-purple-500" />;
            default: return null;
        }
    };

    return (
        <div className="min-h-screen bg-[#0B0F14] text-slate-200 p-6 font-sans">
            <header className="mb-8 border-b border-white/5 pb-4 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-black text-white tracking-tighter uppercase flex items-center gap-3">
                        <FlaskConical className="w-8 h-8 text-cyan-400" />
                        Reaction Lab & Mixing Bench
                    </h1>
                    <p className="text-xs text-slate-500 font-mono mt-1">SISTEMA DE DISEÑO SINTÉTICO V4.2 // IA-OPTIMIZER ENABLED</p>
                </div>
                <div className="flex gap-4">
                    <div className="text-right">
                        <div className="text-[10px] text-slate-600 font-black uppercase tracking-widest">Protocolo</div>
                        <div className={`text-xs font-bold ${hasFile ? 'text-emerald-400' : 'text-amber-500'}`}>
                            {hasFile ? 'ESPECIFICACIÓN CARGADA' : 'PENDIENTE DE ARCHIVO'}
                        </div>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative">

                {/* Floating Instructions */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-12 right-0 bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-lg backdrop-blur-md hidden lg:flex items-center gap-3 z-20"
                >
                    <Info className="w-4 h-4 text-cyan-400" />
                    <p className="text-[10px] text-cyan-200/70 font-medium">
                        <span className="text-cyan-400 font-bold uppercase mr-2">Guía del Operador:</span>
                        Seleccione hasta 10 insumos para simular la mezcla. Cargue el protocolo para una precisión de IA del 99%.
                    </p>
                </motion.div>

                {/* LEFT COLUMN – CHEMICAL LIBRARY */}
                <aside className="lg:col-span-3 space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest">Librería de Insumos</h3>
                        <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">{chemicalRegistry.length} DISPONIBLES</span>
                    </div>
                    <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                        {chemicalRegistry.map((chem) => (
                            <button
                                key={chem.id}
                                onClick={() => toggleToMixture(chem)}
                                className={`w-full text-left p-3 rounded-xl border transition-all duration-300 group relative overflow-hidden
                                    ${mixture.find(c => c.id === chem.id)
                                        ? 'border-cyan-500 bg-cyan-500/5 shadow-inner'
                                        : 'border-white/5 bg-[#0F172A] hover:border-cyan-400/30'
                                    }`}
                            >
                                <div className="flex justify-between items-center relative z-10">
                                    <div className="flex flex-col">
                                        <span className={`text-xs font-bold uppercase tracking-tight ${mixture.find(c => c.id === chem.id) ? 'text-cyan-400' : 'text-slate-300'}`}>
                                            {chem.name}
                                        </span>
                                        <span className="text-[10px] text-slate-600 uppercase font-mono">{chem.type}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {chem.hazard === 'high' && (
                                            <div
                                                onClick={(e) => { e.stopPropagation(); openInsight(chem.id); }}
                                                className="p-1.5 hover:bg-white/10 rounded cursor-pointer"
                                            >
                                                <Info className="w-3 h-3 text-slate-500" />
                                            </div>
                                        )}
                                        <div className={`w-2 h-2 rounded-full ${chem.hazard === 'high' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' :
                                            chem.hazard === 'medium' ? 'bg-amber-400' : 'bg-emerald-400'
                                            }`} />
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </aside>

                {/* CENTER COLUMN – MIXING BENCH */}
                <main className="lg:col-span-6 space-y-6">
                    {/* Mixing Bench Card */}
                    <div className="bg-[#111827] rounded-2xl border border-white/5 p-8 relative overflow-hidden shadow-2xl min-h-[500px] flex flex-col">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500/0 via-cyan-500/50 to-cyan-500/0"></div>

                        <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                            <Activity className="w-4 h-4 text-cyan-500 animate-pulse" />
                            Banqueta de Mezcla & Análisis AI
                        </h2>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            {/* Document Upload Simulation */}
                            <div
                                onClick={() => setHasFile(true)}
                                className={`col-span-2 border-2 border-dashed rounded-2xl p-8 transition-all cursor-pointer flex flex-col items-center justify-center gap-3 border-white/5 hover:border-cyan-500/30 group ${hasFile ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-slate-900/30'}`}
                            >
                                {hasFile ? (
                                    <>
                                        <FileText className="w-8 h-8 text-emerald-400" />
                                        <div className="text-center">
                                            <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Protocolo_Sintesis_V1.pdf</p>
                                            <p className="text-[10px] text-slate-500 mt-1 font-mono">FILE_CRC: 0x55FA82 // 1.2 MB</p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <Upload className="w-8 h-8 text-slate-700 group-hover:text-cyan-500 transition-colors" />
                                        <div className="text-center">
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Subir Protocolo de Mezcla</p>
                                            <p className="text-[10px] text-slate-600 mt-1">PDF, JSON o Archivo de Estandarización</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Mixture Slots */}
                        <div className="flex-1 space-y-3">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest italic">Composición de Celda</span>
                                <span className="text-[10px] text-cyan-500 font-mono">{mixture.length}/10 SUBS</span>
                            </div>

                            {mixture.length === 0 ? (
                                <div className="h-40 border border-white/5 rounded-2xl flex flex-col items-center justify-center text-slate-700 bg-slate-900/10">
                                    <FlaskConical className="w-8 h-8 mb-2 opacity-10" />
                                    <p className="text-[10px] uppercase font-bold tracking-widest opacity-30">Cámara de Reacción Vacía</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-3">
                                    <AnimatePresence>
                                        {mixture.map((chem) => (
                                            <motion.div
                                                key={chem.id}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.9, x: 20 }}
                                                className={`bg-slate-800/40 border p-3 rounded-xl flex flex-col gap-2 relative group overflow-hidden ${chem.hazard === 'high' ? 'border-red-500/30' : 'border-white/10'}`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        {getGHSIcon(chem.ghsClass)}
                                                        <span className="text-xs font-bold text-slate-200 truncate max-w-[120px] uppercase tracking-tighter">{chem.name}</span>
                                                    </div>
                                                    <X
                                                        onClick={() => toggleToMixture(chem)}
                                                        className="w-3 h-3 text-slate-600 hover:text-red-400 cursor-pointer"
                                                    />
                                                </div>

                                                {chem.hazard === 'high' && chem.substituteId && (
                                                    <button
                                                        onClick={() => swapInMixture(chem.id, chem.substituteId!)}
                                                        className="w-full py-1 text-[9px] font-black uppercase tracking-widest bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center gap-1"
                                                    >
                                                        <Zap className="w-2.5 h-2.5" />
                                                        Sustituir Inteligente
                                                    </button>
                                                )}

                                                {/* Hazard Pulse for High Risk */}
                                                {chem.hazard === 'high' && (
                                                    <div className="absolute inset-0 bg-red-500/5 animate-pulse pointer-events-none" />
                                                )}
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            )}
                        </div>

                        {/* Experimental Parameters Panel */}
                        <div className="mt-6 bg-slate-900/50 p-6 rounded-2xl border border-white/5 space-y-4">
                            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <Activity className="w-3 h-3" />
                                Laboratorio de Parámetros
                            </h3>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                                        <div className="flex items-center gap-2 uppercase tracking-tighter">
                                            <Thermometer className="w-3 h-3" />
                                            Temperatura
                                        </div>
                                        <span>{reactionTemp}°C</span>
                                    </div>
                                    <input
                                        type="range" min="0" max="250" value={reactionTemp}
                                        onChange={(e) => setReactionTemp(parseInt(e.target.value))}
                                        className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                                        <div className="flex items-center gap-2 uppercase tracking-tighter">
                                            <Gauge className="w-3 h-3" />
                                            Acidez (pH)
                                        </div>
                                        <span>{reactionPH}</span>
                                    </div>
                                    <input
                                        type="range" min="0" max="14" step="0.1" value={reactionPH}
                                        onChange={(e) => setReactionPH(parseFloat(e.target.value))}
                                        className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Action Bench */}
                        <div className="mt-8 pt-6 border-t border-white/5 flex gap-4">
                            <button
                                onClick={() => {
                                    notify('Generando Reporte...', 'system', 'Sintetizando datos de temperatura, pH y perfiles de toxicidad molecular.');
                                    setTimeout(() => {
                                        notify('Reporte Listo', 'success', `Estabilidad del 88% detectada a ${reactionTemp}°C. Se recomienda ajuste de pH.`);
                                    }, 1500);
                                }}
                                disabled={mixture.length === 0}
                                className="flex-1 py-4 bg-slate-800 border border-white/10 rounded-2xl flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest text-slate-400 hover:bg-slate-700 hover:text-white transition-all disabled:opacity-30"
                            >
                                <FileText className="w-5 h-5" />
                                Generar Reporte Detallado
                            </button>
                            <button
                                onClick={handleRunAIAnalysis}
                                disabled={mixture.length === 0 || isAnalyzing}
                                className={`flex-[1.5] py-4 bg-gradient-to-r from-cyan-600 to-emerald-600 rounded-2xl flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-cyan-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-30 relative overflow-hidden
                                    ${isAnalyzing
                                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                                        : ''
                                    } ${mixture.length === 0 ? 'opacity-30 cursor-not-allowed grayscale' : ''}`}
                            >
                                {isAnalyzing ? (
                                    <>
                                        <div className="w-3 h-3 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                                        Ejecutando IA-Optimizer...
                                    </>
                                ) : (
                                    <>
                                        <Zap className="w-4 h-4" />
                                        Optimizar Fórmula Química
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </main>

                {/* RIGHT COLUMN – PRINCIPLES & METRICS */}
                <aside className="lg:col-span-3 space-y-6">
                    <div className="bg-[#111827] rounded-2xl border border-white/5 p-6 h-full">
                        <h3 className="text-xs font-black mb-8 text-slate-500 uppercase tracking-widest border-b border-white/5 pb-4">
                            Indicadores de Mezcla
                        </h3>

                        <div className="space-y-6">
                            <div className="group">
                                <div className="flex justify-between text-[10px] font-black uppercase text-slate-500 mb-2">
                                    <span>Eco-Toxicidad Actual</span>
                                    <span className={mixture.some(c => c.hazard === 'high') ? 'text-red-400' : 'text-emerald-400'}>
                                        {mixture.some(c => c.hazard === 'high') ? 'CRÍTICO' : 'NOMINAL'}
                                    </span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: mixture.length > 0 ? `${(mixture.filter(c => c.hazard === 'high').length / mixture.length) * 100}%` : 0 }}
                                        className="h-full bg-red-500"
                                    />
                                </div>
                            </div>

                            {/* Delta Comparison */}
                            <div className="p-4 bg-slate-900/30 border border-white/5 rounded-2xl space-y-4">
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Comparativa Delta</h4>
                                <div className="space-y-3">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex justify-between text-[8px] font-bold text-slate-600 uppercase"><span>Cerrado Original</span> <span>100% Impacto</span></div>
                                        <div className="h-1 w-full bg-slate-800 rounded-full"><div className="h-full w-full bg-slate-700" /></div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <div className="flex justify-between text-[8px] font-bold text-emerald-500/70 uppercase"><span>Optimización IA</span> <span>-{mixture.some(c => c.hazard === 'high') ? '74%' : '0%'}</span></div>
                                        <div className="h-1 w-full bg-slate-800 rounded-full"><div className="h-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" style={{ width: mixture.some(c => c.hazard === 'high') ? '26%' : '100%' }} /></div>
                                    </div>
                                </div>
                            </div>

                            <ul className="space-y-4 text-xs font-bold">
                                <li onClick={() => openInsight('principle-1')} className="flex items-center justify-between group cursor-pointer hover:text-cyan-400 transition-colors">
                                    <span className="text-slate-500 group-hover:text-cyan-400 italic">Principios de Prevención</span>
                                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                                </li>
                                <li onClick={() => openInsight('principle-2')} className="flex items-center justify-between group cursor-pointer hover:text-cyan-400 transition-colors">
                                    <span className="text-slate-500 group-hover:text-cyan-400 italic">Economía Atómica Mix</span>
                                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                                </li>
                                <li className="flex items-center justify-between opacity-30">
                                    <span className="text-slate-600 italic">Uso Solventes Seguros</span>
                                    <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                                </li>
                            </ul>
                        </div>

                        <div className="mt-12 p-4 bg-slate-900/50 rounded-xl border border-white/5">
                            <p className="text-[10px] leading-relaxed text-slate-500 font-mono italic">
                                "La IA evaluará la compatibilidad de los ligandos y recomendará el solvente de menor impacto ambiental basado en el archivo de diseño."
                            </p>
                        </div>
                    </div>
                </aside>
            </div>

            {/* BOTTOM NAV */}
            <footer className="mt-8 pt-8 border-t border-white/5 flex justify-between items-center">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="text-xs font-black text-slate-600 hover:text-white transition-colors uppercase tracking-widest flex items-center gap-2"
                >
                    <ArrowRight className="w-4 h-4 rotate-180" />
                    Volver al Dashboard
                </button>
                <div className="flex gap-4">
                    <button
                        onClick={() => clearMixture()}
                        className="px-6 py-2.5 border border-slate-800 text-slate-500 hover:text-white hover:border-slate-600 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                    >
                        Limpiar Celda
                    </button>
                    <button
                        onClick={() => navigate('/environmental-report')}
                        className="px-8 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:bg-emerald-500 transition-all"
                    >
                        Generar Reporte Final
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default ProcessAnalysisView;
