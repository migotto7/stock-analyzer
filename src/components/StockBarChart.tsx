"use client"

import { AreaChart, Area, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { HistoricalDataPrice } from "@/type/HistoricalDataPrice";

interface StockBarChartProps {
    data: HistoricalDataPrice[];
}

export default function StockBarChart({ data }: StockBarChartProps) {
    const formattedData = data.map(item => {
        const date = new Date(item.date * 1000);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        return {
            date: `${day}/${month}`,
            min: item.low,
            max: item.high
        };
    });

    return (
        <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={formattedData}
                 margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
            >
                <XAxis dataKey="date" tick={{ fill: "#ccc", fontSize: 12 }}
                    stroke="#9ca3af" />
                <YAxis
                    width={50}
                    domain={['dataMin', 'dataMax']}
                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                />
                <Tooltip
                    contentStyle={{ backgroundColor: "#111827", border: "none", borderRadius: 8 }}
                    itemStyle={{ color: "#22d3ee", fontWeight: "bold" }}
                    labelStyle={{ color: "#fff", fontSize: 12 }}
                />
                <Legend wrapperStyle={{ color: "#ccc", fontSize: 12 }} />
                <Area type="monotone" dataKey="min" fill="#8884d8" name="Mínimo" />
                <Area type="monotone" dataKey="max" fill="#82ca9d" name="Máximo" />
            </AreaChart>
        </ResponsiveContainer>
    )
}