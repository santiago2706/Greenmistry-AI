import { create } from 'zustand';
import { Chemical, Process, AnalysisResult } from '../types';
import { mockProcesses, mockChemicals } from '../data/mockData';

interface ProcessState {
    currentProcess: Process | null;
    originalProcess: Process | null; // To compare vs baseline

    // Actions
    loadProcess: (id: string) => void;
    substituteChemical: (oldChemicalId: string, newChemical: Chemical) => void;
    resetProcess: () => void;

    // Computed (via getters/selectors in component, or helper here)
    calculateAnalysis: (process: Process) => AnalysisResult;
}

export const useProcessStore = create<ProcessState>((set, get) => ({
    currentProcess: mockProcesses[0], // Default loaded for demo
    originalProcess: JSON.parse(JSON.stringify(mockProcesses[0])), // Deep copy for baseline

    loadProcess: (id) => {
        const process = mockProcesses.find(p => p.id === id) || mockProcesses[0];
        set({
            currentProcess: process,
            originalProcess: JSON.parse(JSON.stringify(process))
        });
    },

    substituteChemical: (oldChemicalId, newChemical) => {
        set((state) => {
            if (!state.currentProcess) return {};

            const updatedChemicals = state.currentProcess.chemicals.map(chem =>
                chem.id === oldChemicalId ? newChemical : chem
            );

            return {
                currentProcess: {
                    ...state.currentProcess,
                    chemicals: updatedChemicals
                }
            };
        });
    },

    resetProcess: () => {
        const { originalProcess } = get();
        if (originalProcess) {
            set({ currentProcess: JSON.parse(JSON.stringify(originalProcess)) });
        }
    },

    calculateAnalysis: (process: Process): AnalysisResult => {
        if (!process || !process.chemicals.length) {
            return {
                totalScore: 0,
                toxicityScore: 0,
                efficiencyScore: 0,
                principlesCompliance: {},
                regulatoryRisk: 'low'
            };
        }

        let totalToxicity = 0;
        let totalEfficiency = 0;
        const allViolatedPrinciples = new Set<number>();

        process.chemicals.forEach(chem => {
            totalToxicity += chem.properties.toxicity;
            totalEfficiency += chem.efficiency.atomEconomy;

            chem.principlesViolated.forEach(p => allViolatedPrinciples.add(p));
        });

        // Simple mock scoring logic
        const avgToxicity = totalToxicity / process.chemicals.length;
        const avgEfficiency = totalEfficiency / process.chemicals.length;

        // 12 Principles Compliance (Mock: if not in violated set, it's compliant)
        const compliance: { [key: number]: boolean } = {};
        for (let i = 1; i <= 12; i++) {
            compliance[i] = !allViolatedPrinciples.has(i);
        }

        // Score Calculation (Inverse to toxicity, Direct to efficiency)
        const toxicityFactor = (10 - avgToxicity) * 5; // Max 50
        const efficiencyFactor = (avgEfficiency / 100) * 50; // Max 50
        const totalScore = Math.round(toxicityFactor + efficiencyFactor);

        // Regulatory Risk
        let regulatoryRisk: 'low' | 'moderate' | 'high' = 'low';
        if (avgToxicity > 7) regulatoryRisk = 'high';
        else if (avgToxicity > 4) regulatoryRisk = 'moderate';

        return {
            totalScore,
            toxicityScore: avgToxicity,
            efficiencyScore: avgEfficiency,
            principlesCompliance: compliance,
            regulatoryRisk
        };
    }
}));
