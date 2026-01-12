import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import {
    ScoreDisplay,
    IndustrySelector,
    RegulatoryRisk,
    ProcessStatus,
    ActionButtons,
    DashboardHeader,
    ExportCenter
} from '../components';
import { industries } from '../data/industries';
import { IndustryKey } from '../types';
import { useReactionStore } from '@core/stores/useReactionStore';
import { analyzeChemistry } from '@core/utils/chemistryEngine';

function DashboardView() {
    const navigate = useNavigate();
    const { activeMixture: mixture, processContext, setProcessContext } = useReactionStore();

    // Deterministic Analysis base on current mixture
    const analysis = useMemo(() => analyzeChemistry(mixture), [mixture]);

    const [currentScore, setCurrentScore] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [systemStatus] = useState<'operational' | 'maintenance'>('operational');
    const [isExportOpen, setIsExportOpen] = useState(false);

    useEffect(() => {
        setIsAnimating(true);
        const targetScore = analysis.score;
        const duration = 1200;
        const steps = 60;
        const increment = (targetScore - currentScore) / steps;
        let current = currentScore;

        const timer = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= targetScore) || (increment < 0 && current <= targetScore)) {
                setCurrentScore(targetScore);
                clearInterval(timer);
                setIsAnimating(false);
            } else {
                setCurrentScore(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [analysis.score]);

    const handleIndustryChange = (industry: IndustryKey) => {
        setProcessContext({ industry: industry as any });
    };

    return (
        <div className="min-h-screen bg-[#0B0F14] text-gray-100 p-6 relative overflow-hidden font-sans">
            {/* Background ambient glow */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">

                <DashboardHeader systemStatus={systemStatus} />

                {/* Chemical Context Selector */}
                <IndustrySelector
                    industries={industries}
                    selectedIndustry={processContext.industry as IndustryKey}
                    onSelect={handleIndustryChange}
                />

                {/* Main Score Card (Includes Insight) */}
                <ScoreDisplay
                    currentScore={currentScore}
                    isAnimating={isAnimating}
                    justification={analysis.justification}
                />


                {/* Analytical Panels */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div onClick={() => navigate('/regulatory')} className="cursor-pointer transition-transform hover:scale-[1.01]">
                        <RegulatoryRisk level={analysis.status === 'nominal' ? 'green' : analysis.status === 'evaluation' ? 'yellow' : 'red'} />
                    </div>
                    <ProcessStatus score={currentScore} />
                </div>

                {/* Actions */}
                {/* Modified ActionButtons to trigger Export */}
                <div className="space-y-4">
                    <ActionButtons />
                    <button
                        onClick={() => setIsExportOpen(true)}
                        className="w-full py-4 border border-white/5 hover:border-emerald-500/30 bg-slate-600/40 rounded-2xl text-xs font-black uppercase tracking-[0.2em] text-slate-200 hover:text-emerald-400 transition-all flex items-center justify-center gap-3"
                    >
                        Descargar Documentación Técnica de Simulación
                    </button>
                </div>

                {/* Footer Badge */}
                <div className="flex justify-center mt-8">
                    <div className="backdrop-blur-md bg-slate-800/40 border border-white/5 rounded-full px-6 py-3 flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm text-slate-400 font-medium">
                            Cockpit Industrial basado en los 12 Principios de la Química Verde
                        </span>
                    </div>
                </div>
            </div>

            <ExportCenter isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} />
        </div>
    );
}

export default DashboardView;
