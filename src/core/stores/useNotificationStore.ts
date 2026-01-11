import { create } from 'zustand';

export type NotificationType = 'success' | 'alert' | 'system' | 'compliance';

export interface SystemEvent {
    id: string;
    message: string;
    description?: string;
    type: NotificationType;
    timestamp: Date;
}

interface NotificationStore {
    events: SystemEvent[];
    notify: (message: string, type: NotificationType, description?: string) => void;
    dismiss: (id: string) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
    events: [],
    notify: (message, type, description) => {
        const id = Math.random().toString(36).substring(7);
        const newEvent: SystemEvent = {
            id,
            message,
            description,
            type,
            timestamp: new Date(),
        };

        set((state) => ({
            events: [...state.events, newEvent]
        }));

        // Auto-dismiss after 6 seconds for industrial immersion (long enough to read)
        setTimeout(() => {
            set((state) => ({
                events: state.events.filter((e) => e.id !== id)
            }));
        }, 6000);
    },
    dismiss: (id) => set((state) => ({
        events: state.events.filter((e) => e.id !== id)
    })),
}));
