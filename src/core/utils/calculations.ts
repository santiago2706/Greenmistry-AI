/**
 * GREEN CHEMISTRY COCKPIT - CORE UTILITIES
 * Green chemistry calculation functions
 */

import type { ScoreLevel, GreenScore, ScoreBreakdown } from '@core/types';

/**
 * Calculate overall green score from breakdown components
 */
export function calculateOverallScore(breakdown: ScoreBreakdown): number {
    const weights = {
        atomEconomy: 0.20,
        wasteReduction: 0.20,
        energyEfficiency: 0.15,
        renewableFeedstock: 0.15,
        toxicityReduction: 0.20,
        safetyIndex: 0.10,
    };

    const score = Object.entries(breakdown).reduce((acc, [key, value]) => {
        return acc + value * weights[key as keyof typeof weights];
    }, 0);

    return Math.round(score * 10) / 10;
}

/**
 * Determine score level from numeric score
 */
export function getScoreLevel(score: number): ScoreLevel {
    if (score >= 85) return 'excellent';
    if (score >= 70) return 'good';
    if (score >= 50) return 'moderate';
    if (score >= 30) return 'poor';
    return 'critical';
}

/**
 * Get score color based on level
 */
export function getScoreColor(level: ScoreLevel): string {
    const colors: Record<ScoreLevel, string> = {
        excellent: 'var(--color-green-score-excellent)',
        good: 'var(--color-green-score-good)',
        moderate: 'var(--color-green-score-moderate)',
        poor: 'var(--color-green-score-poor)',
        critical: 'var(--color-green-score-critical)',
    };
    return colors[level];
}

/**
 * Calculate percentage improvement between two scores
 */
export function calculateImprovement(original: number, optimized: number): number {
    if (original === 0) return 0;
    return Math.round(((optimized - original) / original) * 100 * 10) / 10;
}

/**
 * Build complete GreenScore object
 */
export function buildGreenScore(breakdown: ScoreBreakdown): GreenScore {
    const overall = calculateOverallScore(breakdown);
    return {
        overall,
        level: getScoreLevel(overall),
        breakdown,
    };
}
