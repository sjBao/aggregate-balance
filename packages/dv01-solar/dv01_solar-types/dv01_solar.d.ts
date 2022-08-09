/// <reference types="react" />
declare module "dv01_solar/atoms/Button/Button" {
    import React from 'react';
    import './Button.css';
    export type ButtonProps = {
        primary?: boolean;
        secondary?: boolean;
        onClick?(): void;
        children: React.ReactNode;
        className?: string | string[];
    };
    export const Button: ({ children, className, onClick, primary, secondary }: ButtonProps) => JSX.Element;
}
declare module "dv01_solar/Button" {
    export * from "dv01_solar/atoms/Button/Button";
}
declare module "dv01_solar/molecules/Select/Select" {
    import './Select.css';
    export type SelectOption = {
        name: string;
        value: string;
    };
    export type DV01SelectEvent = {
        name: string;
        selectedOption: SelectOption;
    };
    type SelectProps = {
        name: string;
        onChange(event: DV01SelectEvent): void;
        options: SelectOption[];
        value?: string;
    };
    export const Select: ({ name, options, onChange, value }: SelectProps) => JSX.Element;
}
declare module "dv01_solar/Select" {
    export * from "dv01_solar/molecules/Select/Select";
}
