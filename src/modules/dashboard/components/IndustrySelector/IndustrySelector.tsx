import React from 'react';
import { FlaskConical, Activity, GitBranch } from 'lucide-react';

interface IndustrySelectorProps {
    industries: any; // Keeping prop for compatibility but reusing it for context selection
    selectedIndustry: string;
    onSelect: (key: any) => void;
}

const contexts = [
    {
        id: 'product',
        title: 'Producto Químico',
        description: 'Síntesis basada en solventes',
        icon: FlaskConical
    },
    {
        id: 'process',
        title: 'Proceso Químico',
        description: 'Reacción catalítica',
        icon: Activity
    },
    {
        id: 'pathway',
        title: 'Ruta de Reacción',
        description: 'Etapa de separación',
        icon: GitBranch
    }
];

export const IndustrySelector: React.FC<IndustrySelectorProps> = ({ selectedIndustry, onSelect }) => {
    return (
        <div className="mb-8">
            <h2 className="text-sm font-semibold text-slate-450 uppercase tracking-wider mb-4 ml-1">Contexto Químico</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {contexts.map((context) => {
                    const Icon = context.icon;
                    // For demo compatibility, mapping context ID directly as "industry"
                    const isActive = selectedIndustry === context.id || (selectedIndustry === 'textil' && context.id === 'product');

                    return (
                        <button
                            key={context.id}
                            onClick={() => onSelect(context.id)}
                                className={`p-6 rounded-xl border transition-all duration-300 text-left ${isActive
                                    ? 'bg-slate-800/60 border-cyan-500/60 shadow-lg shadow-cyan-500/20 backdrop-blur-xl'
                                    : 'bg-slate-800/30 border-slate-400/50 hover:border-slate-400/70 backdrop-blur-md'
                                }`}

                        >
                            <Icon className={`w-8 h-8 mb-3 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                            <h3 className={`font-semibold mb-1 ${isActive ? 'text-white' : 'text-slate-300'}`}>
                                {context.title}
                            </h3>
                            <p className="text-sm text-slate-400">{context.description}</p>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
