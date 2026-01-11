import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import {
    ScoreDisplay,
    IndustrySelector,
    RegulatoryRisk,
    ProcessStatus,
    ActionButtons,
    DashboardHeader
} from '../components';
import { industries } from '../data/industries';
import { IndustryKey } from '../types';
import { useDemoState } from '@core/hooks/useDemoState';

function DashboardView() {
    const navigate = useNavigate();
    const { score, riskLevel } = useDemoState();
    const [selectedIndustry, setSelectedIndustry] = useState<IndustryKey>('textil');
    const [currentScore, setCurrentScore] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [systemStatus] = useState<'operational' | 'maintenance'>('operational');

    useEffect(() => {
        setIsAnimating(true);
        setCurrentScore(0);

        const targetScore = score;
        const duration = 1200;
        const steps = 60;
        const increment = targetScore / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= targetScore) {
                setCurrentScore(targetScore);
                clearInterval(timer);
                setIsAnimating(false);
            } else {
                setCurrentScore(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [score, selectedIndustry]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-gray-100 p-6 relative overflow-hidden font-sans">
            {/* Background ambient glow */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">

                <DashboardHeader systemStatus={systemStatus} />

                {/* Chemical Context Selector */}
                <IndustrySelector
                    industries={industries}
                    selectedIndustry={selectedIndustry}
                    onSelect={setSelectedIndustry}
                />

                {/* Main Score Card (Includes Insight) */}
                <ScoreDisplay currentScore={currentScore} isAnimating={isAnimating} />


                {/* Analytical Panels */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div onClick={() => navigate('/regulatory')} className="cursor-pointer transition-transform hover:scale-[1.01]">
                        <RegulatoryRisk level={riskLevel} />
                    </div>
                    <ProcessStatus score={currentScore} />
                </div>

                {/* Actions */}
                <ActionButtons />

                {/* Footer Badge */}
                <div className="flex justify-center mt-8">
                    <div className="backdrop-blur-md bg-slate-800/40 border border-slate-700/40 rounded-full px-6 py-3 flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm text-slate-400">
                            Plataforma basada en los 12 Principios de la Química Verde
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardView;
