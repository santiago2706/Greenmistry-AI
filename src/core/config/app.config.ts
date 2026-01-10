/**
 * GREEN CHEMISTRY COCKPIT - APP CONFIGURATION
 * Centralized application configuration
 */

export const APP_CONFIG = {
    name: 'Green Chemistry Cockpit',
    version: '1.0.0',
    description: 'Plataforma de inteligencia para química verde industrial',
    company: 'Green Chemistry Solutions',
} as const;

export const API_CONFIG = {
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
    timeout: 30000,
} as const;

export const FEATURE_FLAGS = {
    enableDemoMode: true,
    enableExport: true,
    enableRegulatoryAlerts: true,
    enableAdvancedOptimization: true,
} as const;

export const INDUSTRIES = {
    TEXTILE: 'textile',
    MINING: 'mining',
    FISHING: 'fishing',
} as const;

export type Industry = typeof INDUSTRIES[keyof typeof INDUSTRIES];
