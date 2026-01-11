import React from 'react';
import { FlaskConical, AlertTriangle, RefreshCw, Leaf } from 'lucide-react';
import { Chemical } from '../../types';

interface ChemicalCardProps {
    chemical: Chemical;
    onSubstitute: (chemical: Chemical) => void;
    canSubstitute?: boolean;
}

export const ChemicalCard: React.FC<ChemicalCardProps> = ({ chemical, onSubstitute, canSubstitute = true }) => {
    const isToxic = chemical.properties.toxicity > 5;
    const isRenewable = chemical.properties.renewable;

    return (
        <div className="group relative bg-[#1f2937]/50 border border-white/5 rounded-2xl p-5 hover:border-[#00B4D8]/30 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isToxic ? 'bg-rose-500/10 text-rose-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                        <FlaskConical className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-lg">{chemical.name}</h4>
                        <span className="text-xs text-slate-400 uppercase tracking-wider font-medium">{chemical.role}</span>
                    </div>
                </div>
                {isToxic && (
                    <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 px-3 py-1 rounded-full flex items-center gap-2 text-xs font-bold animate-pulse">
                        <AlertTriangle className="w-3 h-3" />
                        TÓXICO
                    </div>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-black/20 p-3 rounded-lg">
                    <span className="text-xs text-slate-500 block mb-1">Eficiencia Atómica</span>
                    <span className="text-white font-mono font-bold">{chemical.efficiency.atomEconomy}%</span>
                </div>
                <div className="bg-black/20 p-3 rounded-lg">
                    <span className="text-xs text-slate-500 block mb-1">Renovabilidad</span>
                    {isRenewable ? (
                        <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                            <Leaf className="w-3 h-3" /> Bio-based
                        </div>
                    ) : (
                        <span className="text-slate-400 font-bold text-sm">Fósil</span>
                    )}
                </div>
            </div>

            {canSubstitute && (
                <button
                    onClick={() => onSubstitute(chemical)}
                    className="w-full py-3 rounded-xl bg-[#00B4D8]/10 text-[#00B4D8] font-bold text-sm border border-[#00B4D8]/20 hover:bg-[#00B4D8] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-[0_0_20px_rgba(0,180,216,0.2)]"
                >
                    <RefreshCw className="w-4 h-4" />
                    Buscar Sustituto
                </button>
            )}
        </div>
    );
};
