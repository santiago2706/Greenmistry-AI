/**
 * Dashboard Module - Types
 */

export interface DashboardStats {
    totalProcesses: number;
    averageScore: number;
    svhcAlerts: number;
    optimizationPotential: number;
}

export interface DashboardWidget {
    id: string;
    title: string;
    type: 'score' | 'chart' | 'list' | 'alert';
    data: unknown;
}
