/**
 * GREEN CHEMISTRY COCKPIT - VALIDATORS
 * Input validation utilities
 */

/**
 * Validate CAS number format
 */
export function isValidCASNumber(cas: string): boolean {
    // CAS format: up to 10 digits with 2 dashes (XXXXXXX-XX-X)
    const pattern = /^\d{2,7}-\d{2}-\d$/;
    if (!pattern.test(cas)) return false;

    // Validate check digit
    const digits = cas.replace(/-/g, '');
    const checkDigit = parseInt(digits.slice(-1), 10);
    const mainDigits = digits.slice(0, -1).split('').reverse();

    const sum = mainDigits.reduce((acc, digit, index) => {
        return acc + parseInt(digit, 10) * (index + 1);
    }, 0);

    return sum % 10 === checkDigit;
}

/**
 * Validate chemical formula basic format
 */
export function isValidFormula(formula: string): boolean {
    // Basic validation: letters and numbers, starts with uppercase
    const pattern = /^[A-Z][a-zA-Z0-9()]*$/;
    return pattern.test(formula);
}

/**
 * Validate score is in valid range
 */
export function isValidScore(score: number): boolean {
    return score >= 0 && score <= 100;
}

/**
 * Validate percentage is in valid range
 */
export function isValidPercentage(value: number): boolean {
    return value >= 0 && value <= 100;
}

/**
 * Validate required string field
 */
export function isNonEmptyString(value: unknown): value is string {
    return typeof value === 'string' && value.trim().length > 0;
}

/**
 * Validate positive number
 */
export function isPositiveNumber(value: unknown): value is number {
    return typeof value === 'number' && value > 0 && !isNaN(value);
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}
