/**
 * Demo Mode - Pre-configured Data
 * Optimized datasets for executive demonstrations
 */

import { MOCK_PROCESSES, MOCK_OPTIMIZATION_RESULT, DEMO_STEPS } from '@shared/data';

// Re-export demo data with additional metadata
export const DEMO_DATA = {
    steps: DEMO_STEPS,
    processes: MOCK_PROCESSES,
    optimization: MOCK_OPTIMIZATION_RESULT,

    // Demo-specific highlights
    highlights: {
        beforeScore: 42,
        afterScore: 78,
        improvement: 86,
        svhcEliminated: 2,
        costSavings: '15-20%',
    },

    // Key talking points for presentation
    talkingPoints: [
        'Reducción de 86% en riesgo regulatorio',
        'Eliminación completa de sustancias SVHC',
        'Ahorro estimado de 15-20% en costos de tratamiento',
        'Cumplimiento anticipado con normativas REACH 2025',
    ],
};
