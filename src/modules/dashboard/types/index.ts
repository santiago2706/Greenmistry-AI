import { LucideIcon } from 'lucide-react';

export type RegulatoryLevel = 'green' | 'yellow' | 'red';

export type IndustryKey = 'textil' | 'mineria' | 'pesquera';

export interface IndustryData {
    name: string;
    score: number;
    regulatory: RegulatoryLevel;
    insight: string;
    processes: string;
    icon: LucideIcon;
}

export type IndustriesMap = Record<IndustryKey, IndustryData>;

export interface DashboardStats {
    totalProcesses: number;
    averageScore: number;
    svhcAlerts: number;
    optimizationPotential: number;
}

