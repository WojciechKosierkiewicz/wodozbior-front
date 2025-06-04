import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { exampleApi } from "../mockApidata";
import "../styles/station-chart.scss";

function StationChart({ selectedPoint }) {
  const chartData = exampleApi.stationChart.waterLevel.map((entry) => ({
    date: new Date(entry.date).toLocaleDateString("pl-PL", {
      day: "numeric",
      month: "short",
    }),
    value: entry.value,
  }));

  if (!selectedPoint) return null;

  return (
    <div className="chart-wrapper">
        <h3 className="chart-title">
            Poziom wody (cm)
            <span
                className="chart-badge"
                style={{ backgroundColor: selectedPoint.color || "#0EA5E9" }}
            >
                {selectedPoint.waterLevel} cm
            </span>
        </h3>
      <ResponsiveContainer width="100%" height={290}>
        <LineChart data={chartData}>
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis width={40} tick={{ fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#0EA5E9"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">📅 {label}</p>
        <p className="value">📈 {payload[0].value} cm</p>
      </div>
    );
  }
  return null;
};

export default StationChart;
