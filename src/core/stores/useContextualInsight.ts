import { create } from 'zustand';
import { knowledgeBase, InsightContent } from '../data/knowledgeBase';

interface InsightStore {
    activeInsight: InsightContent | null;
    isOpen: boolean;
    openInsight: (id: string) => void;
    closeInsight: () => void;
}

export const useContextualInsight = create<InsightStore>((set) => ({
    activeInsight: null,
    isOpen: false,
    openInsight: (id) => {
        const insight = knowledgeBase[id];
        if (insight) {
            set({ activeInsight: insight, isOpen: true });
        }
    },
    closeInsight: () => set({ isOpen: false }),
}));
