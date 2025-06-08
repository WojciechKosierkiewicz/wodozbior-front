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

function StationChart({ selectedPoint, chartType, customTitle, customColor, customUnit, customData }) {
  if (!selectedPoint && !customData) return null;

  const rawData = customData || (exampleApi.stationChart[chartType] || []);

  const chartData = rawData.map((entry) => {
    const parsedDate = new Date(entry.date);
    return {
      date: !isNaN(parsedDate.getTime())
        ? parsedDate.toLocaleDateString("pl-PL", {
            day: "numeric",
            month: "short",
          })
        : "–",
      value: entry.value,
    };
  });

  let title = customTitle || "";
  let unit  = customUnit  || "";
  let lastValue = "";

  if (!customData && rawData.length > 0) {
    switch (chartType) {
      case "waterLevel":
        title = "Poziom wody (cm)";
        unit = "cm";
        lastValue = rawData[rawData.length - 1].value + " cm";
        break;
      case "waterTemperature":
        title = "Temperatura wody (°C)";
        unit = "°C";
        lastValue = rawData[rawData.length - 1].value + " °C";
        break;
      case "waterFlow":
        title = "Przepływ wody (m³/s)";
        unit = "m³/s";
        lastValue = rawData[rawData.length - 1].value + " m³/s";
        break;
      default:
        title = "";
        lastValue = "";
    }
  } else if (customData?.length > 0) {
    lastValue = customData[customData.length - 1].value + ` ${unit}`;
  }

  return (
    <div className="chart-wrapper">
      <h3 className="chart-title">
        {title}
        {lastValue && (
          <span
            className="chart-badge"
            style={{ backgroundColor: customColor || selectedPoint?.color || "#0EA5E9" }}
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
