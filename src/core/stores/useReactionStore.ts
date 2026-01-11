import { create } from 'zustand';

export interface Chemical {
    id: string;
    cas: string;
    name: string;
    hazard: 'low' | 'medium' | 'high';
    type: 'solvent' | 'reagent' | 'catalyst';
    ghsClass?: 'flame' | 'skull' | 'corrosive' | 'bio';
    substituteId?: string;
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

interface ReactionStore {
    activeMixture: Chemical[];
    reactionTemp: number;
    reactionPH: number;
    hasProtocol: boolean;
    addToMixture: (chem: Chemical) => void;
    removeFromMixture: (id: string) => void;
    clearMixture: () => void;
    setMixture: (mixture: Chemical[]) => void;
    setTemp: (temp: number) => void;
    setPH: (ph: number) => void;
    setHasProtocol: (val: boolean) => void;
}

export const useReactionStore = create<ReactionStore>((set) => ({
    activeMixture: [],
    reactionTemp: 25,
    reactionPH: 7.0,
    hasProtocol: false,
    addToMixture: (chem) => set((state) => ({
        activeMixture: state.activeMixture.length < 10 && !state.activeMixture.find(c => c.id === chem.id)
            ? [...state.activeMixture, chem]
            : state.activeMixture
    })),
    removeFromMixture: (id) => set((state) => ({
        activeMixture: state.activeMixture.filter(c => c.id !== id)
    })),
    clearMixture: () => set({ activeMixture: [] }),
    setMixture: (mixture) => set({ activeMixture: mixture }),
    setTemp: (reactionTemp) => set({ reactionTemp }),
    setPH: (reactionPH) => set({ reactionPH }),
    setHasProtocol: (hasProtocol) => set({ hasProtocol }),
}));
