export interface InsightContent {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    technicalData: {
        label: string;
        value: string;
        type: 'number' | 'text' | 'code' | 'hazard';
    }[];
    scientificContext: string;
    recommendation: string;
}

export const knowledgeBase: Record<string, InsightContent> = {
    'score-global': {
        id: 'score-global',
        title: 'Métrica de Economía Atómica',
        subtitle: 'Cálculo de Eficiencia de Reacción',
        description: 'El score global evalúa la eficiencia con la que los átomos de los reactivos se incorporan en el producto final.',
        technicalData: [
            { label: 'E-Factor Objetivo', value: '< 5.0', type: 'number' },
            { label: 'Algoritmo', value: '(MW Prod / Σ MW React) * 100', type: 'code' },
            { label: 'Certificación', value: 'ISO 14001:2015', type: 'text' }
        ],
        scientificContext: 'La economía atómica es un concepto fundamental propuesto por Barry Trost. A diferencia del rendimiento tradicional, esta métrica cuantifica el desperdicio generado a nivel molecular.',
        recommendation: 'Aumentar el uso de catalizadores selectivos para reducir subproductos no deseados.'
    },
    'solvent-halogenated': {
        id: 'solvent-halogenated',
        title: 'Perfil: Solventes Halogenados',
        subtitle: 'Riesgo Químico y Persistencia',
        description: 'Compuestos como el Diclorometano (DCM) y Cloroformo presentan altos riesgos por su volatilidad y persistencia ambiental.',
        technicalData: [
            { label: 'Punto de Ebullición', value: '39.6 °C', type: 'number' },
            { label: 'Impacto Ozono', value: 'Alto (VOC)', type: 'hazard' },
            { label: 'Clasificación GHS', value: 'H351 (Carc. 2)', type: 'text' }
        ],
        scientificContext: 'Los solventes halogenados son excelentes para extracciones pero su enlace C-Cl es extremadamente estable, lo que dificulta su biodegradación en mantos acuíferos.',
        recommendation: 'Sustituir por Carbonato de Dimetilo o Etanol Bio-basado.'
    },
    'reach-regulation': {
        id: 'reach-regulation',
        title: 'Marco Normativo REACH',
        subtitle: 'Registration, Evaluation, Authorisation of Chemicals',
        description: 'Regulación de la Unión Europea que busca asegurar un alto nivel de protección a la salud humana y al medio ambiente.',
        technicalData: [
            { label: 'Anexo XVII', value: 'Restricciones', type: 'text' },
            { label: 'Sustancias SVHC', value: '233 detectadas', type: 'number' },
            { label: 'Estado', value: 'Mandatorio EU', type: 'text' }
        ],
        scientificContext: 'El principio de precaución dicta que si una sustancia tiene efectos potencialmente peligrosos, se deben tomar medidas de gestión de riesgos incluso si no hay certeza científica completa.',
        recommendation: 'Asegurar que todas las sustancias cuenten con registro actualizado antes de 2026.'
    },
    'reagent-a': {
        id: 'reagent-a',
        title: 'Perfil: Reactivo Orgánico A',
        subtitle: 'Precursor de Reacción',
        description: 'Sustancia intermedia utilizada en la síntesis de polímeros. Presenta toxicidad aguda en organismos acuáticos.',
        technicalData: [
            { label: 'Densidad', value: '1.32 g/cm³', type: 'number' },
            { label: 'Reactividad', value: 'Inestable > 50°C', type: 'hazard' },
            { label: 'LD50 (oral)', value: '550 mg/kg', type: 'number' }
        ],
        scientificContext: 'El reactivo A utiliza grupos salientes halogenados que, tras la reacción, se convierten en sales que aumentan el Factor E (waste) del proceso global.',
        recommendation: 'Explorar rutas sintéticas que utilicen hidrogenación catalítica para evitar este reactivo.'
    },
    'principle-1': {
        id: 'principle-1',
        title: 'Principio #1: Prevención',
        subtitle: 'Green Chemistry Fundamentals',
        description: 'Es mejor prevenir la formación de residuos que tratar o limpiar los residuos después de que se hayan formado.',
        technicalData: [
            { label: 'Unidad de Medida', value: 'kg Residuo / kg Prod', type: 'number' },
            { label: 'Prioridad', value: 'Nivel 0 (Source)', type: 'text' },
            { label: 'Impacto', value: 'Reducción de Costos', type: 'text' }
        ],
        scientificContext: 'La prevención es el pilar más rentable de la química verde. Evitar la generación de subproductos innecesarios reduce la carga en plantas de tratamiento y minimiza la huella de carbono logística.',
        recommendation: 'Rediseñar la ruta sintética para que todos los subproductos sean reutilizables en el mismo ciclo.'
    },
    'principle-2': {
        id: 'principle-2',
        title: 'Principio #2: Economía Atómica',
        subtitle: 'Maximización de Masa',
        description: 'Los métodos sintéticos deben diseñarse para maximizar la incorporación de todos los materiales utilizados en el proceso en el producto final.',
        technicalData: [
            { label: 'Ideal', value: '100% de incorporación', type: 'number' },
            { label: 'Métrica Relacionada', value: 'Rendimiento Global', type: 'text' },
            { label: 'Ejemplo Clave', value: 'Reacciones de Adición', type: 'text' }
        ],
        scientificContext: 'Métrica introducida para evaluar la eficiencia de una reacción desde un punto de vista de sostenibilidad, no solo de rendimiento porcentual.',
        recommendation: 'Priorizar reacciones de adición y reordenamiento sobre reacciones de sustitución o eliminación.'
    },
    'lca-analysis': {
        id: 'lca-analysis',
        title: 'Análisis de Ciclo de Vida (LCA)',
        subtitle: 'Metodología Cradle-to-Grave',
        description: 'Evaluación sistemática de los impactos ambientales asociados a todas las etapas de la vida de un producto químico.',
        technicalData: [
            { label: 'CO2 eq', value: '4.5 kg/kg prod', type: 'number' },
            { label: 'Acidificación', value: '0.02 mol H+ eq', type: 'number' },
            { label: 'Norma', value: 'ISO 14040/14044', type: 'text' }
        ],
        scientificContext: 'El LCA permite identificar los "hotspots" ambientales en la síntesis, como el consumo energético excesivo en la destilación o la alta huella de carbono de reactivos importados.',
        recommendation: 'Implementar procesos de recirculación de calor para reducir el impacto en la categoría de calentamiento global.'
    },
    'chemical-toluene': {
        id: 'chemical-toluene',
        title: 'Perfil: Tolueno',
        subtitle: 'Solvente Aromático (Neurotóxico)',
        description: 'Ampliamente utilizado pero con graves restricciones por su impacto en el sistema nervioso central y toxicidad acuática.',
        technicalData: [
            { label: 'Volatilidad', value: 'Alta (VOC)', type: 'hazard' },
            { label: 'Presión Vapor', value: '3.8 kPa', type: 'number' },
            { label: 'Threshold', value: '20 ppm', type: 'text' }
        ],
        scientificContext: 'El tolueno es un derivado del benceno que, aunque menos cancerígeno, sigue presentando una persistencia significativa en suelos y es un precursor de ozono troposférico.',
        recommendation: 'Sustituir por Carbonato de Dimetilo o sistemas supercríticos.'
    },
    'chemical-cyrene': {
        id: 'chemical-cyrene',
        title: 'Perfil: Cyrene™',
        subtitle: 'Solvente Bio-basado Premium',
        description: 'Derivado de la celulosa (biomasa), no tóxico y biodegradable. Diseñado para reemplazar solventes dipolares apróticos.',
        technicalData: [
            { label: 'Origen', value: 'Celulosa', type: 'text' },
            { label: 'Biodegradable', value: '100% (OECD)', type: 'text' },
            { label: 'Flash Point', value: '108 °C', type: 'number' }
        ],
        scientificContext: 'Cyrene no contiene nitrógeno ni azufre, eliminando la formación de óxidos tóxicos durante su incineración o degradación.',
        recommendation: 'Ideal para reacciones de acoplamiento de Heck y síntesis de péptidos.'
    }
};
