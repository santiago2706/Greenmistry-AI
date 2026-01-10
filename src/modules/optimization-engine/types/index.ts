/**
 * Optimization Engine Module - Types
 */
export interface OptimizationConfig {
    weights: {
        toxicity: number;
        svhc: number;
        atomEconomy: number;
        energy: number;
    };
    minImprovement: number;
}

export interface SubstitutionCandidate {
    originalId: string;
    alternativeId: string;
    score: number;
    reasoning: string;
}
