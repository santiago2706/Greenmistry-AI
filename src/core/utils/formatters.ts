/**
 * GREEN CHEMISTRY COCKPIT - FORMATTERS
 * Data formatting utilities
 */

/**
 * Format number with locale-specific separators
 */
export function formatNumber(value: number, decimals: number = 0): string {
    return new Intl.NumberFormat('es-PE', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    }).format(value);
}

/**
 * Format percentage
 */
export function formatPercent(value: number, decimals: number = 1): string {
    return `${formatNumber(value, decimals)}%`;
}

/**
 * Format score with visual indicator
 */
export function formatScore(value: number): string {
    return `${formatNumber(value, 1)}/100`;
}

/**
 * Format date to locale string
 */
export function formatDate(date: string | Date, format: 'short' | 'long' = 'short'): string {
    const d = typeof date === 'string' ? new Date(date) : date;

    if (format === 'long') {
        return new Intl.DateTimeFormat('es-PE', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(d);
    }

    return new Intl.DateTimeFormat('es-PE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(d);
}

/**
 * Format CAS number with dashes
 */
export function formatCASNumber(cas: string): string {
    // CAS format: XXXXXXX-XX-X
    const cleaned = cas.replace(/-/g, '');
    if (cleaned.length < 5) return cas;

    const checkDigit = cleaned.slice(-1);
    const middle = cleaned.slice(-3, -1);
    const rest = cleaned.slice(0, -3);

    return `${rest}-${middle}-${checkDigit}`;
}

/**
 * Format chemical formula with subscripts (for HTML)
 */
export function formatFormula(formula: string): string {
    return formula.replace(/(\d+)/g, '<sub>$1</sub>');
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength - 3)}...`;
}
