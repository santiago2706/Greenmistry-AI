/**
 * GREEN CHEMISTRY COCKPIT - MOCK DATA
 * Pre-configured data for demos and development
 */

import type { Process, Chemical, OptimizationResult } from '@core/types';

// ============================================
// MOCK CHEMICALS
// ============================================

export const MOCK_CHEMICALS: Chemical[] = [
    {
        id: 'chem-001',
        name: 'Tetracloroetileno',
        casNumber: '127-18-4',
        formula: 'C2Cl4',
        category: 'solvent',
        toxicity: 'high',
        svhcStatus: 'present',
        properties: {
            molecularWeight: 165.83,
            boilingPoint: 121,
            meltingPoint: -22,
            density: 1.62,
            solubility: 'Insoluble en agua',
            hazardClass: ['Carcinógeno Cat. 2', 'Tóxico para reproducción'],
        },
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },
    {
        id: 'chem-002',
        name: 'D-Limoneno',
        casNumber: '5989-27-5',
        formula: 'C10H16',
        category: 'solvent',
        toxicity: 'low',
        svhcStatus: 'free',
        properties: {
            molecularWeight: 136.24,
            boilingPoint: 176,
            meltingPoint: -74,
            density: 0.84,
            solubility: 'Insoluble en agua, miscible con aceites',
            hazardClass: ['Sensibilizante cutáneo Cat. 1'],
        },
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },
    {
        id: 'chem-003',
        name: 'Acetato de Etilo',
        casNumber: '141-78-6',
        formula: 'C4H8O2',
        category: 'solvent',
        toxicity: 'low',
        svhcStatus: 'free',
        properties: {
            molecularWeight: 88.11,
            boilingPoint: 77,
            meltingPoint: -84,
            density: 0.90,
            solubility: 'Ligeramente soluble en agua',
            hazardClass: ['Líquido inflamable Cat. 2'],
        },
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },
];

// ============================================
// MOCK PROCESSES
// ============================================

export const MOCK_PROCESSES: Process[] = [
    {
        id: 'process-001',
        name: 'Teñido de Algodón con Colorantes Reactivos',
        description: 'Proceso de teñido industrial para tejidos de algodón utilizando colorantes reactivos.',
        industry: 'textile',
        status: 'active',
        chemicals: [
            { chemical: MOCK_CHEMICALS[0], role: 'solvent', quantity: 50, unit: 'L/batch' },
        ],
        greenScore: {
            overall: 42,
            level: 'poor',
            breakdown: {
                atomEconomy: 35,
                wasteReduction: 40,
                energyEfficiency: 55,
                renewableFeedstock: 20,
                toxicityReduction: 30,
                safetyIndex: 45,
            },
        },
        regulatoryStatus: {
            level: 'non-compliant',
            svhcCount: 2,
            warnings: [
                {
                    id: 'warn-001',
                    severity: 'critical',
                    message: 'Tetracloroetileno en lista SVHC de REACH',
                    chemicalId: 'chem-001',
                    regulation: 'REACH',
                },
            ],
            regulations: ['REACH', 'MINAM'],
        },
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-06-20T14:30:00Z',
    },
    {
        id: 'process-002',
        name: 'Teñido de Algodón Optimizado',
        description: 'Proceso de teñido mejorado con solventes verdes y menor consumo energético.',
        industry: 'textile',
        status: 'optimized',
        chemicals: [
            { chemical: MOCK_CHEMICALS[1], role: 'solvent', quantity: 40, unit: 'L/batch' },
            { chemical: MOCK_CHEMICALS[2], role: 'solvent', quantity: 10, unit: 'L/batch' },
        ],
        greenScore: {
            overall: 78,
            level: 'good',
            breakdown: {
                atomEconomy: 72,
                wasteReduction: 80,
                energyEfficiency: 85,
                renewableFeedstock: 75,
                toxicityReduction: 82,
                safetyIndex: 78,
            },
        },
        regulatoryStatus: {
            level: 'compliant',
            svhcCount: 0,
            warnings: [],
            regulations: ['REACH', 'MINAM'],
        },
        createdAt: '2024-06-21T09:00:00Z',
        updatedAt: '2024-06-21T09:00:00Z',
    },
];

// ============================================
// MOCK OPTIMIZATION RESULT
// ============================================

export const MOCK_OPTIMIZATION_RESULT: OptimizationResult = {
    originalScore: 42,
    optimizedScore: 78,
    improvement: 85.7,
    suggestions: [
        {
            id: 'sug-001',
            type: 'substitute',
            priority: 'high',
            title: 'Sustituir Tetracloroetileno por D-Limoneno',
            description: 'Reemplazar solvente clorado tóxico por terpeno de origen natural.',
            impact: 25,
            reasoning: 'El D-Limoneno es un solvente de origen cítrico, biodegradable y no está clasificado como SVHC. Mantiene eficacia desengrasante similar.',
            originalChemical: MOCK_CHEMICALS[0],
            suggestedChemical: MOCK_CHEMICALS[1],
        },
        {
            id: 'sug-002',
            type: 'reduce',
            priority: 'medium',
            title: 'Reducir consumo de solvente en 20%',
            description: 'Optimizar el ratio de baño para reducir volumen de solvente requerido.',
            impact: 8,
            reasoning: 'Análisis de proceso indica que el ratio actual de baño es subóptimo. Reducción de 50L a 40L mantiene calidad de teñido.',
        },
        {
            id: 'sug-003',
            type: 'process',
            priority: 'low',
            title: 'Implementar recirculación de agua',
            description: 'Instalar sistema de recirculación para reducir consumo de agua fresca.',
            impact: 5,
            reasoning: 'Sistema cerrado permite reutilizar 60% del agua de proceso, reduciendo Factor E.',
        },
    ],
};

// ============================================
// DEMO MODE DATA
// ============================================

export const DEMO_STEPS = [
    {
        id: 0,
        title: 'Bienvenido al Green Chemistry Cockpit',
        description: 'Plataforma de inteligencia para rediseño de procesos químicos.',
        action: 'Iniciar Demo',
    },
    {
        id: 1,
        title: 'Análisis de Proceso Actual',
        description: 'Evaluamos el proceso de teñido textil con métricas de química verde.',
        action: 'Ver Análisis',
    },
    {
        id: 2,
        title: 'Identificación de SVHC',
        description: 'Detectamos sustancias de muy alta preocupación en el proceso.',
        action: 'Ver Alertas',
    },
    {
        id: 3,
        title: 'Motor de Optimización',
        description: 'Generamos recomendaciones inteligentes para mejorar el proceso.',
        action: 'Ver Sugerencias',
    },
    {
        id: 4,
        title: 'Resultados de Mejora',
        description: 'Comparamos el proceso original vs. optimizado.',
        action: 'Ver Comparación',
    },
];
