/**
 * GREEN CHEMISTRY COCKPIT - BADGE COMPONENT
 * Status and label badges
 */

import { HTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';
import styles from './Badge.module.css';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'outline';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
    size?: BadgeSize;
    dot?: boolean;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
    ({ children, variant = 'default', size = 'md', dot = false, className, ...props }, ref) => {
        return (
            <span
                ref={ref}
                className={clsx(styles.badge, styles[variant], styles[size], dot && styles.withDot, className)}
                {...props}
            >
                {dot && <span className={styles.dot} />}
                {children}
            </span>
        );
    }
);

Badge.displayName = 'Badge';
