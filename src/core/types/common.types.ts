/**
 * GREEN CHEMISTRY COCKPIT - COMMON TYPES
 * Shared type definitions across the application
 */

// ============================================
// BASE TYPES
// ============================================

export interface BaseEntity {
    id: string;
    createdAt: string;
    updatedAt: string;
}

export type Status = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T> {
    data: T | null;
    status: Status;
    error: string | null;
}

// ============================================
// GREEN CHEMISTRY SCORE TYPES
// ============================================

export type ScoreLevel = 'excellent' | 'good' | 'moderate' | 'poor' | 'critical';

export interface GreenScore {
    overall: number; // 0-100
    level: ScoreLevel;
    breakdown: ScoreBreakdown;
}

export interface ScoreBreakdown {
    atomEconomy: number;
    wasteReduction: number;
    energyEfficiency: number;
    renewableFeedstock: number;
    toxicityReduction: number;
    safetyIndex: number;
}

// ============================================
// CHEMICAL TYPES
// ============================================

export type ChemicalCategory = 'solvent' | 'catalyst' | 'reagent' | 'product' | 'waste';
export type ToxicityLevel = 'low' | 'medium' | 'high';
export type SVHCStatus = 'free' | 'trace' | 'present';

export interface Chemical extends BaseEntity {
    name: string;
    casNumber: string;
    formula: string;
    category: ChemicalCategory;
    toxicity: ToxicityLevel;
    svhcStatus: SVHCStatus;
    properties: ChemicalProperties;
}

export interface ChemicalProperties {
    molecularWeight: number;
    boilingPoint: number;
    meltingPoint: number;
    density: number;
    solubility: string;
    hazardClass: string[];
}

// ============================================
// PROCESS TYPES
// ============================================

export type ProcessStatus = 'draft' | 'active' | 'optimized' | 'archived';

export interface Process extends BaseEntity {
    name: string;
    description: string;
    industry: string;
    status: ProcessStatus;
    chemicals: ProcessChemical[];
    greenScore: GreenScore;
    regulatoryStatus: RegulatoryStatus;
}

export interface ProcessChemical {
    chemical: Chemical;
    role: ChemicalCategory;
    quantity: number;
    unit: string;
}

// ============================================
// REGULATORY TYPES
// ============================================

export type ComplianceLevel = 'compliant' | 'warning' | 'non-compliant';

export interface RegulatoryStatus {
    level: ComplianceLevel;
    svhcCount: number;
    warnings: RegulatoryWarning[];
    regulations: string[];
}

export interface RegulatoryWarning {
    id: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    message: string;
    chemicalId: string;
    regulation: string;
}

// ============================================
// OPTIMIZATION TYPES
// ============================================

export interface OptimizationResult {
    originalScore: number;
    optimizedScore: number;
    improvement: number;
    suggestions: OptimizationSuggestion[];
}

export interface OptimizationSuggestion {
    id: string;
    type: 'substitute' | 'reduce' | 'eliminate' | 'process';
    priority: 'high' | 'medium' | 'low';
    title: string;
    description: string;
    impact: number;
    reasoning: string;
    originalChemical?: Chemical;
    suggestedChemical?: Chemical;
}

// ============================================
// UI TYPES
// ============================================

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
    id: string;
    type: ToastType;
    title: string;
    message?: string;
    duration?: number;
}

export interface BreadcrumbItem {
    label: string;
    path?: string;
}

export interface TabItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
    disabled?: boolean;
}
