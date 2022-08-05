import React from 'react';
import { AggregatedBalanceByGradeDataModel } from './constants';

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
                            {grade}
                        </div>
                    ))
                }
            </div>

            <div className="aggregate-balance-table__body">
                {
                    Object.values(data).map((balance, index) => (
                        <div key={index} className="aggregate-balance-table__body-row">
                            <div className="aggregate-balance-table__body-cell">
                                ${balance.toFixed(2)}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
