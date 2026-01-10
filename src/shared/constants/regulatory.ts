/**
 * GREEN CHEMISTRY COCKPIT - REGULATORY CONSTANTS
 * SVHC, REACH, and regulatory compliance definitions
 */

// SVHC Categories based on ECHA
export const SVHC_CATEGORIES = {
    CMR: 'Carcinógeno, Mutagénico o Tóxico para la Reproducción',
    PBT: 'Persistente, Bioacumulativo y Tóxico',
    vPvB: 'Muy Persistente y Muy Bioacumulativo',
    ED: 'Disruptor Endocrino',
    RESP: 'Sensibilizante Respiratorio',
} as const;

export type SVHCCategory = keyof typeof SVHC_CATEGORIES;

// Regulatory frameworks
export const REGULATORY_FRAMEWORKS = {
    REACH: {
        name: 'REACH',
        fullName: 'Registration, Evaluation, Authorisation and Restriction of Chemicals',
        region: 'EU',
        website: 'https://echa.europa.eu/regulations/reach',
    },
    TSCA: {
        name: 'TSCA',
        fullName: 'Toxic Substances Control Act',
        region: 'USA',
        website: 'https://www.epa.gov/tsca-inventory',
    },
    PERU_MINAM: {
        name: 'MINAM',
        fullName: 'Ministerio del Ambiente - Perú',
        region: 'Peru',
        website: 'https://www.gob.pe/minam',
    },
    GHS: {
        name: 'GHS',
        fullName: 'Sistema Globalmente Armonizado',
        region: 'Global',
        website: 'https://unece.org/ghs',
    },
} as const;

// Compliance status indicators
export const COMPLIANCE_INDICATORS = {
    COMPLIANT: {
        label: 'Conforme',
        color: 'var(--color-status-compliant)',
        icon: 'check-circle',
    },
    WARNING: {
        label: 'Advertencia',
        color: 'var(--color-status-warning)',
        icon: 'alert-triangle',
    },
    NON_COMPLIANT: {
        label: 'No Conforme',
        color: 'var(--color-status-critical)',
        icon: 'x-circle',
    },
    UNKNOWN: {
        label: 'Sin Evaluar',
        color: 'var(--color-status-unknown)',
        icon: 'help-circle',
    },
} as const;

// GHS Hazard Classes
export const GHS_HAZARD_CLASSES = [
    'Explosivos',
    'Gases Inflamables',
    'Líquidos Inflamables',
    'Sólidos Inflamables',
    'Sustancias Oxidantes',
    'Peróxidos Orgánicos',
    'Toxicidad Aguda',
    'Corrosión Cutánea',
    'Daño Ocular Grave',
    'Sensibilización',
    'Mutagenicidad',
    'Carcinogenicidad',
    'Toxicidad Reproductiva',
    'Toxicidad Sistémica',
    'Peligro por Aspiración',
    'Peligro Acuático',
] as const;

export type GHSHazardClass = typeof GHS_HAZARD_CLASSES[number];

// Common SVHC substances for demo
export const COMMON_SVHC_SUBSTANCES = [
    { cas: '127-18-4', name: 'Tetracloroetileno', category: 'CMR' },
    { cas: '71-43-2', name: 'Benceno', category: 'CMR' },
    { cas: '67-66-3', name: 'Cloroformo', category: 'CMR' },
    { cas: '79-01-6', name: 'Tricloroetileno', category: 'CMR' },
    { cas: '117-81-7', name: 'DEHP (Ftalato)', category: 'CMR' },
    { cas: '7439-97-6', name: 'Mercurio', category: 'PBT' },
    { cas: '7440-43-9', name: 'Cadmio', category: 'CMR' },
    { cas: '18540-29-9', name: 'Cromo VI', category: 'CMR' },
] as const;
