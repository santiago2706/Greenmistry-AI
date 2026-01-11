import { RegulatoryLevel } from '../types';

export const getRegulatoryColor = (level: RegulatoryLevel) => {
    const colors = {
        green: {
            bg: 'bg-[#00E676]/10',
            border: 'border-[#00E676]/40',
            text: 'text-[#00E676]',
            label: 'Bajo Riesgo',
            dot: 'bg-[#00E676]'
        },
        yellow: {
            bg: 'bg-amber-500/10',
            border: 'border-amber-500/40',
            text: 'text-amber-400',
            label: 'Riesgo Moderado',
            dot: 'bg-amber-400'
        },
        red: {
            bg: 'bg-[#FF5252]/10',
            border: 'border-[#FF5252]/40',
            text: 'text-[#FF5252]',
            label: 'Alto Riesgo',
            dot: 'bg-[#FF5252]'
        }
    };
    return colors[level];
};

export const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-[#00E676]';
    if (score >= 40) return 'text-[#00B4D8]';
    return 'text-[#FF5252]';
};

export const getScoreGlow = (score: number) => {
    if (score >= 70) return 'rgba(0, 230, 118, 0.4)';
    if (score >= 40) return 'rgba(0, 180, 216, 0.4)';
    return 'rgba(255, 82, 82, 0.4)';
};

export const getScoreLevelLabel = (score: number): string => {
    if (score < 40) return 'Nivel crítico · Rediseño urgente';
    if (score < 70) return 'Nivel intermedio · Optimización recomendada';
    return 'Nivel avanzado · Buen desempeño sostenible';
};
