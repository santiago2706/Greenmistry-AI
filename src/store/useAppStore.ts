/**
 * GREEN CHEMISTRY COCKPIT - APP STORE
 * Global application state using Zustand
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { Toast } from '@core/types';

interface AppState {
    // Sidebar
    sidebarCollapsed: boolean;
    toggleSidebar: () => void;

    // Theme
    theme: 'dark' | 'light';
    toggleTheme: () => void;

    // Toasts
    toasts: Toast[];
    addToast: (toast: Omit<Toast, 'id'>) => void;
    removeToast: (id: string) => void;

    // Loading states
    globalLoading: boolean;
    setGlobalLoading: (loading: boolean) => void;
}

export const useAppStore = create<AppState>()(
    devtools(
        persist(
            (set) => ({
                // Sidebar
                sidebarCollapsed: false,
                toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

                // Theme
                theme: 'dark',
                toggleTheme: () => set((state) => ({
                    theme: state.theme === 'dark' ? 'light' : 'dark'
                })),

                // Toasts
                toasts: [],
                addToast: (toast) => set((state) => ({
                    toasts: [...state.toasts, { ...toast, id: crypto.randomUUID() }],
                })),
                removeToast: (id) => set((state) => ({
                    toasts: state.toasts.filter((t) => t.id !== id),
                })),

                // Loading
                globalLoading: false,
                setGlobalLoading: (loading) => set({ globalLoading: loading }),
            }),
            {
                name: 'green-cockpit-app',
                partialize: (state) => ({
                    sidebarCollapsed: state.sidebarCollapsed,
                    theme: state.theme,
                }),
            }
        ),
        { name: 'AppStore' }
    )
);
