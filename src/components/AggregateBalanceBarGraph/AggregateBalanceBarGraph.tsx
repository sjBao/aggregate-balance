import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { AggregatedBalanceByGradeDataModel } from '../AggregateBalanceTable';

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
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" name="Grade" />
            </BarChart>
        </ResponsiveContainer>
    );
}
