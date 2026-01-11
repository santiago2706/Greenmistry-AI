import { Chemical, Process } from '../types';

export const mockChemicals: Record<string, Chemical> = {
    'cromo-vi': {
        id: 'cromo-vi',
        name: 'Dicromato de Potasio (Cr VI)',
        casNumber: '7778-50-9',
        role: 'reagent',
        properties: {
            toxicity: 9, // Very high
            flammability: 3,
            bioaccumulative: true,
            renewable: false
        },
        efficiency: {
            atomicWeight: 294.18,
            atomEconomy: 45
        },
        principlesViolated: [3, 4, 12], // Less Hazardous Synthesis, Designing Safer Chemicals, Safer Chemistry for Accident Prevention
        costPerKg: 15.50
    },
    'enzyme-laccase': {
        id: 'enzyme-laccase',
        name: 'Enzima Lacasa (Bio-catalizador)',
        casNumber: '80498-15-3',
        role: 'catalyst',
        properties: {
            toxicity: 1, // Low
            flammability: 0,
            bioaccumulative: false,
            renewable: true
        },
        efficiency: {
            atomicWeight: 60000, // Macromolecule
            atomEconomy: 95
        },
        principlesViolated: [],
        costPerKg: 45.00
    },
    'organic-solvent': {
        id: 'organic-solvent',
        name: 'Tolueno',
        casNumber: '108-88-3',
        role: 'solvent',
        properties: {
            toxicity: 7,
            flammability: 9,
            bioaccumulative: false,
            renewable: false
        },
        efficiency: {
            atomicWeight: 92.14,
            atomEconomy: 0 // Solvent, waste
        },
        principlesViolated: [5, 1, 12], // Safer Solvents, Prevention, Accident Prevention
        costPerKg: 2.30
    },
    'water': {
        id: 'water',
        name: 'Agua (Solvente Universal)',
        casNumber: '7732-18-5',
        role: 'solvent',
        properties: {
            toxicity: 0,
            flammability: 0,
            bioaccumulative: false,
            renewable: true
        },
        efficiency: {
            atomicWeight: 18.01,
            atomEconomy: 100 // Recyclable
        },
        principlesViolated: [],
        costPerKg: 0.01
    }
};

export const mockProcesses: Process[] = [
    {
        id: 'proc-textil-01',
        name: 'Teñido de Algodón con Oxidantes',
        industry: 'textil',
        description: 'Proceso convencional de teñido utilizando dicromatos para fijación de color. Alta toxicidad y generación de residuos peligrosos.',
        chemicals: [
            mockChemicals['cromo-vi'],
            mockChemicals['organic-solvent']
        ],
        outputProduct: 'Tela de Algodón Teñida',
        targetYield: 85
    }
];
