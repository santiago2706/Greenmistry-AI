import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronDown,
    ChevronUp,
    FileText,
    Scan,
    Sparkles,
    Wind,
    Settings2,
    FlaskConical,
    ArrowRight,
    Info,
    Activity,
    X,
    Zap,
    Skull,
    Flame,
    Droplets,
    AlertTriangle,
    Layers,
    ShieldCheck
} from 'lucide-react';
import { useNotificationStore } from '@core/stores/useNotificationStore';
import { useReactionStore, Chemical } from '@core/stores/useReactionStore';
import { chemicalRegistry } from '@core/data/chemicalRegistry';
import { analyzeChemistry } from '@core/utils/chemistryEngine';
import { GREEN_CHEMISTRY_PRINCIPLES } from '@shared/constants/greenChemistry';

const ProcessAnalysisView: React.FC = () => {
    const navigate = useNavigate();
    const { notify } = useNotificationStore();

    const {
        activeMixture: mixture,
        reactionTemp,
        reactionPH,
        mixingSpeed,
        pressure,
        processType,
        isConfirmed,
        setTemp,
        setPH,
        setMixingSpeed,
        setPressure,
        setProcessType,
        setIsConfirmed,
        addToMixture,
        removeFromMixture,
        updateChemicalAmount,
        clearMixture,
        setProcessContext,
        processContext
    } = useReactionStore();

    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [scanProgress, setScanProgress] = useState<{ step: string; result: string } | null>(null);
    const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);
    const [showReport, setShowReport] = useState(false);
    const [contextMode, setContextMode] = useState<'standard' | 'audit' | 'executive'>('standard');

    // Contextual Analysis
    const analysis = useMemo(() =>
        analyzeChemistry(mixture, reactionTemp, reactionPH, mixingSpeed, pressure, contextMode, processType),
        [mixture, reactionTemp, reactionPH, mixingSpeed, pressure, contextMode, processType]
    );

    const toggleToMixture = (chem: Chemical) => {
        if (mixture.find(c => c.id === chem.id)) {
            removeFromMixture(chem.id);
        } else if (mixture.length < 10) {
            addToMixture(chem);
        } else {
            notify('Capacidad Alcanzada', 'alert', 'El sistema de simulación está optimizado para un máximo de 10 componentes simultáneos.');
        }
    };

    const swapInMixture = (oldId: string, newId: string) => {
        const substitute = chemicalRegistry.find(c => c.id === newId);
        const original = mixture.find(c => c.id === oldId);
        if (substitute && original) {
            removeFromMixture(oldId);
            addToMixture(substitute);

            notify(
                'Optimización Realizada',
                'success',
                `Se ha reemplazado ${original.name} por ${substitute.name}. Resultado: Mejora en Seguridad Inherente (Principio 12).`
            );
        }
    };

    const handleRunAIAnalysis = () => {
        if (mixture.length === 0) return;
        setIsAnalyzing(true);
        setTimeout(() => {
            setIsAnalyzing(false);
            setProcessContext({ overallStatus: analysis.status });
            notify(
                'Sincronización Completa',
                'success',
                `Análisis determinístico para ${processType} finalizado con ${analysis.optimizations.length} propuestas de mejora.`
            );
        }, 1500);
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
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] bg-cyan-950 text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/30 font-black uppercase tracking-widest">Contexto</span>
                        <p className="text-xs text-slate-300 font-mono italic">{processContext.name}</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="text-right">
                        <div className="text-[10px] text-slate-300 font-black uppercase tracking-widest">Estado de Diseño</div>
                        <div className={`text-xs font-bold uppercase ${analysis.status === 'nominal' ? 'text-emerald-400' : analysis.status === 'evaluation' ? 'text-amber-500' : 'text-red-500'}`}>
                            {analysis.status === 'nominal' ? 'Cumplimiento Nominal' : analysis.status === 'evaluation' ? 'Bajo Evaluación' : 'Restricción Detectada'}
                        </div>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
                {/* LEFT COLUMN – CHEMICAL LIBRARY */}
                <aside className="lg:col-span-3 space-y-4">
                    <div className="bg-[#111827] border border-white/5 rounded-2xl p-6 h-full flex flex-col">
                        <div className="flex items-center justify-between mb-4 px-2">
                            <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Inventario</h3>
                            <span className="text-[9px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-mono">{chemicalRegistry.length} REGISTROS</span>
                        </div>
                        <div className="space-y-2 flex-1 overflow-y-auto pr-2 custom-scrollbar max-h-[65vh]">
                            {chemicalRegistry.map((chem) => (
                                <button
                                    key={chem.id}
                                    onClick={() => toggleToMixture(chem)}
                                    className={`w-full text-left p-3 rounded-xl border transition-all duration-300 group relative
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
                                            <span className="text-[10px] text-slate-300 uppercase font-mono">{chem.type}</span>
                                        </div>
                                        {getGHSIcon(chem.ghsClass)}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* CENTER COLUMN – WORKBENCH */}
                <main className="lg:col-span-6 space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                        {/* Demo Scenarios */}
                        <div className="bg-[#111827] border border-white/5 rounded-2xl p-6">
                            <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Zap className="w-3 h-3 text-amber-500" />
                                Escenarios de Demo
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => {
                                        clearMixture();
                                        setProcessContext({ name: 'Auditoría de Cumplimiento REACH', industry: 'Auditoría Industrial' });
                                        const fertBase = chemicalRegistry.filter(c => ['fert-h3po4', 'acetone', 'benzene'].includes(c.id));
                                        fertBase.forEach(addToMixture);
                                        setContextMode('audit');
                                        setIsConfirmed(false);
                                        notify('Datos de Auditoría Cargados', 'alert', 'Revise los parámetros antes de confirmar el análisis.');
                                    }}
                                    className="p-4 bg-slate-900/60 border border-red-500/20 rounded-2xl text-left transition-all hover:border-red-500/40 relative overflow-hidden group shadow-[0_0_20px_rgba(239,68,68,0.05)]"
                                >
                                    <div className="absolute top-2 right-2 p-1.5 bg-red-500/10 rounded-lg">
                                        <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                                    </div>
                                    <div className="md:pr-6">
                                        <div className="text-[10px] font-black text-white uppercase mb-1 tracking-tighter">Auditoría de Cumplimiento</div>
                                        <div className="text-[9px] text-slate-300 leading-tight">Detección de riesgos REACH/EPA y alertas críticas.</div>
                                    </div>
                                    <div className="mt-3 flex gap-1">
                                        <span className="text-[8px] bg-red-500/20 text-red-500 px-1.5 py-0.5 rounded font-black uppercase tracking-widest">LEGAL</span>
                                        <span className="text-[8px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-black uppercase tracking-widest">SAFETY</span>
                                    </div>
                                </button>

                                <button
                                    onClick={() => {
                                        clearMixture();
                                        setProcessContext({ name: 'Dashboard de Estrategia Sostenible', industry: 'Executive Management' });
                                        const improved = chemicalRegistry.filter(c => ['ethanol', 'ecopure', 'water'].includes(c.id));
                                        improved.forEach(addToMixture);
                                        setContextMode('executive');
                                        setIsConfirmed(false);
                                        notify('Datos Ejecutivos Cargados', 'success', 'Confirme los parámetros para ver el ROI proyectado.');
                                    }}
                                    className="p-4 bg-slate-900/60 border border-cyan-500/20 rounded-2xl text-left transition-all hover:border-cyan-500/40 relative overflow-hidden group shadow-[0_0_20px_rgba(34,211,238,0.05)]"
                                >
                                    <div className="absolute top-2 right-2 p-1.5 bg-cyan-500/10 rounded-lg">
                                        <Layers className="w-3.5 h-3.5 text-cyan-400" />
                                    </div>
                                    <div className="md:pr-6">
                                        <div className="text-[10px] font-black text-white uppercase mb-1 tracking-tighter">Dashboard Ejecutivo</div>
                                        <div className="text-[9px] text-slate-300 leading-tight">Métricas agregadas y ROI para toma de decisiones.</div>
                                    </div>
                                    <div className="mt-3 flex gap-1">
                                        <span className="text-[8px] bg-cyan-500/10 text-cyan-500 px-1.5 py-0.5 rounded font-black uppercase tracking-widest">MANAGEMENT</span>
                                        <span className="text-[8px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-black uppercase tracking-widest">GREEN KPIS</span>
                                    </div>
                                </button>

                                <button
                                    onClick={() => {
                                        setIsScanning(true);
                                        setScanProgress({ step: 'Analizando Texto...', result: 'Protocolo NPK-V4 Detectado' });
                                        setContextMode('standard');

                                        setTimeout(() => {
                                            setScanProgress({ step: 'Extrayendo Reactivos...', result: '6 Componentes Identificados' });
                                        }, 1000);

                                        setTimeout(() => {
                                            clearMixture();
                                            setProcessContext({
                                                name: 'Neutralización Avanzada NPK (Simulación PDF)',
                                                industry: 'Agroindustria / Fertilizantes Solubles'
                                            });
                                            const fertBase = chemicalRegistry.filter(c =>
                                                ['fert-h3po4', 'fert-nh3', 'fert-h2o', 'fert-k2o', 'fert-znso4', 'fert-mgso4'].includes(c.id)
                                            );
                                            fertBase.forEach(addToMixture);
                                            setTemp(85);
                                            setPH(6.0);
                                            setMixingSpeed(75);
                                            setPressure(1.5);
                                            setIsScanning(false);
                                            setScanProgress(null);
                                            setIsConfirmed(false);
                                            notify('Protocolo Industrial Cargado', 'success', 'Revise la configuración de reactivos y parámetros.');
                                        }, 3000);
                                    }}
                                    disabled={isScanning}
                                    className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-left transition-all group col-span-2 flex items-center gap-4"
                                >
                                    <div className="p-2 bg-cyan-500/10 rounded-lg group-hover:scale-110 transition-transform">
                                        <FileText className="w-5 h-5 text-cyan-400" />
                                    </div>
                                    <div>
                                        <div className="text-[9px] font-black text-white uppercase mb-1 tracking-tighter">Cargar Protocolo Industrial (PDF)</div>
                                        <div className="text-[10px] text-slate-300 font-medium leading-tight italic">Simular análisis de documento técnico.</div>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Workbench Area */}
                        <div className="bg-[#111827] border border-white/5 rounded-2xl p-8 min-h-[500px] flex flex-col shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500/0 via-cyan-500/50 to-cyan-500/0"></div>

                            <div className="flex justify-between items-start mb-6">
                                <h3 className="text-xs font-black text-slate-300 uppercase tracking-[0.2em] flex items-center gap-2">
                                    <Activity className="w-4 h-4 text-cyan-500 animate-pulse" />
                                    Matriz de Simulación
                                </h3>
                                {/* Process Type Selection (Moved from Absolute to here) */}
                                {!isConfirmed && mixture.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-6 p-4 bg-slate-900/60 rounded-2xl border border-white/5 space-y-4"
                                    >
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">Definir Objetivo del Proceso</p>
                                        <div className="flex flex-wrap justify-center gap-2">
                                            {['Síntesis NPK', 'Recuperación Solventes', 'Neutralización pH'].map(type => (
                                                <button
                                                    key={type}
                                                    onClick={() => setProcessType(type)}
                                                    className={`px-3 py-1.5 text-[8px] font-black uppercase rounded-lg border transition-all ${processType === type ? 'bg-cyan-500 text-black border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)]' : 'bg-black/20 text-slate-400 border-white/5 hover:border-white/20'}`}
                                                >
                                                    {type}
                                                </button>
                                            ))}
                                        </div>
                                        <button
                                            onClick={() => {
                                                setIsConfirmed(true);
                                                notify('Parámetros Confirmados', 'success', `Iniciando diagnóstico para ${processType}.`);
                                            }}
                                            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                                        >
                                            <Zap className="w-4 h-4" />
                                            Confirmar Proceso Industrial
                                        </button>
                                    </motion.div>
                                )}
                                {isScanning && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="mb-6 flex flex-col gap-2 p-4 bg-cyan-500/10 rounded-2xl border border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.1)]"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-cyan-400 text-[10px] font-black uppercase tracking-widest">
                                                <Scan className="w-3 h-3 animate-pulse" />
                                                <span className="animate-pulse">{scanProgress?.step || 'Procesando...'}</span>
                                            </div>
                                            <span className="text-[9px] text-cyan-500 font-mono">{scanProgress?.result}</span>
                                        </div>
                                        <div className="w-full h-1 bg-cyan-900/50 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-cyan-400"
                                                initial={{ width: '0%' }}
                                                animate={{ width: '100%' }}
                                                transition={{ duration: 3 }}
                                            />
                                        </div>
                                    </motion.div>
                                )}
                                <div className="text-[10px] text-cyan-500 font-mono bg-cyan-500/5 px-2 py-1 rounded border border-cyan-500/20 uppercase">
                                    Mezcla: {mixture.length} / 10
                                </div>
                            </div>

                            <div className="flex-1 space-y-3">
                                {mixture.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-slate-800 border-2 border-dashed border-white/5 rounded-3xl">
                                        <FlaskConical className="w-16 h-16 mb-4 opacity-5" />
                                        <p className="text-[10px] uppercase font-black tracking-widest opacity-20">Celda de Carga Vacía</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-3">
                                        <AnimatePresence>
                                            {mixture.map((chem) => (
                                                <motion.div
                                                    key={chem.id}
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.9 }}
                                                    className={`p-3 rounded-xl border flex flex-col gap-2 relative overflow-hidden transition-colors ${chem.hazard === 'high' ? 'bg-red-500/5 border-red-500/20' : 'bg-slate-800/40 border-white/5'}`}
                                                >
                                                    <div className="flex justify-between items-center relative z-10">
                                                        <span className="text-[10px] font-black text-slate-200 uppercase tracking-tight truncate max-w-[100px]">{chem.name}</span>
                                                        <X
                                                            onClick={() => toggleToMixture(chem)}
                                                            className="w-3 h-3 text-slate-600 hover:text-red-400 cursor-pointer"
                                                        />
                                                    </div>

                                                    <div className="flex items-center gap-2 relative z-10 bg-black/40 p-2 rounded-xl border border-white/10 shadow-inner group">
                                                        <input
                                                            type="number"
                                                            value={chem.amount || 100}
                                                            onChange={(e) => updateChemicalAmount(chem.id, parseFloat(e.target.value) || 0)}
                                                            className="bg-transparent text-xs font-black font-mono text-emerald-400 w-full focus:outline-none placeholder:text-slate-700"
                                                            min="0"
                                                        />
                                                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">g</span>
                                                    </div>

                                                    {chem.hazard === 'high' && chem.substituteId && (
                                                        <button
                                                            onClick={() => swapInMixture(chem.id, chem.substituteId!)}
                                                            className="w-full py-1 text-[8px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center gap-1"
                                                        >
                                                            <Zap className="w-2.5 h-2.5" />
                                                            Optimizar
                                                        </button>
                                                    )}
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                )}
                            </div>

                            {/* Process Condition Controls */}
                            <div className="grid grid-cols-2 gap-6 mb-4 bg-slate-900/40 p-4 rounded-xl border border-white/5">
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <label
                                            title="La temperatura afecta la velocidad de reacción y la volatilización de amoníaco. Mantener < 60°C para eficiencia."
                                            className="text-[10px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-2 cursor-help group"
                                        >
                                            <Flame className="w-3 h-3 text-orange-400 group-hover:scale-125 transition-transform" />
                                            Temperatura (°C)
                                        </label>
                                        <span className="text-xs font-mono text-orange-400 font-bold">{reactionTemp.toFixed(1)}°</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        step="0.5"
                                        value={reactionTemp}
                                        onChange={(e) => setTemp(parseFloat(e.target.value))}
                                        className="w-full accent-orange-500"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <label
                                            title="El pH ideal de 6.2 asegura la máxima solubilidad y estabilidad del granulado final."
                                            className="text-[10px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-2 cursor-help group"
                                        >
                                            <Droplets className="w-3 h-3 text-cyan-400 group-hover:scale-125 transition-transform" />
                                            Acidez (pH)
                                        </label>
                                        <span className="text-xs font-mono text-cyan-400 font-bold">{reactionPH.toFixed(1)}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="14"
                                        step="0.1"
                                        value={reactionPH}
                                        onChange={(e) => setPH(parseFloat(e.target.value))}
                                        className="w-full accent-cyan-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6 mb-4 bg-slate-900/40 p-4 rounded-xl border border-white/5">
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <label
                                            title="La agitación mecánica garantiza la distribución homogénea de los micronutrientes (Zn, Mg)."
                                            className="text-[10px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-2 cursor-help group"
                                        >
                                            <Wind className="w-3 h-3 text-emerald-400 group-hover:scale-125 transition-transform" />
                                            Agitación (RPM)
                                        </label>
                                        <span className="text-xs font-mono text-emerald-400 font-bold">{mixingSpeed} RPM</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="500"
                                        step="10"
                                        value={mixingSpeed}
                                        onChange={(e) => setMixingSpeed(parseInt(e.target.value))}
                                        className="w-full accent-emerald-500"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <label
                                            title="Control de presión crítico para la seguridad operativa. Evite exceder los 8 Bar."
                                            className="text-[10px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-2 cursor-help group"
                                        >
                                            <Settings2 className="w-3 h-3 text-slate-300 group-hover:scale-125 transition-transform" />
                                            Presión (Bar)
                                        </label>
                                        <span className="text-xs font-mono text-slate-300 font-bold">{pressure.toFixed(1)} Bar</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="10"
                                        step="0.1"
                                        value={pressure}
                                        onChange={(e) => setPressure(parseFloat(e.target.value))}
                                        className="w-full accent-slate-500"
                                    />
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-white/5 space-y-4">
                                <div className="bg-slate-950/50 p-4 rounded-xl border border-white/5">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                            <Info className="w-3 h-3 italic" />
                                            Justificación Técnica
                                        </h4>
                                        <button
                                            onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
                                            className="text-[9px] font-black text-cyan-500 uppercase hover:text-cyan-400 flex items-center gap-1"
                                        >
                                            {showTechnicalDetails ? 'Cerrar Detalles' : 'Ver Desglose'}
                                            {showTechnicalDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                                        </button>
                                    </div>
                                    <p className="text-xs text-slate-300 italic leading-relaxed border-l-2 border-cyan-500/20 pl-4 py-1">
                                        "{analysis.justification}"
                                    </p>

                                    <AnimatePresence>
                                        {showTechnicalDetails && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="mt-4 pt-4 border-t border-white/5 space-y-4">
                                                    {/* Product Technical Profile */}
                                                    {analysis.productProfile && (
                                                        <div className="bg-white/2 p-3 rounded-xl border border-white/5 space-y-2">
                                                            <p className="text-[9px] font-black text-cyan-500 uppercase tracking-widest">Perfil Resultante: {analysis.productProfile.name}</p>
                                                            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[10px]">
                                                                <div className="flex justify-between border-b border-white/5 pb-1">
                                                                    <span className="text-slate-500">Toxicidad:</span>
                                                                    <span className={analysis.productProfile.toxicity === 'low' ? 'text-emerald-400' : 'text-amber-400'}>{analysis.productProfile.toxicity.toUpperCase()}</span>
                                                                </div>
                                                                <div className="flex justify-between border-b border-white/5 pb-1">
                                                                    <span className="text-slate-500">Estabilidad:</span>
                                                                    <span className="text-slate-200">{analysis.productProfile.stability}</span>
                                                                </div>
                                                                <div className="flex justify-between border-b border-white/5 pb-1">
                                                                    <span className="text-slate-500">Biodegrad.:</span>
                                                                    <span className="text-emerald-400">{analysis.productProfile.biodegradability}</span>
                                                                </div>
                                                                <div className="flex justify-between border-b border-white/5 pb-1">
                                                                    <span className="text-slate-500">Uso Industrial:</span>
                                                                    <span className="text-slate-200">{analysis.productProfile.industrialUse}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Mass Balance Breakdown */}
                                                    {analysis.metrics.massBalance && (
                                                        <div className="bg-slate-900/50 p-3 rounded-xl border border-white/5">
                                                            <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest mb-2 text-center">Balance de Masa Estimado</p>
                                                            <div className="flex items-center justify-between text-[10px] mb-4">
                                                                <div className="text-center">
                                                                    <span className="block text-slate-500 uppercase text-[8px]">Entrada</span>
                                                                    <span className="text-emerald-400 font-mono">{(analysis.metrics.massBalance.totalReactants + analysis.metrics.massBalance.totalSolvents).toFixed(1)}g</span>
                                                                </div>
                                                                <ArrowRight className="w-3 h-3 text-slate-700" />
                                                                <div className="text-center">
                                                                    <span className="block text-slate-500 uppercase text-[8px]">Producto</span>
                                                                    <span className="text-cyan-400 font-mono">{analysis.metrics.massBalance.totalProduct.toFixed(1)}g</span>
                                                                </div>
                                                                <ArrowRight className="w-3 h-3 text-slate-700" />
                                                                <div className="text-center">
                                                                    <span className="block text-slate-500 uppercase text-[8px]">Residuos</span>
                                                                    <span className="text-red-400 font-mono">{analysis.metrics.massBalance.totalWaste.toFixed(1)}g</span>
                                                                </div>
                                                            </div>
                                                            <div className="bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20 text-center">
                                                                <span className="text-[8px] text-emerald-500 uppercase font-black block">Eficiencia Atómica (AE%)</span>
                                                                <span className="text-xs font-black text-emerald-400">{analysis.metrics.atomicEfficiency?.toFixed(1)}%</span>
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div className="grid grid-cols-2 gap-4">
                                                        {analysis.principlesAnalysis.slice(0, 4).map(p => {
                                                            const gp = GREEN_CHEMISTRY_PRINCIPLES.find(x => x.id === p.principleId);
                                                            return (
                                                                <div key={p.principleId} className="space-y-1">
                                                                    <div className="flex justify-between text-[8px] font-bold uppercase tracking-tighter text-slate-300">
                                                                        <span>{gp?.shortName}</span>
                                                                        <span className={p.status === 'compliant' ? 'text-emerald-400' : 'text-red-400'}>{p.value}</span>
                                                                    </div>
                                                                    <div className="h-0.5 bg-slate-800 rounded-full overflow-hidden">
                                                                        <div className={`h-full ${p.status === 'compliant' ? 'bg-emerald-500' : 'bg-red-500'}`} style={{ width: '100%' }} />
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <button
                                    onClick={handleRunAIAnalysis}
                                    disabled={mixture.length === 0 || isAnalyzing || !isConfirmed}
                                    className="w-full py-4 bg-gradient-to-r from-cyan-600 to-emerald-600 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-lg shadow-cyan-500/10 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-20 flex items-center justify-center gap-3"
                                >
                                    {isAnalyzing ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : (!isConfirmed && mixture.length > 0 ? 'Esperando Confirmación de Proceso' : 'Sincronizar Análisis Determinístico')}
                                </button>
                            </div>
                        </div>
                    </div>
                </main>

                {/* RIGHT COLUMN – DASHBOARD */}
                <aside className="lg:col-span-3 space-y-6">
                    {/* AI Guidance Panel */}
                    <div className="bg-gradient-to-b from-[#111827] to-[#0A0E17] border border-white/5 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Sparkles className="w-12 h-12 text-cyan-400" />
                        </div>

                        <h3 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                            <Zap className="w-4 h-4" />
                            AI Guidance Cockpit
                        </h3>

                        <div className="space-y-4 relative z-10">
                            {contextMode === 'audit' && (
                                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl space-y-3">
                                    <div>
                                        <p className="text-[9px] text-red-500 font-black uppercase tracking-tighter mb-1">Riesgo de Cumplimiento</p>
                                        <p className="text-xl text-white font-black">{analysis.metrics.complianceRisk}%</p>
                                    </div>
                                    <div className="pt-2 border-t border-red-500/10">
                                        <p className="text-[9px] text-slate-300 font-black uppercase tracking-tighter mb-2">Banderas Regulatorias</p>
                                        <div className="space-y-1">
                                            {analysis.regulatoryFlags?.map(flag => (
                                                <div key={flag.id} className="flex items-center gap-2 text-[10px] text-red-400">
                                                    <AlertTriangle className="w-3 h-3 shrink-0" />
                                                    <span>{flag.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {contextMode === 'executive' && (
                                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl space-y-3">
                                    <div>
                                        <p className="text-[9px] text-emerald-500 font-black uppercase tracking-tighter mb-1">ROI Proyectado (Anual)</p>
                                        <p className="text-xl text-white font-black">+{analysis.metrics.estimatedROI?.toFixed(1)}%</p>
                                    </div>
                                    <div className="pt-2 border-t border-emerald-500/10">
                                        <p className="text-[9px] text-slate-300 font-black uppercase tracking-tighter mb-2">Métricas de Sostenibilidad</p>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="bg-slate-900/50 p-2 rounded text-center">
                                                <span className="block text-[8px] text-slate-300 uppercase">E-Factor</span>
                                                <span className="text-[10px] text-white font-bold">{analysis.metrics.wasteFactor.toFixed(2)}</span>
                                            </div>
                                            <div className="bg-slate-900/50 p-2 rounded text-center">
                                                <span className="block text-[8px] text-slate-300 uppercase">Carbono</span>
                                                <span className="text-[10px] text-white font-bold">{analysis.metrics.carbonFootprint.toFixed(1)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {(contextMode === 'standard' || mixture.length > 0) && (
                                <div className="space-y-4">
                                    <div className="p-3 bg-white/2 border border-white/5 rounded-xl">
                                        <p className="text-[10px] text-slate-300 uppercase font-black mb-2 tracking-tighter">Diagnóstico Técnico</p>
                                        <div className="space-y-2">
                                            {analysis.diagnostics.map((diag, idx) => (
                                                <div key={idx} className="flex gap-2 items-start text-[11px] text-slate-300 leading-tight">
                                                    <Info className="w-3 h-3 text-cyan-500 mt-0.5 shrink-0" />
                                                    <span>{diag}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {analysis.optimizations.length > 0 && (
                                        <div className="p-3 bg-cyan-500/5 border border-cyan-500/10 rounded-xl">
                                            <p className="text-[10px] text-cyan-500 uppercase font-black mb-2 tracking-tighter">Optimización Guiada</p>
                                            <div className="space-y-3">
                                                {analysis.optimizations.map((opt) => (
                                                    <div key={opt.id} className="p-2 bg-slate-900/40 rounded border border-white/5 space-y-2">
                                                        <div className="flex justify-between items-start">
                                                            <span className="text-[10px] text-white font-bold">{opt.label}</span>
                                                            <span className="text-[8px] bg-cyan-500/10 text-cyan-400 px-1.5 py-0.5 rounded font-black">+{opt.impact.energy || opt.impact.waste || 0}% Eficacia</span>
                                                        </div>
                                                        <p className="text-[9px] text-slate-300 leading-tight italic">{opt.description}</p>
                                                        <button
                                                            onClick={() => {
                                                                if (opt.id === 'opt-temp') setTemp(55);
                                                                if (opt.id === 'opt-press') setPressure(2.5);
                                                                if (opt.id === 'opt-ph') setPH(6.2);
                                                                notify('Parámetro Ajustado', 'success', `Se ha aplicado la optimización: ${opt.label}`);
                                                            }}
                                                            className="w-full py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 text-[8px] font-black uppercase tracking-widest rounded transition-all"
                                                        >
                                                            Aplicar Mejora
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                            <div className="pt-8 border-t border-white/5 space-y-4">
                                <button
                                    onClick={() => clearMixture()}
                                    className="w-full px-6 py-3 border border-slate-700 text-slate-500 rounded-xl text-[9px] font-black uppercase tracking-widest hover:text-white hover:border-white/20 transition-all flex items-center justify-center gap-2"
                                >
                                    Limpiar Mesa (Reset)
                                </button>

                                {mixture.some(c => c.id.startsWith('fert-')) && (
                                    <button
                                        onClick={() => setShowReport(true)}
                                        className="w-full px-6 py-4 bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-cyan-900/20 transition-all flex items-center justify-center gap-3 group active:scale-[0.98]"
                                    >
                                        <Zap className="w-4 h-4 fill-white" />
                                        Generar Dictamen
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#111827] border border-white/5 rounded-2xl p-6 h-full font-mono">
                        <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-8 border-b border-white/5 pb-4">Indicadores Real-Time</h3>

                        <div className="space-y-10">
                            <div className="text-center">
                                <div className="text-[9px] text-slate-600 uppercase mb-2">Score de Proceso</div>
                                <div className={`text-6xl font-black ${analysis.score > 80 ? 'text-emerald-400' : analysis.score > 50 ? 'text-amber-400' : 'text-red-400'}`}>
                                    {analysis.score}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-[9px] uppercase text-slate-300 mb-2">
                                        <span>C-Footprint</span>
                                        <span>{analysis.metrics.carbonFootprint.toFixed(1)} kg</span>
                                    </div>
                                    <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
                                        <div className="h-full bg-cyan-500" style={{ width: `${(analysis.metrics.carbonFootprint / 15) * 100}%` }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-[9px] uppercase text-slate-300 mb-2">
                                        <span>R-Waste (E)</span>
                                        <span>{analysis.metrics.wasteFactor.toFixed(1)} f</span>
                                    </div>
                                    <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
                                        <div className="h-full bg-amber-500" style={{ width: `${(analysis.metrics.wasteFactor / 10) * 100}%` }} />
                                    </div>
                                </div>
                            </div>

                            {mixture.some(c => c.id.startsWith('fert-')) && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="p-4 bg-[#0F172A] border border-cyan-500/30 rounded-2xl shadow-lg shadow-cyan-500/5 relative overflow-hidden group"
                                >
                                    <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500/50"></div>
                                    <p className="text-[10px] text-cyan-500 font-black uppercase tracking-tighter mb-1 opacity-60">Matriz de Datos Industrial</p>
                                    <p className="text-[11px] text-slate-200 font-mono leading-tight">
                                        SIMULACIÓN BASADA EN EL REGISTRO INDUSTRIAL V2.4.<br />
                                        <span className="text-cyan-400 font-black">CONFIANZA 99.8%.</span>
                                    </p>
                                    <Activity className="absolute bottom-2 right-2 w-8 h-8 text-cyan-500/10 group-hover:text-cyan-500/20 transition-colors" />
                                </motion.div>
                            )}
                        </div>
                    </div>
                </aside>
            </div>

            {/* OPTIMIZATION REPORT MODAL */}
            <AnimatePresence>
                {showReport && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-[#111827] border border-white/10 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
                        >
                            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-cyan-900/30 to-slate-900/50 relative">
                                <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500"></div>
                                <div>
                                    <h2 className="text-2xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
                                        <Zap className="w-7 h-7 text-cyan-400" />
                                        Dictamen de Eficiencia de Proceso
                                    </h2>
                                    <p className="text-[10px] text-cyan-500 uppercase font-black tracking-widest mt-1 opacity-80">
                                        Módulo de Análisis Industrial v2.5 • {processType}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setShowReport(false)}
                                    className="p-3 bg-white/5 hover:bg-red-500/20 rounded-full transition-all group border border-white/5"
                                >
                                    <X className="w-6 h-6 text-slate-400 group-hover:text-red-400" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
                                {/* EXECUTIVE SCORECARD - NEW CONSOLIDATED SECTION */}
                                <div className="grid grid-cols-3 gap-6">
                                    <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center relative shadow-xl overflow-hidden group">
                                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent"></div>
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Score de Química</span>
                                        <div className="text-4xl font-black text-white group-hover:scale-110 transition-transform">{analysis.score}</div>
                                        <div className="mt-2 text-[9px] font-bold text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded">CONFORME</div>
                                    </div>
                                    <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center relative shadow-xl overflow-hidden group">
                                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent"></div>
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">ROI Proyectado</span>
                                        <div className="text-4xl font-black text-white group-hover:scale-110 transition-transform">{analysis.metrics.estimatedROI?.toFixed(1)}%</div>
                                        <div className="mt-2 text-[9px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">ALTO RENDIMIENTO</div>
                                    </div>
                                    <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center relative shadow-xl overflow-hidden group">
                                        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent"></div>
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Riesgo REACH</span>
                                        <div className="text-4xl font-black text-white group-hover:scale-110 transition-transform">{analysis.metrics.complianceRisk}%</div>
                                        <div className={`mt-2 text-[9px] font-bold px-2 py-0.5 rounded ${analysis.metrics.complianceRisk! > 30 ? 'text-red-400 bg-red-400/10' : 'text-emerald-400 bg-emerald-400/10'}`}>
                                            {analysis.metrics.complianceRisk! > 30 ? 'CRÍTICO' : 'BAJO'}
                                        </div>
                                    </div>
                                </div>

                                {/* Comparison Grid (Dynamic) */}
                                <div className="grid grid-cols-2 gap-8 text-sm">
                                    <div className="space-y-4">
                                        <h3 className="text-[10px] font-black text-red-500 uppercase tracking-widest border-l-2 border-red-500 pl-3">Matriz Convencional (Std-PDF)</h3>
                                        <div className="bg-red-500/5 rounded-2xl p-4 border border-red-500/10 space-y-3 font-mono text-[11px]">
                                            <div className="flex justify-between"><span>Emisiones NH3:</span><span className="text-red-400 font-bold">0.85 kg/ton</span></div>
                                            <div className="flex justify-between"><span>Factor-E:</span><span className="text-red-400 font-bold">{analysis.metrics.comparisonData?.traditional.waste.toFixed(1)} f</span></div>
                                            <div className="flex justify-between"><span>Uso Previsto:</span><span className="text-slate-500">{analysis.functionalFulfillment?.initialUse}</span></div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-[10px] font-black text-emerald-500 uppercase tracking-widest border-l-2 border-emerald-500 pl-3">Nueva Formulación Green Cockpit (Live)</h3>
                                        <div className="bg-emerald-500/5 rounded-2xl p-4 border border-emerald-500/10 space-y-3 font-mono text-[11px]">
                                            <div className="flex justify-between"><span>Emisiones NH3:</span><span className="text-emerald-400 font-bold">{(analysis.metrics.vocLevel / 100).toFixed(2)} kg/ton</span></div>
                                            <div className="flex justify-between"><span>Factor-E:</span><span className="text-emerald-400 font-bold">{analysis.metrics.comparisonData?.optimized.waste.toFixed(2)} f</span></div>
                                            <div className="flex justify-between"><span>Desempeño:</span><span className="text-emerald-400 font-bold">{analysis.functionalFulfillment?.performanceScore.toFixed(0)}% Eficiencia</span></div>
                                        </div>
                                    </div>
                                </div>

                                {/* PER-CHEMICAL GRANULAR BREAKDOWN - NEW SECTION */}
                                <div className="space-y-4">
                                    <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
                                        <Activity className="w-4 h-4 text-cyan-400" />
                                        Inventario Crítico de Insumos
                                    </h3>
                                    <div className="bg-slate-900/40 rounded-3xl border border-white/5 overflow-hidden">
                                        <table className="w-full text-left text-[11px]">
                                            <thead>
                                                <tr className="bg-white/5 text-[9px] font-black uppercase text-slate-500">
                                                    <th className="p-4">Componente</th>
                                                    <th className="p-4">Masa (g)</th>
                                                    <th className="p-4">Rol Simulación</th>
                                                    <th className="p-4">GHS Risk</th>
                                                    <th className="p-4">REACH</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/5 font-mono">
                                                {analysis.chemicalBreakdown?.map((chem, idx) => (
                                                    <tr key={idx} className="hover:bg-white/2 transition-colors">
                                                        <td className="p-4 text-slate-200">{chem.name}</td>
                                                        <td className="p-4 text-slate-400">{chem.mass}</td>
                                                        <td className="p-4 text-cyan-400/70">{chem.role.toUpperCase()}</td>
                                                        <td className={`p-4 font-bold ${chem.ghsRisk === 'HIGH' ? 'text-red-400' : chem.ghsRisk === 'MEDIUM' ? 'text-amber-400' : 'text-emerald-400'}`}>
                                                            {chem.ghsRisk}
                                                        </td>
                                                        <td className="p-4">
                                                            <span className={`px-2 py-0.5 rounded text-[9px] ${chem.reachStatus === 'compliant' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                                                                {chem.reachStatus.toUpperCase()}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Product Comparison & Fulfillment Diagnostic */}
                                <div className="bg-slate-800/20 rounded-3xl p-8 border border-white/5 space-y-6 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-8 opacity-5">
                                        <ShieldCheck className="w-32 h-32 text-emerald-500" />
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                                            <Zap className="w-6 h-6 text-emerald-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-black text-white">Cumplimiento de Uso Previsto</h3>
                                            <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{analysis.functionalFulfillment?.initialUse}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-10">
                                        <div className="space-y-4">
                                            <div className="p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 space-y-3">
                                                <div className="flex justify-between items-end">
                                                    <span className="text-[10px] font-black text-emerald-500 uppercase">Eficiencia Funcional</span>
                                                    <span className="text-2xl font-black text-white">{analysis.functionalFulfillment?.performanceScore.toFixed(0)}%</span>
                                                </div>
                                                <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${analysis.functionalFulfillment?.performanceScore}%` }}
                                                        className="h-full bg-emerald-500"
                                                    />
                                                </div>
                                                <p className="text-[11px] text-slate-400 leading-relaxed italic">
                                                    "{analysis.functionalFulfillment?.diagnostic}"
                                                </p>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-4">
                                                <div>
                                                    <span className="text-[10px] font-black text-slate-500 uppercase block mb-1">Diferencia de Composición</span>
                                                    <p className="text-[11px] text-slate-200 leading-tight">{analysis.productProfile?.compositionalDifference}</p>
                                                </div>
                                                <div>
                                                    <span className="text-[10px] font-black text-slate-500 uppercase block mb-1">Mejora Funcional Lograda</span>
                                                    <p className="text-[11px] text-slate-200 leading-tight">{analysis.productProfile?.functionalImprovement}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Results Table */}
                                <div className="bg-slate-900/50 rounded-2xl border border-white/5 overflow-hidden">
                                    <table className="w-full text-left text-xs">
                                        <thead>
                                            <tr className="bg-white/5 uppercase text-[9px] font-black tracking-widest text-slate-300">
                                                <th className="p-4">Métrica de Impacto</th>
                                                <th className="p-4">Tradicional</th>
                                                <th className="p-4">Green Demo</th>
                                                <th className="p-4">Mejora %</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5 font-mono">
                                            <tr>
                                                <td className="p-4 text-slate-300">Emisiones NH3 (Fugitivas)</td>
                                                <td className="p-4 text-red-400">{analysis.metrics.comparisonData?.traditional.emissions.toFixed(2)} kg/ton</td>
                                                <td className="p-4 text-emerald-400">{(analysis.metrics.vocLevel / 100).toFixed(2)} kg/ton</td>
                                                <td className="p-4 text-cyan-400">
                                                    +{(((analysis.metrics.comparisonData?.traditional.emissions || 1) - (analysis.metrics.vocLevel / 100)) / (analysis.metrics.comparisonData?.traditional.emissions || 1) * 100).toFixed(1)}%
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="p-4 text-slate-300">Factor-E (Residuos)</td>
                                                <td className="p-4 text-red-400">{analysis.metrics.comparisonData?.traditional.waste.toFixed(2)} f</td>
                                                <td className="p-4 text-emerald-400">{analysis.metrics.wasteFactor.toFixed(2)} f</td>
                                                <td className="p-4 text-cyan-400">
                                                    +{(((analysis.metrics.comparisonData?.traditional.waste || 1) - analysis.metrics.wasteFactor) / (analysis.metrics.comparisonData?.traditional.waste || 1) * 100).toFixed(1)}%
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="p-4 text-slate-300">Riesgo Regulatorio</td>
                                                <td className="p-4 text-amber-500">{analysis.metrics.complianceRisk! > 50 ? 'ALTO' : analysis.metrics.complianceRisk! > 20 ? 'MEDIO' : 'BAJO'}</td>
                                                <td className="p-4 text-emerald-400">{analysis.metrics.complianceRisk! < 20 ? 'BAJO' : 'CONTROLADO'}</td>
                                                <td className="p-4 text-cyan-400">REDUCIDO</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                                    <div className="flex gap-4 items-start">
                                        <Info className="w-5 h-5 text-cyan-500 shrink-0" />
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black text-cyan-400 uppercase">Resumen Ejecutivo</p>
                                            <p className="text-xs text-slate-300 leading-relaxed italic">
                                                "{analysis.justification}"
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 border-t border-white/5 bg-slate-900/50 flex justify-between items-center">
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => navigate('/dashboard')}
                                        className="px-6 py-3 border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2"
                                    >
                                        <ArrowRight className="w-4 h-4 rotate-180" />
                                        Dashboard Ejecutivo
                                    </button>
                                    <button
                                        onClick={() => navigate('/regulatory')}
                                        className="px-6 py-3 border border-cyan-500/20 text-cyan-500 hover:bg-cyan-500/10 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2"
                                    >
                                        <FileText className="w-4 h-4" />
                                        Auditoría Regulatoria
                                    </button>
                                </div>
                                <button
                                    onClick={() => setShowReport(false)}
                                    className="px-12 py-4 bg-gradient-to-r from-cyan-600 to-emerald-600 rounded-2xl text-xs font-black uppercase tracking-widest text-white hover:scale-105 transition-all shadow-xl shadow-cyan-900/20"
                                >
                                    Cerrar Dictamen y Volver al Lab
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <div className="h-24"></div>
        </div>
    );
};

export default ProcessAnalysisView;
