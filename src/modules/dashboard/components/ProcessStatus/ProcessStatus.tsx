import React from 'react';
import { TrendingUp, BarChart } from 'lucide-react';

interface ProcessStatusProps {
    score: number;
}

export const ProcessStatus: React.FC<ProcessStatusProps> = ({ score }) => {
    // Dynamic derivation of sub-indicators (simulated logic)
    const getStatus = (val: number) => {
        if (val > 80) return { label: 'Óptimo', color: 'text-emerald-400', bg: 'bg-emerald-400' };
        if (val > 50) return { label: 'Aceptable', color: 'text-amber-400', bg: 'bg-amber-400' };
        return { label: 'Deficiente', color: 'text-red-400', bg: 'bg-red-400' };
    };

    const atomicEff = getStatus(score);
    const renewable = getStatus(score - 20); // Generally lower
    const waste = getStatus(100 - (score / 2)); // Waste is inverseish
    const energy = getStatus(score - 10);

    return (
        <div className="backdrop-blur-xl bg-[#1e293b]/30 border border-[#94a3b8]/50 rounded-xl p-6 shadow-xl relative overflow-hidden">

            <div className="absolute top-0 right-0 p-4 opacity-5">
                <BarChart className="w-24 h-24 text-white" />
            </div>

            <h3 className="text-sm font-bold mb-6 text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-500" />
                Matriz de Desempeño
            </h3>

            <div className="space-y-1">
                {[
                    { label: 'Eficiencia Atómica', status: atomicEff },
                    { label: 'Materias Renovables', status: renewable },
                    { label: 'Gestión Residuo (Factor E)', status: waste },
                    { label: 'Eficiencia Energética', status: energy }
                ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0 group">
                        <div className="flex items-center gap-3">
                            <div className={`w-1.5 h-1.5 ${item.status.bg} rounded-full shadow-[0_0_8px_rgba(255,255,255,0.2)]`} />
                            <span className="text-slate-400 text-xs font-medium group-hover:text-slate-200 transition-colors uppercase tracking-wider">{item.label}</span>
                        </div>
                        <span className={`${item.status.color} text-[10px] font-black uppercase tracking-widest`}>
                            {item.status.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
