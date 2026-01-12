import React from 'react';
import favicon from '/dist/favicon.svg';

interface DashboardHeaderProps {
    systemStatus: 'operational' | 'maintenance';
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ systemStatus }) => {
    return (
        <div className="backdrop-blur-xl bg-slate-900/40 border border-slate-700/50 rounded-2xl p-4 mb-8 shadow-2xl">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 bg-gradient-to-br from-indigo-500/20 to-blue-600/20 rounded-2xl flex items-center justify-center border border-white/10 shadow-inner group overflow-hidden">
                        <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay"></div>
                        {/* Custom SVG Flask with Leaf */}
<img 
                            src={favicon} 
                            alt="Greenmistry AI Logo" 
                            // Estas clases aseguran que brille igual que el anterior y mantenga el tamaño
                            className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                        />                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400">
                                Greenmistry <span className="text-blue-400">AI</span>
                            </h1>
                        </div>
                        <p className="text-[10px] uppercase font-black tracking-[0.2em] text-blue-500/60 leading-tight">
                            Advanced Chemical Intelligence Platform
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-950/50 border border-emerald-500/30 rounded-full">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
                    <span className="text-sm text-emerald-300 font-medium">
                        {systemStatus === 'operational' ? 'Operativo' : 'Mantenimiento'}
                    </span>
                </div>
            </div>
        </div>
    );
};
