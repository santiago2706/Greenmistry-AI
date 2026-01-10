/**
 * GREEN CHEMISTRY COCKPIT - INDUSTRY CONSTANTS
 * Peruvian industries: Textile, Mining, Fishing
 */

export interface Industry {
    id: string;
    name: string;
    icon: string;
    description: string;
    commonProcesses: string[];
    keyChemicals: string[];
    mainChallenges: string[];
}

export const INDUSTRIES: Record<string, Industry> = {
    textile: {
        id: 'textile',
        name: 'Industria Textil',
        icon: 'shirt',
        description: 'Procesos de teñido, acabado y tratamiento de fibras textiles.',
        commonProcesses: [
            'Teñido de fibras',
            'Blanqueamiento',
            'Acabado químico',
            'Lavado industrial',
            'Estampado',
        ],
        keyChemicals: [
            'Colorantes azoicos',
            'Solventes clorados',
            'Tensoactivos',
            'Álcalis',
            'Fijadores',
        ],
        mainChallenges: [
            'Eliminación de colorantes tóxicos',
            'Reducción consumo de agua',
            'Tratamiento de efluentes',
            'Sustitución de SVHC',
        ],
    },
    mining: {
        id: 'mining',
        name: 'Industria Minera',
        icon: 'mountain',
        description: 'Procesos de extracción, flotación y refinación de minerales.',
        commonProcesses: [
            'Flotación de minerales',
            'Lixiviación',
            'Electroobtención',
            'Fundición',
            'Refinación',
        ],
        keyChemicals: [
            'Xantatos',
            'Cianuro',
            'Ácido sulfúrico',
            'Cal',
            'Colectores',
        ],
        mainChallenges: [
            'Reducción de cianuro',
            'Gestión de relaves',
            'Minimización de mercurio',
            'Eficiencia de flotación',
        ],
    },
    fishing: {
        id: 'fishing',
        name: 'Industria Pesquera',
        icon: 'fish',
        description: 'Procesamiento, conservación y producción de harina de pescado.',
        commonProcesses: [
            'Producción de harina',
            'Extracción de aceite',
            'Conservas',
            'Congelado',
            'Tratamiento de efluentes',
        ],
        keyChemicals: [
            'Antioxidantes',
            'Conservantes',
            'Desinfectantes',
            'Solventes de extracción',
            'Floculantes',
        ],
        mainChallenges: [
            'Control de olores',
            'Tratamiento de agua de cola',
            'Conservantes naturales',
            'Valorización de residuos',
        ],
    },
};

export const getIndustryById = (id: string): Industry | undefined => {
    return INDUSTRIES[id];
};

export const getAllIndustries = (): Industry[] => {
    return Object.values(INDUSTRIES);
};
