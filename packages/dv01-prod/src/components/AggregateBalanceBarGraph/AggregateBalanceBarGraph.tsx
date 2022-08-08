import React from 'react';

import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from 'recharts';
import { AggregatedBalanceByGradeDataModel, formatToUSD } from '../AggregateBalanceTable';

import './AggregateBalanceBarGraph.css';

type AggregateBalanceBarGraphProps = {
    data: AggregatedBalanceByGradeDataModel;
}

const convertDataToChartData = (data: AggregatedBalanceByGradeDataModel) => {
    return Object.keys(data).map(grade => ({
        grade,
        value: data[grade].toFixed(2)
    }));
}

export const AggregateBalanceBarGraph = ({ data }: AggregateBalanceBarGraphProps) => {

    const barChartData = convertDataToChartData(data);

    return (
        Object.keys(data).length ? (
            <ResponsiveContainer width={"100%"} height={600}>
                <BarChart
                    width={500}
                    height={300}
                    data={barChartData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 30,
                        bottom: 5,
                    }}
                >
                    <XAxis dataKey="grade" />
                    <YAxis tickFormatter={(totalBalance) => `$${totalBalance}`} />
                    <Tooltip content={AggregateBalanceTooltip} />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" name="Grade" />
                </BarChart>
            </ResponsiveContainer>
        ) : (
            <div className="aggregate-balance-bar-graph__no-data">
                No data...
            </div>
        )
    );
}

const AggregateBalanceTooltip = ({ payload }: any) => {
    if (payload && payload.length) {
        const value = payload[0].payload.value || '';
        const grade = payload[0].payload.grade || '';
        return (
            <div className="aggregate-balance-bar-graph__tooltip">
                <p className='aggregate-balance-bar-graph__tooltip-grade'>Grade: {grade}</p>
                <p className='aggregate-balance-bar-graph__tooltip-value'>{formatToUSD(value)}</p>
            </div>
        );
    } else {
        return null;
    }

    
}
