import React from 'react';
import { LoanDataFilterKeys, LoanDataFilterTypes } from './constants';
import { Select } from '../../molecules/Select';

import './LoanDataFilter.css';

type LoanDataFilterProps = {
    filters: LoanDataFilterTypes;
    handleFilterChange(arg: { name: string; value: string }): void;
}

export const LoanDataFilter = ({ filters, handleFilterChange }: LoanDataFilterProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        handleFilterChange({ name: event.target.name, value: event.target.value });
    }

    return (
        <div className="loan-data-filters">
            {
                Object.keys(filters).map((key) => (
                    <div key={key} className="loan-data-filters__select">
                        <Select options={(filters[key as LoanDataFilterKeys] || []).map(filterValue => ({
                            name: filterValue,
                            value: filterValue
                        }))} />
                    </div>
                ))
            }
        </div>
    )
}
