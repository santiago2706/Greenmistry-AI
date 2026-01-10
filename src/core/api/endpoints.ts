/**
 * GREEN CHEMISTRY COCKPIT - API ENDPOINTS
 * Centralized endpoint definitions
 */

export const API_ENDPOINTS = {
    // Auth
    AUTH: {
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
        REFRESH: '/auth/refresh',
    },

    // Processes
    PROCESSES: {
        LIST: '/processes',
        GET: (id: string) => `/processes/${id}`,
        CREATE: '/processes',
        UPDATE: (id: string) => `/processes/${id}`,
        DELETE: (id: string) => `/processes/${id}`,
        ANALYZE: (id: string) => `/processes/${id}/analyze`,
    },

    // Chemicals
    CHEMICALS: {
        LIST: '/chemicals',
        GET: (id: string) => `/chemicals/${id}`,
        SEARCH: '/chemicals/search',
        ALTERNATIVES: (id: string) => `/chemicals/${id}/alternatives`,
    },

    // Optimization
    OPTIMIZATION: {
        CALCULATE: '/optimization/calculate',
        SUGGESTIONS: '/optimization/suggestions',
        COMPARE: '/optimization/compare',
    },

    // Regulatory
    REGULATORY: {
        CHECK: '/regulatory/check',
        SVHC: '/regulatory/svhc',
        COMPLIANCE: '/regulatory/compliance',
    },

    // Reports
    REPORTS: {
        GENERATE: '/reports/generate',
        DOWNLOAD: (id: string) => `/reports/${id}/download`,
    },
} as const;
