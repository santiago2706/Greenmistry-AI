import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, ShieldCheck, AlertCircle, FileText, ChevronLeft, ArrowRight } from 'lucide-react';
import { useNotificationStore } from '@core/stores/useNotificationStore';
import { useReactionStore } from '@core/stores/useReactionStore';

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

export const RegulatoryComplianceView: React.FC = () => {
    const navigate = useNavigate();
    const { activeMixture: mixture } = useReactionStore();
    const { notify } = useNotificationStore();
    const [isExporting, setIsExporting] = useState(false);

    // Dynamic risk analysis logic
    const analyzeRisk = () => {
        if (mixture.length === 0) return { level: 'green' as const, items: [{ label: 'Sistema Certificado: Sin sustancias activas', severity: 'low' as const }] };

        const highRisk = mixture.filter(c => c.hazard === 'high');
        const restricted = mixture.filter(c => c.regulatory.reachStatus === 'restricted' || c.regulatory.isAnnexXVII);
        const svhc = mixture.filter(c => c.regulatory.reachStatus === 'svhc');

        const riskItems: { label: string, severity: 'high' | 'medium' | 'low' }[] = [];

        if (restricted.length > 0) {
            riskItems.push({ label: `Violación REACH Annex XVII: ${restricted.map(c => c.name).join(', ')}`, severity: 'high' });
        }
        if (svhc.length > 0) {
            riskItems.push({ label: `Sustancias Altamente Preocupantes (SVHC) detectadas: ${svhc.map(c => c.cas).join(', ')}`, severity: 'medium' });
        }
        if (highRisk.length > 0) {
            riskItems.push({ label: `Punto Crítico de Toxicidad: ${highRisk.length} componentes`, severity: 'high' });
        }

        if (riskItems.length === 0) {
            riskItems.push({ label: 'Sustitución química validada por terceros', severity: 'low' });
            riskItems.push({ label: 'Cumplimiento REACH Art. 33 exitoso', severity: 'low' });
        }

        let level: 'red' | 'yellow' | 'green' = 'green';
        if (restricted.length > 0 || highRisk.length > 1) level = 'red';
        else if (svhc.length > 0 || highRisk.length > 0) level = 'yellow';

        return { level, items: riskItems };
    };

    const riskAnalysis = analyzeRisk();
    const riskLevel = riskAnalysis.level;
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
        <div className="min-h-screen bg-[#0B0F14] text-slate-200 p-6 sm:p-10 font-sans">
            <div className="max-w-7xl mx-auto">
                {/* HEADER */}
                <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div>
                        <h1 className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r mb-2 flex items-center gap-3 ${riskLevel === 'green' ? 'from-emerald-400 to-cyan-400' : 'from-red-400 to-amber-400'}`}>
                            {riskLevel === 'green' ? <ShieldCheck className="w-8 h-8 text-emerald-400" /> : <AlertTriangle className="w-8 h-8 text-red-400" />}
                            Cumplimiento Regulatorio y Riesgo
                        </h1>
                        <p className="text-slate-400 text-sm max-w-xl leading-relaxed border-l-2 border-red-500/30 pl-4">
                            Evaluación normativa del proceso químico según estándares <span className="text-slate-300">REACH, EPA y OSHA</span>.
                        </p>
                    </div>
                    <div className="flex gap-2">
                        {isComplianceReady && (
                            <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 text-xs rounded uppercase tracking-wider font-extrabold shadow-[0_0_15px_rgba(16,185,129,0.2)] animate-fadeIn">
                                Certificación Validada
                            </span>
                        )}
                        <span className={`px-3 py-1 border text-xs rounded uppercase tracking-wider font-bold ${isComplianceReady ? 'bg-emerald-950/30 border-emerald-500/20 text-emerald-400' : 'bg-red-950/30 border-red-500/20 text-red-400'}`}>
                            {isComplianceReady ? 'Auditoría Superada' : 'Auditoría Activa'}
                        </span>
                    </div>
                </header>

                {/* MAIN CONTENT */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">

                    {/* REGULATORY INDICATOR - LEFT */}
                    <div className="lg:col-span-5 bg-[#111827] border border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl shadow-black/50">
                        {/* Background Effects */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-amber-500 to-red-500 opacity-50"></div>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500/5 via-transparent to-transparent"></div>

                        <div className="relative z-10 mb-8">
                            {/* Circular Indicator */}
                            <div className="w-64 h-64 rounded-full border-8 border-[#1f2937] flex items-center justify-center relative shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                                <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                                    <circle
                                        cx="124" // Adjusted for padding/border width
                                        cy="124"
                                        r="110"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        fill="none"
                                        className={riskLevel === 'green' ? 'text-emerald-500' : riskLevel === 'yellow' ? 'text-amber-500' : 'text-red-500'}
                                        strokeDasharray="500"
                                        strokeDashoffset={riskLevel === 'green' ? "450" : riskLevel === 'yellow' ? "250" : "120"}
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="flex flex-col items-center animate-pulse-slow">
                                    <AlertTriangle className={`${riskLevel === 'green' ? 'text-emerald-500' : riskLevel === 'yellow' ? 'text-amber-500' : 'text-red-500'} mb-2 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]`} size={48} />
                                    <span className="text-4xl font-black text-white tracking-widest drop-shadow-md">
                                        {riskLevel === 'green' ? 'BAJO' : riskLevel === 'yellow' ? 'MEDIO' : 'ALTO'}
                                    </span>
                                    <span className={`text-xs font-bold uppercase tracking-widest mt-1 ${riskLevel === 'green' ? 'text-emerald-400' : riskLevel === 'yellow' ? 'text-amber-400' : 'text-red-400'}`}>Riesgo Global</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 w-full text-center border-t border-white/5 pt-6">
                            <div>
                                <div className="text-xs text-slate-500 mb-1">REACH</div>
                                <div className={riskLevel === 'red' ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}>
                                    {riskLevel === 'red' ? 'No Compliant' : 'Authorized'}
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-slate-500 mb-1">EPA</div>
                                <div className={riskLevel === 'green' ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                                    {riskLevel === 'green' ? 'Approved' : 'Review'}
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-slate-500 mb-1">OSHA</div>
                                <div className="text-emerald-400 font-bold">Pass</div>
                            </div>
                        </div>
                    </div>

                    {/* RISK DETAILS - RIGHT */}
                    <div className="lg:col-span-7 space-y-6">
                        {/* Risk Detection Panel */}
                        <div className="bg-[#111827] border border-white/5 rounded-2xl p-6 h-full flex flex-col">
                            <h3 className="text-sm font-semibold text-slate-200 mb-6 flex items-center justify-between">
                                <span>Detalle de Riesgos Detectados</span>
                                <span className={`px-2 py-1 rounded text-xs ${riskLevel === 'green' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5 text-slate-400'}`}>
                                    {isComplianceReady ? 'Sistema Certificado' : `${riskAnalysis.items.length} Alertas Detectadas`}
                                </span>
                            </h3>
                            <div className="space-y-4 flex-1">
                                {riskAnalysis.items.map((item, idx) => (
                                    <RiskItem key={idx} label={item.label} severity={item.severity} />
                                ))}
                            </div>

                            <div className="mt-6 pt-4 border-t border-white/5">
                                <button
                                    onClick={handleExport}
                                    disabled={isExporting}
                                    className={`text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-2 transition-colors ${isExporting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {isExporting ? (
                                        <><div className="w-3 h-3 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div> Procesando Informe...</>
                                    ) : (
                                        <><FileText className="w-3 h-3" /> Descargar Informe Técnico de Toxicología</>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* PRINCIPLES TRACEABILITY */}
                <section className="bg-[#111827] border border-white/5 rounded-2xl p-8 mb-10">
                    <h3 className="text-sm font-semibold text-slate-300 mb-6 flex items-center gap-2">
                        <ShieldCheck size={18} className="text-emerald-400" />
                        Principios de Química Verde Relacionados
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className={`p-4 rounded-xl border transition-colors ${riskLevel === 'green' ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-red-500/5 border-red-500/10'}`}>
                            <div className="flex items-center gap-2 mb-2">
                                <span className={`${riskLevel === 'green' ? 'text-emerald-400' : 'text-red-400'} font-bold text-xs`}>PRINCIPIO #3</span>
                                <div className={`h-px flex-1 ${riskLevel === 'green' ? 'bg-emerald-500/20' : 'bg-red-500/20'}`}></div>
                            </div>
                            <p className="text-sm text-slate-300 font-medium">Síntesis menos peligrosa</p>
                            <div className={`mt-2 text-xs flex items-center gap-1 ${riskLevel === 'green' ? 'text-emerald-400' : 'text-red-400'}`}>
                                {riskLevel === 'green' ? <ShieldCheck className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                                {riskLevel === 'green' ? 'Cumplido' : 'No Cumplido'}
                            </div>
                        </div>

                        <div className={`p-4 rounded-xl border transition-colors ${riskLevel === 'green' ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-red-500/5 border-red-500/10'}`}>
                            <div className="flex items-center gap-2 mb-2">
                                <span className={`${riskLevel === 'green' ? 'text-emerald-400' : 'text-red-400'} font-bold text-xs`}>PRINCIPIO #5</span>
                                <div className={`h-px flex-1 ${riskLevel === 'green' ? 'bg-emerald-500/20' : 'bg-red-500/20'}`}></div>
                            </div>
                            <p className="text-sm text-slate-300 font-medium">Solventes más seguros</p>
                            <div className={`mt-2 text-xs flex items-center gap-1 ${riskLevel === 'green' ? 'text-emerald-400' : 'text-red-400'}`}>
                                {riskLevel === 'green' ? <ShieldCheck className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                                {riskLevel === 'green' ? 'Cumplido' : 'No Cumplido'}
                            </div>
                        </div>

                        <div className={`p-4 rounded-xl border transition-colors ${riskLevel === 'green' ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-amber-500/5 border-amber-500/10'}`}>
                            <div className="flex items-center gap-2 mb-2">
                                <span className={`${riskLevel === 'green' ? 'text-emerald-400' : 'text-amber-400'} font-bold text-xs`}>PRINCIPIO #12</span>
                                <div className={`h-px flex-1 ${riskLevel === 'green' ? 'bg-emerald-500/20' : 'bg-amber-500/20'}`}></div>
                            </div>
                            <p className="text-sm text-slate-300 font-medium">Química inherentemente segura</p>
                            <div className={`mt-2 text-xs flex items-center gap-1 ${riskLevel === 'green' ? 'text-emerald-400' : 'text-amber-400'}`}>
                                {riskLevel === 'green' ? <ShieldCheck className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                                {riskLevel === 'green' ? 'Cumplido' : 'Parcialmente Cumplido'}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ACTION BAR */}
                <div className="flex justify-end gap-4 border-t border-white/5 pt-8">
                    <button
                        onClick={() => navigate('/processes')}
                        className="px-6 py-3 border border-slate-700 hover:border-slate-500 text-slate-300 rounded-xl hover:bg-[#1A2333] transition-colors flex items-center gap-2"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Volver al Editor
                    </button>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all flex items-center gap-2"
                    >
                        Finalizar y Volver al Dashboard
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegulatoryComplianceView;
