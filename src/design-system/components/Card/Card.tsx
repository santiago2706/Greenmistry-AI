/**
 * GREEN CHEMISTRY COCKPIT - CARD COMPONENT
 * Versatile card container for content
 */

import { HTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';
import styles from './Card.module.css';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'elevated' | 'bordered' | 'glass';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    hover?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ children, variant = 'default', padding = 'md', hover = false, className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={clsx(
                    styles.card,
                    styles[variant],
                    styles[`padding-${padding}`],
                    hover && styles.hover,
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';

// Card Header
export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> { }

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
    ({ children, className, ...props }, ref) => (
        <div ref={ref} className={clsx(styles.header, className)} {...props}>
            {children}
        </div>
    )
);

CardHeader.displayName = 'CardHeader';

// Card Title
export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
    ({ children, as: Component = 'h3', className, ...props }, ref) => (
        <Component ref={ref} className={clsx(styles.title, className)} {...props}>
            {children}
        </Component>
    )
);

CardTitle.displayName = 'CardTitle';

// Card Content
export interface CardContentProps extends HTMLAttributes<HTMLDivElement> { }

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
    ({ children, className, ...props }, ref) => (
        <div ref={ref} className={clsx(styles.content, className)} {...props}>
            {children}
        </div>
    )
);

CardContent.displayName = 'CardContent';

// Card Footer
export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> { }

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
    ({ children, className, ...props }, ref) => (
        <div ref={ref} className={clsx(styles.footer, className)} {...props}>
            {children}
        </div>
    )
);

CardFooter.displayName = 'CardFooter';
