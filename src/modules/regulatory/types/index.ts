/**
 * Regulatory Module - Types
 */
export interface ComplianceCheck {
    chemicalId: string;
    framework: string;
    status: 'compliant' | 'warning' | 'non-compliant';
    details: string;
}
