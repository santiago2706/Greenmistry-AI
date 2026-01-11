import { motion } from 'framer-motion';
import { useContextualInsight } from '@core/stores/useContextualInsight';

interface ScoreDisplayProps {
    currentScore: number;
    isAnimating: boolean;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ currentScore, isAnimating }) => {
    const { openInsight } = useContextualInsight();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => openInsight('score-global')}
            className="backdrop-blur-xl bg-gradient-to-br from-slate-900/60 to-slate-800/60 border border-slate-700/50 rounded-2xl p-8 mb-8 shadow-2xl relative overflow-hidden cursor-pointer group hover:border-cyan-500/30 transition-all"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5"></div>

            <div className="relative z-10">
                <h2 className="text-2xl font-bold text-center mb-8 text-white uppercase tracking-tighter">
                    Score Global de Química Verde
                </h2>

                <div className="flex justify-center mb-10">
                    <div className="relative">
                        {/* Circular progress ring with motion */}
                        <svg className="w-64 h-64 transform -rotate-90">
                            <circle
                                cx="128"
                                cy="128"
                                r="110"
                                stroke="currentColor"
                                strokeWidth="12"
                                fill="none"
                                className="text-slate-700/20"
                            />
                            <motion.circle
                                cx="128"
                                cy="128"
                                r="110"
                                stroke="url(#gradient)"
                                strokeWidth="12"
                                fill="none"
                                strokeLinecap="round"
                                initial={{ strokeDasharray: "0 691" }}
                                animate={{ strokeDasharray: `${(currentScore / 100) * 691} 691` }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="drop-shadow-lg"
                                style={{
                                    filter: 'drop-shadow(0 0 12px rgba(6, 182, 212, 0.5))'
                                }}
                            />
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#f43f5e" />
                                    <stop offset="50%" stopColor="#06b6d4" />
                                    <stop offset="100%" stopColor="#10b981" />
                                </linearGradient>
                            </defs>
                        </svg>

                        {/* Score display with motion counter effect */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <motion.div
                                key={currentScore}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-7xl font-black text-white tracking-widest"
                            >
                                {currentScore}
                            </motion.div>
                            <div className="text-slate-500 text-sm font-bold tracking-[0.3em] uppercase mt-2">Puntos GC</div>
                        </div>
                    </div>
                </div>

                {/* Insight panel with reactive content */}
                <motion.div
                    animate={{ x: isAnimating ? [0, -2, 2, 0] : 0 }}
                    transition={{ duration: 0.2, repeat: isAnimating ? Infinity : 0 }}
                    className="backdrop-blur-md bg-[#0F172A]/80 border border-white/10 rounded-xl p-6 shadow-inner"
                >
                    <div className="flex items-center gap-2 mb-3">
                        <div className={`w-2 h-2 rounded-full ${currentScore > 70 ? 'bg-emerald-400' : 'bg-red-400'} animate-pulse`} />
                        <h3 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.2em]">Diagnóstico de Inteligencia</h3>
                    </div>
                    <p className="text-slate-300 leading-relaxed text-sm">
                        {currentScore < 50 ? (
                            "Alerta: Dependencia crítica de precursores halogenados detectada. Eficiencia atómica por debajo del estándar industrial sostenible. Se requiere sustitución de solventes inmediata."
                        ) : currentScore < 85 ? (
                            "Optimización Parcial: Mejoras en el uso de catalizadores detectadas. El proceso se encuentra en fase de transición. Pendiente validación final de toxicidad acuática."
                        ) : (
                            "Estado Certificado: El proceso cumple con los estándares más altos de Química Verde. Economía atómica optimizada y huella de solventes neutralizada para exportación EU."
                        )}
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
};
