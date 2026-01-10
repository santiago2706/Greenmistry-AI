/**
 * GREEN CHEMISTRY COCKPIT - 12 PRINCIPLES OF GREEN CHEMISTRY
 * Core domain constants based on Paul Anastas & John Warner principles
 */

export interface GreenPrinciple {
    id: number;
    name: string;
    shortName: string;
    description: string;
    indicator: string;
}

export const GREEN_CHEMISTRY_PRINCIPLES: GreenPrinciple[] = [
    {
        id: 1,
        name: 'Prevención de Residuos',
        shortName: 'Prevención',
        description: 'Es mejor prevenir la formación de residuos que tratarlos o limpiarlos después.',
        indicator: 'Factor E',
    },
    {
        id: 2,
        name: 'Economía Atómica',
        shortName: 'Economía Atómica',
        description: 'Diseñar métodos sintéticos que maximicen la incorporación de todos los materiales usados.',
        indicator: '% Economía Atómica',
    },
    {
        id: 3,
        name: 'Síntesis Menos Peligrosa',
        shortName: 'Síntesis Segura',
        description: 'Usar y generar sustancias con poca o ninguna toxicidad para humanos y medio ambiente.',
        indicator: 'Índice de Toxicidad',
    },
    {
        id: 4,
        name: 'Diseño de Productos Seguros',
        shortName: 'Productos Seguros',
        description: 'Diseñar productos químicos que sean efectivos y minimicen la toxicidad.',
        indicator: 'Perfil de Seguridad',
    },
    {
        id: 5,
        name: 'Solventes y Auxiliares Seguros',
        shortName: 'Solventes Seguros',
        description: 'El uso de sustancias auxiliares debe minimizarse y ser inocuas cuando se usen.',
        indicator: 'Índice GSK Solventes',
    },
    {
        id: 6,
        name: 'Eficiencia Energética',
        shortName: 'Energía',
        description: 'Minimizar requisitos energéticos; métodos a temperatura y presión ambiente.',
        indicator: 'kWh/kg producto',
    },
    {
        id: 7,
        name: 'Uso de Materias Primas Renovables',
        shortName: 'Renovables',
        description: 'Las materias primas deben ser renovables en lugar de agotables.',
        indicator: '% Origen Renovable',
    },
    {
        id: 8,
        name: 'Reducción de Derivados',
        shortName: 'Sin Derivados',
        description: 'Evitar derivatización innecesaria (grupos protectores, modificaciones).',
        indicator: 'Pasos de Síntesis',
    },
    {
        id: 9,
        name: 'Catálisis',
        shortName: 'Catálisis',
        description: 'Los reactivos catalíticos son superiores a los estequiométricos.',
        indicator: 'TON/TOF',
    },
    {
        id: 10,
        name: 'Diseño para Degradación',
        shortName: 'Degradable',
        description: 'Diseñar productos que se degraden al final de su función útil.',
        indicator: 'Índice de Biodegradación',
    },
    {
        id: 11,
        name: 'Análisis en Tiempo Real',
        shortName: 'Monitoreo',
        description: 'Desarrollo de metodologías analíticas en tiempo real para prevenir formación de peligrosos.',
        indicator: 'Sensores PAT',
    },
    {
        id: 12,
        name: 'Química Inherentemente Segura',
        shortName: 'Seguridad',
        description: 'Minimizar potencial de accidentes químicos incluyendo explosiones, incendios y liberaciones.',
        indicator: 'Índice de Riesgo',
    },
];

export const getPrincipleById = (id: number): GreenPrinciple | undefined => {
    return GREEN_CHEMISTRY_PRINCIPLES.find((p) => p.id === id);
};

export const getPrinciplesByIds = (ids: number[]): GreenPrinciple[] => {
    return GREEN_CHEMISTRY_PRINCIPLES.filter((p) => ids.includes(p.id));
};
