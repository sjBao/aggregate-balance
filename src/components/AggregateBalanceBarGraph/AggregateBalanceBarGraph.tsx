import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
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
        <BarChart
            width={500}
            height={300}
            data={barChartData}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="grade" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
        </BarChart>
    );
}
