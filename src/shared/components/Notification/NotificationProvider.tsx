import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    AlertTriangle,
    CheckCircle,
    Zap,
    ShieldCheck,
    X
} from 'lucide-react';
import { useNotificationStore, SystemEvent } from '@core/stores/useNotificationStore';

const iconMap = {
    success: CheckCircle,
    alert: AlertTriangle,
    system: Zap,
    compliance: ShieldCheck,
};

const colorMap = {
    success: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/5',
    alert: 'text-red-400 border-red-500/30 bg-red-500/5',
    system: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/5',
    compliance: 'text-amber-400 border-amber-500/30 bg-amber-500/5',
};

const NotificationItem: React.FC<{ event: SystemEvent }> = ({ event }) => {
    const dismiss = useNotificationStore((state) => state.dismiss);
    const Icon = iconMap[event.type];

    return (
        <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: 100, transition: { duration: 0.2 } }}
            className={`pointer-events-auto w-96 mb-4 rounded-xl border backdrop-blur-xl p-4 shadow-2xl ${colorMap[event.type]} relative overflow-hidden group`}
        >
            {/* Scanline effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,3px_100%] pointer-events-none"></div>

            <div className="flex items-start gap-4 relative z-10">
                <div className="mt-0.5">
                    <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50">
                            {event.type} Event // {event.timestamp.toLocaleTimeString()}
                        </span>
                        <button
                            onClick={() => dismiss(event.id)}
                            className="text-white/20 hover:text-white transition-colors"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1 tracking-tight">
                        {event.message}
                    </h4>
                    {event.description && (
                        <p className="text-xs text-slate-400 leading-relaxed font-mono">
                            {event.description}
                        </p>
                    )}
                </div>
            </div>

            {/* Progress bar timer */}
            <motion.div
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 6, ease: "linear" }}
                className={`absolute bottom-0 left-0 h-0.5 opacity-50 ${event.type === 'success' ? 'bg-emerald-400' :
                    event.type === 'alert' ? 'bg-red-400' : 'bg-cyan-400'
                    }`}
            />
        </motion.div>
    );
};

export const NotificationProvider: React.FC = () => {
    const events = useNotificationStore((state) => state.events);

    return (
        <div className="fixed top-8 right-8 z-[9999] pointer-events-none">
            <AnimatePresence mode="popLayout">
                {events.map((event) => (
                    <NotificationItem key={event.id} event={event} />
                ))}
            </AnimatePresence>
        </div>
    );
};
