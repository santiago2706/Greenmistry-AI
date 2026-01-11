import React from 'react';
import { Atom } from 'lucide-react';

interface DashboardHeaderProps {
    systemStatus: 'operational' | 'maintenance';
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ systemStatus }) => {
    return (
        <div className="backdrop-blur-xl bg-slate-900/40 border border-slate-700/50 rounded-2xl p-4 mb-8 shadow-2xl">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shadow-lg">
                        <Atom className="w-7 h-7 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-white">Green Chemistry Cockpit</h1>
                        <p className="text-sm text-slate-400">Industrial Process Redesign Platform</p>
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
