/**
 * GREEN CHEMISTRY COCKPIT - BUTTON COMPONENT
 * Primary button component with variants
 */

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            variant = 'primary',
            size = 'md',
            isLoading = false,
            leftIcon,
            rightIcon,
            fullWidth = false,
            disabled,
            className,
            ...props
        },
        ref
    ) => {
        return (
            <button
                ref={ref}
                className={clsx(
                    styles.button,
                    styles[variant],
                    styles[size],
                    fullWidth && styles.fullWidth,
                    isLoading && styles.loading,
                    className
                )}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading && <span className={styles.spinner} />}
                {!isLoading && leftIcon && <span className={styles.icon}>{leftIcon}</span>}
                <span className={styles.label}>{children}</span>
                {!isLoading && rightIcon && <span className={styles.icon}>{rightIcon}</span>}
            </button>
        );
    }
);

Button.displayName = 'Button';
