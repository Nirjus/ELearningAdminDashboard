'use client'
import React from 'react'
import {Bar, BarChart, ResponsiveContainer, XAxis,YAxis, CartesianGrid, Legend, Tooltip} from "recharts";
import { Card } from '@/components/ui/card';

interface ChartProps{
    data:[{
        name: string;
        total: number;
    }]
}

const Chart = ({data}:ChartProps) => {
  return (
   <Card>
    <ResponsiveContainer width={"100%"} height={400}>
        <BarChart width={500} height={300} margin={{
            right:30
        }} data={data}>
            <CartesianGrid strokeDasharray={"3 3"} />
          <XAxis dataKey={"name"} stroke='#888888' fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke='#888888' fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
            <Tooltip />
            <Legend />
            <Bar dataKey={"total"} fill='#2563eb' radius={[4,4, 0, 0]} />
        </BarChart>
    </ResponsiveContainer>
   </Card>
  )
}

export default Chart