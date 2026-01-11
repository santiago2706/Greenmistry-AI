import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface PrinciplesPanelProps {
    compliance: { [key: number]: boolean };
}

// 12 Principles Titles
const principles = [
    "Prevención", "Economía Atómica", "Síntesis Segura", "Diseño Seguro",
    "Solventes Seguros", "Eficiencia Energética", "Renovables", "Reducción Derivados",
    "Catálisis", "Biodegradabilidad", "Monitoreo Real", "Prevención Accidentes"
];

export const PrinciplesPanel: React.FC<PrinciplesPanelProps> = ({ compliance }) => {
    return (
        <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-6 border-b border-white/5 pb-4">
                Cumplimiento 12 Principios
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {principles.map((title, index) => {
                    const id = index + 1;
                    const isCompliant = compliance[id];

                    return (
                        <div
                            key={id}
                            className={`relative p-3 rounded-xl border transition-all duration-500 overflow-hidden group ${isCompliant
                                    ? 'bg-[#00E676]/5 border-[#00E676]/20'
                                    : 'bg-[#1f2937]/50 border-white/5 opacity-50 grayscale hover:grayscale-0'
                                }`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className={`text-xl font-black ${isCompliant ? 'text-[#00E676]' : 'text-slate-600'}`}>
                                    {id}
                                </span>
                                {isCompliant ? (
                                    <CheckCircle className="w-4 h-4 text-[#00E676]" />
                                ) : (
                                    <XCircle className="w-4 h-4 text-slate-600" />
                                )}
                            </div>
                            <p className={`text-[10px] font-bold leading-tight ${isCompliant ? 'text-white' : 'text-slate-500'}`}>
                                {title}
                            </p>

                            {/* Inner Glow for active items */}
                            {isCompliant && (
                                <div className="absolute inset-0 bg-gradient-to-br from-[#00E676]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
