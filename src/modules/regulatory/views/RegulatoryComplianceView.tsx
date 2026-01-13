import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, ShieldCheck, AlertCircle, FileText, ChevronLeft, ArrowRight, Activity } from 'lucide-react';
import { useNotificationStore } from '@core/stores/useNotificationStore';
import { useReactionStore } from '@core/stores/useReactionStore';
import { analyzeChemistry } from '@core/utils/chemistryEngine';
import { useMemo } from 'react';

interface RiskItemProps {
    label: string;
    severity: 'high' | 'medium' | 'low';
}

const severityColor = {
    high: 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]',
    medium: 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]',
    low: 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]',
};

const RiskItem: React.FC<RiskItemProps> = ({ label, severity }) => (
    <div className="flex items-center gap-4 text-sm group p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
        <span className={`w-3 h-3 rounded-full flex-shrink-0 ${severityColor[severity]}`} />
        <p className="text-slate-300 group-hover:text-white transition-colors">{label}</p>
        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
            <AlertCircle className="w-4 h-4 text-slate-500" />
        </div>
    </div>
);

const RegulatoryComplianceView: React.FC = () => {
    const navigate = useNavigate();
    const {
        activeMixture: mixture,
        reactionTemp,
        reactionPH,
        mixingSpeed,
        pressure,
        processType
    } = useReactionStore();
    const { notify } = useNotificationStore();
    const [isExporting, setIsExporting] = useState(false);

    // Dynamic risk analysis from central engine
    const analysis = useMemo(() =>
        analyzeChemistry(mixture, reactionTemp, reactionPH, mixingSpeed, pressure, 'audit', processType),
        [mixture, reactionTemp, reactionPH, mixingSpeed, pressure, processType]
    );

    const riskLevel: 'red' | 'yellow' | 'green' =
        (analysis.metrics.complianceRisk ?? 0) > 70 ? 'red' :
            (analysis.metrics.complianceRisk ?? 0) > 30 ? 'yellow' : 'green';

    const isComplianceReady = riskLevel === 'green';

    const handleExport = () => {
        setIsExporting(true);
        setTimeout(() => {
            setIsExporting(false);
            notify(
                'Emisión de Certificado',
                'compliance',
                `Dossier de Seguridad generado para ${mixture.length} componentes.`
            );
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-[#0B0F14] text-slate-200 p-6 sm:p-10 font-sans relative overflow-hidden">
            {/* Background Ambient Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* HEADER */}
                <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div>
                        <h1 className={`text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r mb-2 flex items-center gap-3 ${riskLevel === 'green' ? 'from-emerald-400 to-cyan-400' : 'from-red-400 to-amber-400'}`}>
                            {riskLevel === 'green' ? <ShieldCheck className="w-8 h-8 text-emerald-400" /> : <AlertTriangle className="w-8 h-8 text-red-400" />}
                            Dictamen Normativo: {processType}
                        </h1>
                        <p className="text-slate-400 text-sm max-w-xl leading-relaxed border-l-2 border-emerald-500/30 pl-4">
                            Auditoría de simulación en tiempo real. Evaluación de toxicidad, impacto ambiental y
                            cumplimiento de protocolos <span className="text-slate-300 font-bold uppercase tracking-tighter">REACH / GHS</span>.
                        </p>
                    </div>
                </header>

                {/* MAIN ANALYTICAL GRID */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
                    {/* RISK INDICATOR */}
                    <div className="lg:col-span-5 bg-slate-900/40 border border-white/10 rounded-[2.5rem] p-8 flex flex-col items-center justify-center relative backdrop-blur-xl shadow-2xl">
                        <div className="relative mb-8">
                            <div className="w-56 h-56 rounded-full border-4 border-white/5 flex items-center justify-center relative">
                                <svg className="absolute inset-0 w-full h-full transform -rotate-90 scale-110">
                                    <circle
                                        cx="112" cy="112" r="100"
                                        stroke="currentColor" strokeWidth="6" fill="none"
                                        className={riskLevel === 'green' ? 'text-emerald-500' : riskLevel === 'yellow' ? 'text-amber-500' : 'text-red-500'}
                                        strokeDasharray="628"
                                        strokeDashoffset={628 - (628 * (analysis.metrics.complianceRisk || 0) / 100)}
                                        strokeLinecap="round"
                                        style={{ transition: 'stroke-dashoffset 1s ease-out' }}
                                    />
                                </svg>
                                <div className="flex flex-col items-center">
                                    <span className="text-5xl font-black text-white">{analysis.metrics.complianceRisk || 0}%</span>
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Riesgo</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 w-full pt-6 border-t border-white/5">
                            <div className="text-center">
                                <div className="text-[9px] text-slate-500 uppercase font-black mb-1">Estatus REACH</div>
                                <div className={`text-xs font-bold ${riskLevel === 'red' ? 'text-red-400' : 'text-emerald-400'}`}>
                                    {riskLevel === 'red' ? 'RESTRINGIDO' : 'CONFORME'}
                                </div>
                            </div>
                            <div className="text-center border-l border-white/5">
                                <div className="text-[9px] text-slate-500 uppercase font-black mb-1">Impacto Bio</div>
                                <div className="text-xs font-bold text-cyan-400 uppercase">
                                    {analysis.productProfile?.biodegradability.split(' ')[0]}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* QUANTITATIVE DETAILS & RISK LOG */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="bg-slate-900/40 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-xl">
                            <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                                <Activity className="w-4 h-4 text-cyan-400" />
                                Impacto Real de la Mezcla
                            </h3>
                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <div className="bg-black/20 p-4 rounded-2xl border border-white/5">
                                    <span className="text-[10px] text-slate-500 uppercase font-black block mb-1">Eficiencia Atómica</span>
                                    <div className="text-3xl font-black text-emerald-400 font-mono tracking-tighter">
                                        {analysis.metrics.atomicEfficiency?.toFixed(1)}%
                                    </div>
                                    <p className="text-[10px] text-slate-500 mt-2">Masa total de reactantes convertida en producto.</p>
                                </div>
                                <div className="bg-black/20 p-4 rounded-2xl border border-white/5">
                                    <span className="text-[10px] text-slate-500 uppercase font-black block mb-1">Generación de Residuos</span>
                                    <div className="text-3xl font-black text-red-400 font-mono tracking-tighter">
                                        {analysis.metrics.massBalance?.totalWaste.toFixed(1)}g
                                    </div>
                                    <p className="text-[10px] text-slate-500 mt-2">Masa no útil (solvente perdido + subproductos).</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Alertas de Toxicología</h4>
                                <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar pr-2">
                                    {analysis.regulatoryFlags?.map((flag, idx) => (
                                        <RiskItem key={idx} label={flag.label} severity={flag.severity} />
                                    ))}
                                    {(!analysis.regulatoryFlags || analysis.regulatoryFlags.length === 0) && (
                                        <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl flex items-center gap-3">
                                            <ShieldCheck className="text-emerald-400 w-5 h-5" />
                                            <span className="text-sm text-emerald-400/80 font-medium">No se detectaron riesgos críticos en la formulación actual.</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* PRODUCT CHARACTERIZATION */}
                <section className="bg-slate-900/40 border border-white/10 rounded-[2.5rem] p-8 mb-10 backdrop-blur-xl">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                            <ShieldCheck className="w-6 h-6 text-emerald-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-white">Caracterización del Producto Final</h3>
                            <p className="text-xs text-slate-500">Perfil técnico basado en la optimización del Cockpit.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="space-y-2">
                            <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Perfil Industrial</span>
                            <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-sm font-medium text-slate-200">
                                {analysis.productProfile?.name}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Biodegradabilidad</span>
                            <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-sm font-medium text-emerald-400">
                                {analysis.productProfile?.biodegradability}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Mejora Funcional</span>
                            <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-xs text-slate-400 leading-relaxed italic">
                                "{analysis.productProfile?.functionalImprovement}"
                            </div>
                        </div>
                    </div>
                </section>

                {/* ACTION BAR */}
                <div className="flex justify-between items-center bg-slate-900/50 p-6 rounded-[2.5rem] border border-white/10 backdrop-blur-md">
                    <button
                        onClick={() => navigate('/processes')}
                        className="px-8 py-4 border border-white/10 hover:border-white/20 text-slate-300 rounded-2xl hover:bg-white/5 transition-all flex items-center gap-3 text-xs font-black uppercase tracking-widest"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Ajustar Parámetros Lab
                    </button>

                    <div className="flex gap-4">
                        <button
                            onClick={handleExport}
                            disabled={isExporting}
                            className="px-8 py-4 bg-slate-800 border border-white/5 text-cyan-400 rounded-2xl hover:bg-slate-700 transition-all flex items-center gap-3 text-xs font-black uppercase tracking-widest"
                        >
                            {isExporting ? <Activity className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
                            {isExporting ? 'Procesando...' : 'Descargar Dossier'}
                        </button>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="px-10 py-4 bg-gradient-to-r from-emerald-500 to-cyan-600 hover:scale-105 text-white font-black rounded-2xl shadow-xl shadow-emerald-500/20 transition-all flex items-center gap-3 text-xs font-black uppercase tracking-widest"
                        >
                            Confirmar y Finalizar
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegulatoryComplianceView;
