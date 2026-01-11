import React from 'react';
import { TrendingUp } from 'lucide-react';

interface ProcessStatusProps {
    score: number;
}

export const ProcessStatus: React.FC<ProcessStatusProps> = ({ score }) => {
    return (
        <div className="backdrop-blur-xl bg-slate-900/40 border border-slate-700/50 rounded-xl p-6 shadow-xl">
            <h3 className="text-lg font-semibold mb-6 text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-cyan-400" />
                Estado del Proceso Químico
            </h3>

            <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-slate-700/30">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50"></div>
                        <span className="text-slate-300">Eficiencia Atómica</span>
                    </div>
                    <span className="text-emerald-400 text-sm font-medium">Óptimo</span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-slate-700/30">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-red-400 rounded-full shadow-lg shadow-red-400/50"></div>
                        <span className="text-slate-300">Uso de Materias Renovables</span>
                    </div>
                    <span className="text-red-400 text-sm font-medium">Deficiente</span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-slate-700/30">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-amber-400 rounded-full shadow-lg shadow-amber-400/50"></div>
                        <span className="text-slate-300">Generación de Residuos</span>
                    </div>
                    <span className="text-amber-400 text-sm font-medium">Aceptable</span>
                </div>

                <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"></div>
                        <span className="text-slate-300">Eficiencia Energética</span>
                    </div>
                    <span className="text-cyan-400 text-sm font-medium">Aceptable</span>
                </div>
            </div>
        </div>
    );
};
