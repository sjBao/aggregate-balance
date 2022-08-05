import React from 'react';
import { LoanDataFilterKeys, LoanDataFilterTypes } from './constants';

type LoanDataFilterProps = {
    filters: LoanDataFilterTypes;
    handleFilterChange(arg: { name: string; value: string }): void;
}

export const LoanDataFilter = ({ filters, handleFilterChange }: LoanDataFilterProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.name, event.target.value);
        handleFilterChange({ name: event.target.name, value: event.target.value });
    }


    return (
        <div className="loan-data-filters">
            {
                Object.keys(filters).map((key) => (
                    <div key={key} className="loan-data-filters__select">
                        <select name={key} onChange={handleChange}>
                            {
                                (filters[key as LoanDataFilterKeys] || []).map(value => (
                                    <option key={value} value={value}>{value}</option>
                                ))
                            }
                        </select>
                    </div>
                ))
            }
        </div>
    )
}
