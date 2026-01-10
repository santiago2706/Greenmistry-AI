/**
 * Process Analysis Module - Types
 */
export interface ProcessAnalysisState {
    selectedProcessId: string | null;
    viewMode: 'list' | 'detail' | 'compare';
}

export interface ProcessFilter {
    industry?: string;
    status?: string;
    scoreRange?: [number, number];
}
