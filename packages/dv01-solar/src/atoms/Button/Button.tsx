import React from 'react';

import './Button.css'

export type ButtonProps = {
    primary?: boolean;
    secondary?: boolean;
    onClick?(): void;
    children: React.ReactNode;
    className?: string | string[];
}

export const Button = ({ children, className, onClick, primary, secondary }: ButtonProps) => {
    const buttonClassName = [
        'dv01-button',
        primary ? 'primary' : '',
        secondary ? 'secondary' : '',
        typeof className === 'string' ? className : (className || []).join(' ')
    ].join(' ');

    return (
        <button
            className={buttonClassName}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
