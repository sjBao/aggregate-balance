import React from 'react';
import { AggregatedBalanceByGradeDataModel } from './constants';

import './AggregateBalanceTable.css';
import { formatToUSD } from './helpers';

type AggregateBalanceTableProps = {
    data: AggregatedBalanceByGradeDataModel;
}

export const AggregateBalanceTable = ({
    data
}: AggregateBalanceTableProps) => {

    return (
        <div className='aggregate-balance-table'>
            <div className="aggregate-balance-table__head">
                {
                    Object.keys(data).map(grade => (
                        <div key={grade} className="aggregate-balance-table__head-cell">
                            Grade {grade}
                        </div>
                    ))
                }
            </div>

            <div className="aggregate-balance-table__body">
                <div className="aggregate-balance-table__body-row">
                    {
                        Object.values(data).map((balance, index) => (
                            <div key={index} className="aggregate-balance-table__body-cell">
                                {formatToUSD(balance)}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
