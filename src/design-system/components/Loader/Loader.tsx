/**
 * GREEN CHEMISTRY COCKPIT - LOADER COMPONENT
 * Loading spinner for async states
 */

import { HTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';
import styles from './Loader.module.css';

export interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
    size?: 'sm' | 'md' | 'lg';
    variant?: 'spinner' | 'dots' | 'pulse';
}

export const Loader = forwardRef<HTMLDivElement, LoaderProps>(
    ({ size = 'md', variant = 'spinner', className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={clsx(styles.loader, styles[size], styles[variant], className)}
                role="status"
                aria-label="Loading"
                {...props}
            >
                {variant === 'dots' && (
                    <>
                        <span className={styles.dot} />
                        <span className={styles.dot} />
                        <span className={styles.dot} />
                    </>
                )}
            </div>
        );
    }
);

Loader.displayName = 'Loader';
