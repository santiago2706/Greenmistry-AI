import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingDown, TrendingUp, AlertTriangle, CheckCircle, ArrowRight, Download, Leaf, BarChart3, Info } from 'lucide-react';
import { useNotificationStore } from '@core/stores/useNotificationStore';
import { useContextualInsight } from '@core/stores/useContextualInsight';
import { useReactionStore } from '@core/stores/useReactionStore';

interface MetricCardProps {
    title: string;
    before: string;
    after: string;
    beforeLabel: string;
    afterLabel: string;
    improved?: boolean;
    icon?: React.ElementType;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, before, after, beforeLabel, afterLabel, improved, icon: Icon }) => (
    <div className="bg-[#111827] border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-white/10 transition-all duration-300">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            {Icon && <Icon className="w-16 h-16 text-slate-400" />}
        </div>

        <h4 className="text-sm font-semibold text-slate-300 mb-6 flex items-center gap-2">
            {Icon && <Icon className="w-4 h-4 text-slate-500" />}
            {title}
        </h4>

        <div className="grid grid-cols-2 gap-8">
            <div className="relative">
                <div className="text-xs text-slate-500 mb-2 uppercase tracking-wider font-semibold">Antes</div>
                <div className="text-2xl font-bold text-slate-400 mb-1">{before}</div>
                <div className="text-xs text-red-400/80 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    {beforeLabel}
                </div>
            </div>

            <div className="relative">
                <div className="absolute -left-4 top-1/2 -translate-y-1/2 text-slate-700">
                    <ArrowRight className="w-4 h-4" />
                </div>
                <div className="text-xs text-emerald-500 mb-2 uppercase tracking-wider font-semibold">Después</div>
                <div className={`text-3xl font-bold ${improved ? 'text-emerald-400' : 'text-cyan-400'}`}>
                    {after}
                </div>
                {improved && (
                    <div className="text-xs text-emerald-400/80 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        {afterLabel}
                    </div>
                )}
            </div>
        </div>

        {/* Progress Bar Visual */}
        <div className="mt-6 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden flex">
            <div className="h-full bg-slate-600 w-[45%] opacity-30"></div>
            <div className="h-full bg-emerald-500 w-[33%] shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
        </div>
    </div>
);

const CircularMetric: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="relative w-32 h-32 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
            <circle cx="64" cy="64" r="56" stroke="#1f2937" strokeWidth="8" fill="none" />
            <circle
                cx="64"
                cy="64"
                r="56"
                stroke={value > 70 ? "#10b981" : "#ef4444"}
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${(value / 100) * 351} 351`}
                strokeLinecap="round"
                className="transition-all duration-1000"
            />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-white">{value}%</span>
            <span className="text-[10px] text-slate-500 uppercase">{label}</span>
        </div>
    </div>
);

export const EnvironmentalImpactView: React.FC = () => {
    const navigate = useNavigate();
    const { activeMixture: mixture } = useReactionStore();
    const { notify } = useNotificationStore();
    const { openInsight } = useContextualInsight();
    const [isExporting, setIsExporting] = useState(false);

    // Dynamic environmental calculations
    const calculateMetrics = () => {
        if (mixture.length === 0) return { score: 42, carbon: 15.2, waste: 45, voc: 80 };

        const avgCarbon = mixture.reduce((acc, c) => acc + c.lca.carbonFootprint, 0) / mixture.length;
        const totalWaste = mixture.reduce((acc, c) => acc + c.lca.wasteFactor, 0);
        const hazardCount = mixture.filter(c => c.hazard === 'high').length;

        // Simple algorithm for demo: high hazard penalizes score
        const score = Math.max(10, Math.min(98, 85 - (hazardCount * 15) + (mixture.length * 2)));
        const voc = 20 + (hazardCount * 25); // Simplified VOC estimate

        return { score, carbon: avgCarbon, waste: totalWaste, voc };
    };

    const metrics = calculateMetrics();
    const environmentalScore = metrics.score;
    const hasImproved = environmentalScore > 60;

    const handleExport = () => {
        setIsExporting(true);
        setTimeout(() => {
            setIsExporting(false);
            notify(
                'Generación de Reporte',
                'success',
                `Reporte de Impacto Ambiental generado para la mezcla de ${mixture.length} componentes.`
            );
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-[#0B0F14] text-slate-200 p-6 sm:p-10 font-sans">
            <div className="max-w-7xl mx-auto">
                {/* HEADER */}
                <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div
                        onClick={() => openInsight('lca-analysis')}
                        className="cursor-pointer group"
                    >
                        <h1 className="text-2xl font-bold text-white mb-2 flex items-center gap-3 group-hover:text-emerald-400 transition-colors">
                            <BarChart3 className="w-8 h-8 text-emerald-500" />
                            Impacto Ambiental y Sostenibilidad
                            <Info className="w-4 h-4 text-slate-600 group-hover:text-emerald-400" />
                        </h1>
                        <p className="text-slate-400 text-sm max-w-xl leading-relaxed border-l-2 border-emerald-500/30 pl-4">
                            Análisis cuantitativo de la huella de carbono, toxicidad y eficiencia de recursos del proceso seleccionado.
                        </p>
                    </div>
                </header>

                {/* COMPARISON METRICS GRID */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <MetricCard
                        title="Huella de Carbono"
                        before="12.4kg"
                        after={`${metrics.carbon.toFixed(1)}kg`}
                        beforeLabel="CO2e/kg Prod"
                        afterLabel={hasImproved ? "Reducción Optimizada" : "Cálculo en Vivo"}
                        improved={hasImproved}
                        icon={TrendingUp}
                    />
                    <MetricCard
                        title="Emisiones VOC"
                        before="95%"
                        after={`${metrics.voc}%`}
                        beforeLabel="Volátiles Críticos"
                        afterLabel={hasImproved ? "Altas Alternativas" : "Riesgo Atmosférico"}
                        improved={hasImproved}
                        icon={AlertTriangle}
                    />
                    <MetricCard
                        title="Generación de Residuos"
                        before="45.0kg"
                        after={`${metrics.waste.toFixed(1)}kg`}
                        beforeLabel="Waste Base (Factor E)"
                        afterLabel={hasImproved ? "Eficiencia Verde" : "Métrica de Proceso"}
                        improved={hasImproved}
                        icon={TrendingDown}
                    />
                </section>

                {/* VISUAL REPORT SECTION */}
                <div className="grid grid-cols-1lg:grid-cols-3 gap-8 mb-10">
                    {/* Insight Panel - Spans 2 columns */}
                    <section className="lg:col-span-2 bg-gradient-to-br from-[#111827] to-[#0f1623] border border-white/5 rounded-2xl p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

                        <div className="flex items-start gap-4 relative z-10">
                            <div className="bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
                                <Leaf className="w-6 h-6 text-emerald-400" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-2">Insight de Sostenibilidad</h3>
                                <p className="text-slate-300 leading-relaxed text-sm">
                                    {hasImproved
                                        ? "La sustitución de solventes halogenados por alternativas de base acuosa permitió una mejora significativa en la economía atómica (78%) y una reducción directa en la toxicidad."
                                        : "El proceso actual muestra una dependencia crítica de solventes halogenados. Se recomienda la transición a alternativas verdes para mejorar el score global."
                                    }
                                </p>
                                <div className="mt-6 flex flex-wrap gap-3">
                                    <span className="px-3 py-1 bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 text-xs rounded-full">
                                        REACH Compliant
                                    </span>
                                    <span className="px-3 py-1 bg-cyan-950/50 border border-cyan-500/30 text-cyan-400 text-xs rounded-full">
                                        ISO 14001
                                    </span>
                                    <span className="px-3 py-1 bg-slate-800 border border-slate-700 text-slate-300 text-xs rounded-full">
                                        Ahorro 40% VOCs
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Summary Score */}
                    <section className="bg-[#111827] border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center">
                        <h4 className="text-sm font-medium text-slate-400 mb-6 uppercase tracking-wider">Score de Impacto</h4>
                        <CircularMetric value={environmentalScore} label="Global" />
                        <div className="mt-4 text-center">
                            <div className={`${hasImproved ? 'text-emerald-400' : 'text-slate-500'} text-sm font-medium flex items-center justify-center gap-1`}>
                                {hasImproved ? <TrendingUp className="w-4 h-4" /> : null}
                                {environmentalScore > 42 ? `+${environmentalScore - 42} pts vs Base` : `${environmentalScore - 42} pts vs Base`}
                            </div>
                        </div>
                    </section>
                </div>

                {/* ACTION BAR */}
                <div className="flex justify-end gap-4 border-t border-white/5 pt-8">
                    <button
                        onClick={handleExport}
                        disabled={isExporting}
                        className={`px-6 py-3 border border-slate-700 hover:border-slate-500 hover:bg-slate-800/50 text-slate-300 font-medium rounded-xl transition-all flex items-center gap-2 ${isExporting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isExporting ? (
                            <><div className="w-4 h-4 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div> Generando...</>
                        ) : (
                            <><Download className="w-4 h-4" /> Exportar PDF</>
                        )}
                    </button>
                    <button
                        onClick={() => navigate('/regulatory')}
                        className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all transform hover:-translate-y-0.5"
                    >
                        Validar Cumplimiento Normativo
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EnvironmentalImpactView;
