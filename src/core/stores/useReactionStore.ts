import { create } from 'zustand';

export interface Chemical {
    id: string;
    cas: string;
    name: string;
    hazard: 'low' | 'medium' | 'high';
    type: 'solvent' | 'reagent' | 'catalyst';
    role?: 'acid' | 'base' | 'reactant' | 'additive' | 'catalyst' | 'solvent';
    physicalState?: 'liquid' | 'solid' | 'gas';
    ghsClass?: 'flame' | 'skull' | 'corrosive' | 'bio';
    substituteId?: string;
    amount?: number; // In grams
    molecularWeight?: number; // g/mol
    lca: {
        carbonFootprint: number; // kg CO2e/kg
        waterUsage: number; // L/kg
        wasteFactor: number; // kg waste/kg product
    };
    regulatory: {
        reachStatus: 'compliant' | 'svhc' | 'restricted';
        isAnnexXVII: boolean;
        isOsherCompliant: boolean;
    };
}

export interface ProcessContext {
    name: string;
    lastModified: string;
    industry: string;
    overallStatus: 'nominal' | 'evaluation' | 'restricted';
}

interface ReactionStore {
    // Process Metadata
    processContext: ProcessContext;
    setProcessContext: (context: Partial<ProcessContext>) => void;

    // Core Data
    activeMixture: Chemical[];
    reactionTemp: number;
    reactionPH: number;
    mixingSpeed: number; // RPM
    pressure: number; // Bar
    hasProtocol: boolean;

    // Actions
    addToMixture: (chem: Chemical) => void;
    removeFromMixture: (id: string) => void;
    updateChemicalAmount: (id: string, amount: number) => void;
    clearMixture: () => void;
    setMixture: (mixture: Chemical[]) => void;
    processType: string;
    isConfirmed: boolean;
    setProcessType: (type: string) => void;
    setIsConfirmed: (confirmed: boolean) => void;
    setTemp: (temp: number) => void;
    setPH: (ph: number) => void;
    setMixingSpeed: (rpm: number) => void;
    setPressure: (bar: number) => void;
    setHasProtocol: (val: boolean) => void;
}

export const useReactionStore = create<ReactionStore>((set) => ({
    processContext: {
        name: 'Proceso de Síntesis Estándar',
        lastModified: new Date().toISOString(),
        industry: 'General',
        overallStatus: 'evaluation'
    },
    setProcessContext: (context) => set((state) => ({
        processContext: { ...state.processContext, ...context, lastModified: new Date().toISOString() }
    })),
    activeMixture: [],
    reactionTemp: 25,
    reactionPH: 7.0,
    mixingSpeed: 0,
    pressure: 1.0,
    processType: 'standard',
    isConfirmed: false,
    hasProtocol: false,
    addToMixture: (chem) => set((state) => ({
        activeMixture: state.activeMixture.length < 10 && !state.activeMixture.find(c => c.id === chem.id)
            ? [...state.activeMixture, { ...chem, amount: chem.amount || 100 }]
            : state.activeMixture
    })),
    removeFromMixture: (id) => set((state) => ({
        activeMixture: state.activeMixture.filter(c => c.id !== id)
    })),
    updateChemicalAmount: (id, amount) => set((state) => ({
        activeMixture: state.activeMixture.map(c => c.id === id ? { ...c, amount } : c)
    })),
    clearMixture: () => set({ activeMixture: [] }),
    setMixture: (mixture) => set({ activeMixture: mixture }),
    setTemp: (reactionTemp: number) => set({ reactionTemp }),
    setPH: (reactionPH: number) => set({ reactionPH }),
    setMixingSpeed: (mixingSpeed: number) => set({ mixingSpeed }),
    setPressure: (pressure: number) => set({ pressure }),
    setProcessType: (processType: string) => set({ processType }),
    setIsConfirmed: (isConfirmed: boolean) => set({ isConfirmed }),
    setHasProtocol: (hasProtocol: boolean) => set({ hasProtocol }),
}));
