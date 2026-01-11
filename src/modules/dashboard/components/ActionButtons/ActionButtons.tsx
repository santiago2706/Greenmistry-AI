import React from 'react';
import { useNavigate } from 'react-router-dom';

export const ActionButtons: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <button
                onClick={() => navigate('/processes')}
                className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105"
            >
                Iniciar Rediseño del Proceso
            </button>
            <button
                onClick={() => navigate('/demo')}
                className="px-8 py-4 border-2 border-slate-700/50 hover:border-cyan-500/50 text-slate-400 hover:text-cyan-300 font-semibold rounded-xl hover:bg-cyan-500/5 transition-all duration-300 flex items-center gap-2"
            >
                Modo Demo Ejecutivo
            </button>
            <button
                onClick={() => navigate('/process-overview')}
                className="px-8 py-4 border-2 border-cyan-500/50 hover:border-cyan-400 text-cyan-300 font-semibold rounded-xl hover:bg-cyan-500/10 transition-all duration-300"
            >
                Ver Detalle Técnico
            </button>
        </div>
    );
};
