/**
 * GREEN CHEMISTRY COCKPIT - API CLIENT
 * Axios instance with interceptors for enterprise API communication
 */

import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { API_CONFIG } from '@core/config/app.config';

// Create axios instance with base configuration
const apiClient: AxiosInstance = axios.create({
    baseURL: API_CONFIG.baseUrl,
    timeout: API_CONFIG.timeout,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor - Add auth token
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('auth_token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Response interceptor - Handle errors globally
apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        // Handle specific error codes
        if (error.response?.status === 401) {
            // Token expired - redirect to login
            localStorage.removeItem('auth_token');
            window.location.href = '/login';
        }

        if (error.response?.status === 403) {
            // Forbidden - insufficient permissions
            console.error('Access denied: Insufficient permissions');
        }

        if (error.response?.status === 500) {
            // Server error
            console.error('Server error occurred');
        }

        return Promise.reject(error);
    }
);

export { apiClient };
