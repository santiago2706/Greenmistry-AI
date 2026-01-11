import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    BookOpen,
    Activity,
    Beaker,
    ShieldAlert,
    Info,
    ChevronRight,
    Binary
} from 'lucide-react';
import { useContextualInsight } from '@core/stores/useContextualInsight';

export const InsightDataStrip: React.FC = () => {
    const { activeInsight, isOpen, closeInsight } = useContextualInsight();

    if (!activeInsight) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeInsight}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10000]"
                    />

                    {/* Side Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-[400px] bg-[#0F172A] border-l border-white/10 z-[10001] shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-slate-900 to-[#0F172A]">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                                    <Beaker className="w-5 h-5 text-cyan-400" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-white tracking-tight">{activeInsight.title}</h2>
                                    <p className="text-xs text-cyan-500/70 font-black uppercase tracking-widest">{activeInsight.subtitle}</p>
                                </div>
                            </div>
                            <button
                                onClick={closeInsight}
                                className="p-2 hover:bg-white/5 rounded-full transition-colors group"
                            >
                                <X className="w-5 h-5 text-slate-500 group-hover:text-white" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">

                            {/* Short Description */}
                            <section>
                                <div className="flex items-center gap-2 mb-3">
                                    <Info className="w-4 h-4 text-slate-500" />
                                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Resumen Ejecutivo</h3>
                                </div>
                                <p className="text-sm text-slate-300 leading-relaxed italic border-l-2 border-slate-700 pl-4">
                                    {activeInsight.description}
                                </p>
                            </section>

                            {/* Technical Grid */}
                            <section>
                                <div className="flex items-center gap-2 mb-4">
                                    <Binary className="w-4 h-4 text-cyan-500" />
                                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Especificaciones Técnicas</h3>
                                </div>
                                <div className="grid grid-cols-1 gap-3">
                                    {activeInsight.technicalData.map((data, idx) => (
                                        <div key={idx} className="bg-slate-900/50 border border-white/5 rounded-xl p-4 flex justify-between items-center group hover:border-cyan-500/30 transition-colors">
                                            <span className="text-xs text-slate-500 font-medium">{data.label}</span>
                                            <span className={`text-sm font-bold ${data.type === 'hazard' ? 'text-red-400' :
                                                    data.type === 'code' ? 'text-cyan-400 font-mono' : 'text-white'
                                                }`}>
                                                {data.value}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Scientific Context */}
                            <section>
                                <div className="flex items-center gap-2 mb-3">
                                    <Activity className="w-4 h-4 text-emerald-500" />
                                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Fundamento Científico</h3>
                                </div>
                                <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-6 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-5">
                                        <BookOpen className="w-12 h-12 text-emerald-400" />
                                    </div>
                                    <p className="text-sm text-slate-300 leading-relaxed relative z-10 font-light">
                                        {activeInsight.scientificContext}
                                    </p>
                                </div>
                            </section>

                            {/* Recommendation */}
                            <section>
                                <div className="flex items-center gap-2 mb-3">
                                    <ShieldAlert className="w-4 h-4 text-amber-500" />
                                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Acción Recomendada</h3>
                                </div>
                                <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-4">
                                    <div className="mt-1">
                                        <ChevronRight className="w-4 h-4 text-amber-500" />
                                    </div>
                                    <p className="text-sm text-amber-200/90 font-medium leading-snug">
                                        {activeInsight.recommendation}
                                    </p>
                                </div>
                            </section>

                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-white/5 bg-slate-900/30 text-center">
                            <span className="text-[10px] text-slate-600 font-black uppercase tracking-[0.2em]">Scientific Intelligence Layer v4.0</span>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
