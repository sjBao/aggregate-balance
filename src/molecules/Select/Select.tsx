import React, { MouseEventHandler, ReactEventHandler, useState } from 'react';
import './Select.css';

type SelectOption = {
    name: string;
    value: string;
}

type SelectProps = {
    options: SelectOption[];
}

export const Select = ({ options }: SelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(options[0]);

    const toggleSelectOpen = () => {
        setIsOpen((prevState) => !prevState);
    }

    const handleSelect: React.MouseEventHandler<HTMLDivElement> = (event) => {
        console.log(event.target);
    }

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
                    options.map(option => (
                        <div key={option.value} className="dv01-select__option" onClick={handleSelect}>
                            {option.name}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
