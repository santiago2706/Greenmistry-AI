import { useState, useEffect } from 'react';

export type RiskLevel = 'green' | 'yellow' | 'red';

export interface DemoState {
    score: number;
    riskLevel: RiskLevel;
    optimizations: string[];
    lastMessage: string;
    isOptimized: boolean;
}

const DEFAULT_STATE: DemoState = {
    score: 42,
    riskLevel: 'red',
    optimizations: [],
    lastMessage: 'Proceso evaluado en estado base. Riesgo crítico detectado.',
    isOptimized: false
};

export function useDemoState() {
    const [state, setState] = useState<DemoState>(() => {
        const saved = localStorage.getItem('green_cockpit_demo_state');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                return DEFAULT_STATE;
            }
        }
        return DEFAULT_STATE;
    });

    useEffect(() => {
        localStorage.setItem('green_cockpit_demo_state', JSON.stringify(state));
    }, [state]);

    const applyOptimization = (type: 'solvent' | 'energy' | 'waste') => {
        const newState = { ...state };

        if (type === 'solvent') {
            newState.score = Math.min(newState.score + 25, 95);
            newState.riskLevel = 'yellow';
            newState.optimizations.push('Sustitución de Solventes Halogenados');
            newState.lastMessage = 'Mejora en Score por reducción de VOCs y toxicidad acuática.';
        } else if (type === 'energy') {
            newState.score = Math.min(newState.score + 15, 95);
            newState.lastMessage = 'Optimización energética aplicada: Reducción de huella de carbono.';
        }

        newState.isOptimized = true;
        setState(newState);
    };

    const resetDemo = () => {
        setState(DEFAULT_STATE);
        localStorage.removeItem('process_optimized');
    };

    const setPreset = (preset: 'initial' | 'optimized' | 'compliance') => {
        if (preset === 'initial') resetDemo();
        if (preset === 'optimized') {
            setState({
                score: 78,
                riskLevel: 'yellow',
                optimizations: ['Sustitución química avanzada'],
                lastMessage: 'Optimización parcial realizada. Pendiente revisión regulatoria.',
                isOptimized: true
            });
        }
        if (preset === 'compliance') {
            setState({
                score: 92,
                riskLevel: 'green',
                optimizations: ['Sustitución química', 'Eficiencia energética', 'Cero residuos'],
                lastMessage: 'Proceso validado. Cumplimiento total con normativas REACH/EPA.',
                isOptimized: true
            });
        }
    };

    return {
        ...state,
        applyOptimization,
        resetDemo,
        setPreset
    };
}
