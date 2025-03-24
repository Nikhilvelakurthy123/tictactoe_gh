import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56"];

const PieCharts = ({ xWins, oWins, draws }) => {
  const data = [
    { name: "X Wins", value: xWins },
    { name: "O Wins", value: oWins },
    { name: "Draws", value: draws },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) =>
            `${name}: ${(percent * 100).toFixed(0)}%`
          }
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default PieCharts;
