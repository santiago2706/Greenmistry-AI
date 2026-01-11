export interface Chemical {
    id: string;
    name: string;
    casNumber: string;
    role: 'solvent' | 'catalyst' | 'reagent' | 'surfactant' | 'other';
    properties: {
        toxicity: number; // 0-10 (10 is high toxicity)
        flammability: number;
        bioaccumulative: boolean;
        renewable: boolean;
    };
    efficiency: {
        atomicWeight: number;
        atomEconomy: number; // Percentage
    };
    principlesViolated: number[]; // IDs of the 12 principles
    costPerKg: number;
}

export interface Process {
    id: string;
    name: string;
    industry: 'textil' | 'minería' | 'pesquera';
    description: string;
    chemicals: Chemical[];
    outputProduct: string;
    targetYield: number;
}

export interface AnalysisResult {
    totalScore: number;
    toxicityScore: number;
    efficiencyScore: number;
    principlesCompliance: { [key: number]: boolean }; // Principle ID -> Compliance boolean
    regulatoryRisk: 'low' | 'moderate' | 'high';
}

export interface SubstitutionOption {
    originalChemicalId: string;
    substitute: Chemical;
    reductionInToxicity: number;
    improvementInEfficiency: number;
}
