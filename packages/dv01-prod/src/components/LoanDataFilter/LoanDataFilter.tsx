import React from 'react';
import { LoanDataFilterKeys, LoanDataFilterTypes, LoanDataFilterState } from './constants';
import { Select, DV01SelectEvent } from 'dv01_solar/components';

import './LoanDataFilter.css';

type LoanDataFilterProps = {
    filters: LoanDataFilterTypes;
    handleFilterChange(arg: { name: string; value: string }): void;
    filterSelections: LoanDataFilterState;
}

export const LoanDataFilter = ({ filters, handleFilterChange, filterSelections }: LoanDataFilterProps) => {
    const handleChange = (selection: DV01SelectEvent) => {
        const { name, selectedOption } = selection;
        handleFilterChange({ name, value: selectedOption.value });
    }

    return (
        <div className="loan-data-filters">
            {
                Object.keys(filters).map((key) => (
                    <div key={key} className="loan-data-filters__select">
                        <Select
                            name={key}
                            value={filterSelections[key as LoanDataFilterKeys]}
                            onChange={handleChange}
                            options={(filters[key as LoanDataFilterKeys] || []).map(filterValue => ({
                                name: filterValue,
                                value: filterValue
                            }))}
                        />
                    </div>
                ))
            }
        </div>
    )
}
