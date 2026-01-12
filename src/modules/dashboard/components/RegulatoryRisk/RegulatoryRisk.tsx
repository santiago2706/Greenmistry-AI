import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';
import { RegulatoryLevel } from '../../types';
import { useContextualInsight } from '@core/stores/useContextualInsight';

interface RegulatoryRiskProps {
    level: RegulatoryLevel;
}

export const RegulatoryRisk: React.FC<RegulatoryRiskProps> = ({ level }) => {
    const { openInsight } = useContextualInsight();
    const getConfig = (level: RegulatoryLevel) => {
        switch (level) {
            case 'green':
                return {
                    label: 'Cumplimiento Total',
                    icon: CheckCircle,
                    color: 'emerald',
                    bg: 'bg-emerald-500/10',
                    border: 'border-emerald-500/20',
                    text: 'text-emerald-400',
                    iconColor: 'text-emerald-400'
                };
            case 'yellow':
                return {
                    label: 'Revisión Requerida',
                    icon: AlertCircle,
                    color: 'amber',
                    bg: 'bg-amber-500/10',
                    border: 'border-amber-500/20',
                    text: 'text-amber-400',
                    iconColor: 'text-amber-400'
                };
            case 'red':
                return {
                    label: 'Riesgo Crítico',
                    icon: AlertTriangle,
                    color: 'red',
                    bg: 'bg-red-500/15',
                    border: 'border-red-500/30',
                    text: 'text-red-400',
                    iconColor: 'text-red-400'
                };
        }
    };

    const config = getConfig(level);
    const Icon = config.icon;

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => openInsight('reach-regulation')}
            className="backdrop-blur-xl bg-[#111827]/60 border border-white/5 rounded-xl p-6 shadow-xl relative overflow-hidden group cursor-pointer hover:border-red-500/30 transition-all"
        >
            {/* Conditional pulse for high risk */}
            {level === 'red' && (
                <div className="absolute inset-0 bg-red-500/5 animate-pulse pointer-events-none" />
            )}

            <h3 className="text-sm font-bold mb-6 text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 relative z-10">
                <Icon className={`w-4 h-4 ${config.iconColor}`} />
                Riesgo Regulatorio
            </h3>

            <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-300 uppercase font-bold">Estado</span>
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={level}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 1.2, opacity: 0 }}
                            className={`px-3 py-1 ${config.bg} ${config.border} ${config.text} border rounded text-[10px] font-black uppercase tracking-widest`}
                        >
                            {config.label}
                        </motion.span>
                    </AnimatePresence>
                </div>

                <div className="h-px w-full bg-white/5"></div>

                <div className="flex gap-1.5 overflow-hidden">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div
                            key={i}
                            className={`h-1.5 flex-1 rounded-full ${i <= (level === 'green' ? 6 : level === 'yellow' ? 3 : 1)
                                ? (level === 'green' ? 'bg-emerald-500' : level === 'yellow' ? 'bg-amber-500' : 'bg-red-500')
                                : 'bg-slate-800'
                                } transition-colors duration-1000`}
                        />
                    ))}
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed font-mono italic">
                    Vector analysis: {level === 'red' ? 'Restricción REACH Anexo XVII detectada.' : level === 'yellow' ? 'Evaluación EPA en progreso.' : 'Certificación EU Green Deal conforme.'}
                </p>
            </div>
        </motion.div>
    );
};
