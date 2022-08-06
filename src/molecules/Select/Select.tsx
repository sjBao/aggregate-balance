import React, { useState, useEffect, useRef, ReactEventHandler } from 'react';
import './Select.css';

export type SelectOption = {
    name: string;
    value: string;
}

export type DV01SelectEvent = {
    name: string;
    selectedOption: SelectOption;
}

type SelectProps = {
    name: string;
    onChange(event: DV01SelectEvent): void;
    options: SelectOption[];
    value?: string;
}

const DEFAULT_SELECTION = { name: '', value: '' };

export const Select = ({ name, options, onChange, value }: SelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(-1);
    const valueRef = useRef(value);

    if (valueRef.current !== value) {
        valueRef.current = value;
        setSelectedOptionIndex(options.findIndex(option => option.value === value));
    }

    const toggleSelectOpen: React.MouseEventHandler<HTMLDivElement> = (e) => {
        e.nativeEvent.stopImmediatePropagation();
        setIsOpen((prevState) => !prevState);
    }

    const closeSelectMenu = () => {
        if (isOpen) setIsOpen(false);
    }

    const handleSelect: React.MouseEventHandler<HTMLDivElement> = (event) => {
        const { dataset: { index } } = event.target as HTMLDivElement;
        setSelectedOptionIndex(parseInt(index || "-1"));

        setIsOpen(false);
    }

    useEffect(() => {
        document.addEventListener('click', closeSelectMenu);
        return () => {
            document.removeEventListener('click', closeSelectMenu);
        }
    })

    useEffect(() => {
        const selectedOption = options[selectedOptionIndex];

        if (selectedOptionIndex > -1 && selectedOption) {
            onChange({ name, selectedOption });
        } else {
            value && onChange({ name, selectedOption: DEFAULT_SELECTION });
        }
    }, [selectedOptionIndex])

    const selectedOption = options[selectedOptionIndex];

    return (
        <div className={`dv01-select${isOpen ? ' open' : ''}`}>
            <div className="dv01-select__label" onClick={toggleSelectOpen}>
                {selectedOption ? selectedOption.name : 'Select...'}
                <i className='dv01-select__chevron'>
                    <svg width="1rem" height="1rem" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </i>
            </div>
            <div className="dv01-select__overlay">
                {
                    options.map((option, index) => (
                        <div
                            data-index={index}
                            className="dv01-select__option"
                            key={option.value}
                            onClick={handleSelect}
                        >
                            {option.name}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
