/**
 * GREEN CHEMISTRY COCKPIT - DEMO STORE
 * State management for Demo Mode
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface DemoState {
    // Demo mode status
    isDemoMode: boolean;
    toggleDemoMode: () => void;
    enableDemoMode: () => void;
    disableDemoMode: () => void;

    // Demo flow progress
    currentStep: number;
    totalSteps: number;
    nextStep: () => void;
    previousStep: () => void;
    goToStep: (step: number) => void;
    resetDemo: () => void;

    // Demo data selection
    selectedIndustry: 'textile' | 'mining' | 'fishing';
    setIndustry: (industry: 'textile' | 'mining' | 'fishing') => void;
}

export const useDemoStore = create<DemoState>()(
    devtools(
        (set) => ({
            // Demo mode
            isDemoMode: false,
            toggleDemoMode: () => set((state) => ({ isDemoMode: !state.isDemoMode })),
            enableDemoMode: () => set({ isDemoMode: true, currentStep: 0 }),
            disableDemoMode: () => set({ isDemoMode: false, currentStep: 0 }),

            // Demo flow
            currentStep: 0,
            totalSteps: 5,
            nextStep: () => set((state) => ({
                currentStep: Math.min(state.currentStep + 1, state.totalSteps - 1)
            })),
            previousStep: () => set((state) => ({
                currentStep: Math.max(state.currentStep - 1, 0)
            })),
            goToStep: (step) => set({ currentStep: step }),
            resetDemo: () => set({ currentStep: 0 }),

            // Industry
            selectedIndustry: 'textile',
            setIndustry: (industry) => set({ selectedIndustry: industry }),
        }),
        { name: 'DemoStore' }
    )
);
