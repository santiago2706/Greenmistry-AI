/**
 * OPTIMIZATION ENGINE - ALGORITHMS
 * Deterministic optimization algorithms for green chemistry
 */

import type { Chemical, OptimizationSuggestion, ScoreBreakdown } from '@core/types';

/**
 * Calculate weighted priority score for substitution
 * Higher score = higher priority for substitution
 */
export function calculateSubstitutionPriority(
    chemical: Chemical,
    weights = { toxicity: 0.4, svhc: 0.35, atomEconomy: 0.15, energy: 0.1 }
): number {
    let score = 0;

    // Toxicity factor
    const toxicityScores = { high: 100, medium: 50, low: 10 };
    score += toxicityScores[chemical.toxicity] * weights.toxicity;

    // SVHC factor
    const svhcScores = { present: 100, trace: 50, free: 0 };
    score += svhcScores[chemical.svhcStatus] * weights.svhc;

    return Math.round(score);
}

/**
 * Rank alternatives by compatibility and green score improvement
 */
export function rankAlternatives(
    _original: Chemical,
    alternatives: Chemical[]
): Chemical[] {
    return alternatives
        .filter((alt) => alt.svhcStatus === 'free' || alt.svhcStatus === 'trace')
        .sort((a, b) => {
            // Prioritize SVHC-free
            if (a.svhcStatus !== b.svhcStatus) {
                return a.svhcStatus === 'free' ? -1 : 1;
            }
            // Then by toxicity
            const toxicityOrder = { low: 0, medium: 1, high: 2 };
            return toxicityOrder[a.toxicity] - toxicityOrder[b.toxicity];
        });
}

/**
 * Generate explanation for substitution recommendation
 */
export function generateSubstitutionReasoning(
    original: Chemical,
    suggested: Chemical
): string {
    const reasons: string[] = [];

    if (original.svhcStatus !== 'free' && suggested.svhcStatus === 'free') {
        reasons.push('Elimina sustancia SVHC de la lista de preocupación de REACH');
    }

    if (original.toxicity === 'high' && suggested.toxicity !== 'high') {
        reasons.push('Reduce significativamente el perfil de toxicidad');
    }

    if (original.toxicity === 'medium' && suggested.toxicity === 'low') {
        reasons.push('Mejora el perfil de toxicidad del proceso');
    }

    if (reasons.length === 0) {
        reasons.push('Alternativa compatible con mejores indicadores ambientales');
    }

    return reasons.join('. ') + '.';
}

/**
 * Calculate estimated improvement percentage
 */
export function calculateImprovementEstimate(
    currentBreakdown: ScoreBreakdown,
    suggestions: OptimizationSuggestion[]
): number {
    const totalImpact = suggestions.reduce((sum, s) => sum + s.impact, 0);
    const currentScore = Object.values(currentBreakdown).reduce((a, b) => a + b, 0) / 6;

    if (currentScore === 0) return 0;
    return Math.min(100, Math.round((totalImpact / currentScore) * 100));
}
