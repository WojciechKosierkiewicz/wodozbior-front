import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { exampleApi } from "../mockApidata";
import "../styles/station-chart.scss";

function StationChart({ selectedPoint, chartType }) {
  if (!selectedPoint) return null;

  const rawData = exampleApi.stationChart[chartType] || [];

  const chartData = rawData.map((entry) => ({
    date: new Date(entry.date).toLocaleDateString("pl-PL", {
      day: "numeric",
      month: "short",
    }),
    value: entry.value,
  }));

  let title = "";
  let unit = "";
  let lastValue = "";
  switch (chartType) {
    case "waterLevel":
      title = "Poziom wody (cm)";
      unit = "cm";
      lastValue =
        rawData.length > 0 ? rawData[rawData.length - 1].value + " cm" : "";
      break;
    case "waterTemperature":
      title = "Temperatura wody (°C)";
      unit = "°C";
      lastValue =
        rawData.length > 0 ? rawData[rawData.length - 1].value + " °C" : "";
      break;
    case "waterFlow":
      title = "Przepływ wody (m³/s)";
      unit = "m³/s";
      lastValue =
        rawData.length > 0 ? rawData[rawData.length - 1].value + " m³/s" : "";
      break;
    default:
      title = "";
      lastValue = "";
  }

  return (
    <div className="chart-wrapper">
      <h3 className="chart-title">
        {title}
        {lastValue && (
          <span
            className="chart-badge"
            style={{ backgroundColor: selectedPoint.color || "#0EA5E9" }}
          >
            {lastValue}
          </span>
        )}
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <XAxis dataKey="date" tick={{ fontSize: 12 }} interval={0} />
          <YAxis width={50} tick={{ fontSize: 12 }} />
          <Tooltip content={<CustomTooltip unit={unit} />} />
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

const CustomTooltip = ({ active, payload, label, unit }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">📅 {label}</p>
        <p className="value">📈 {payload[0].value} {unit}</p>
      </div>
    );
  }
  return null;
};

export default StationChart;
