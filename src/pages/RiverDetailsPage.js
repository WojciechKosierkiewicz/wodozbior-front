import React, { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import MapView from "../components/MapView";
import StationChart from "../components/StationChart";
import { exampleApi } from "../mockApidata";
import "../styles/river-details-page.scss";

export default function RiverDetailsPage() {
  const { id } = useParams();
  const riverNameRaw = decodeURIComponent(id).replace(/\-/g, " ");
  const riverName = riverNameRaw.charAt(0).toUpperCase() + riverNameRaw.slice(1);

  const [chartType, setChartType] = useState("waterLevel");

  const enrichedStations = useMemo(() => {
    return exampleApi.stations.map((station) => {
        if (station.id === exampleApi.singleStation.id) {
        return {
            ...station,
            waterTemperature: exampleApi.singleStation.waterTemperature,
            waterFlow: exampleApi.singleStation.waterFlow
        };
        }
        return station;
    });
    }, []);

    const riverStations = useMemo(
  () => enrichedStations.filter(s => s.river.toLowerCase() === riverName.toLowerCase()),
  [enrichedStations, riverName]
);

  const chartData = useMemo(() => {
    return exampleApi.stationChart[chartType].map((entry) => {
      const values = riverStations.map(() =>
        entry?.value || 0
      );
      const avg = values.reduce((a, b) => a + b, 0) / values.length || 0;
      return {
        date: entry.date,
        value: Math.round(avg * 100) / 100
      };
    });
  }, [riverStations, chartType]);

  const latestValues = riverStations.map(s => s.waterLevel);
  const minLevel = Math.min(...latestValues);
  const maxLevel = Math.max(...latestValues);
  const avgLevel = Math.round(latestValues.reduce((a, b) => a + b, 0) / latestValues.length);

  const unitMap = {
    waterLevel: "cm",
    waterTemperature: "°C",
    waterFlow: "m³/s"
  };

  const titleMap = {
    waterLevel: "Średni poziom wody (cm)",
    waterTemperature: "Średnia temperatura wody (°C)",
    waterFlow: "Średni przepływ wody (m³/s)"
  };

  return (
    <main className="river-details-container">
        <div className="details-container">
            <div className="all-details">
                <nav className="breadcrumbs">
                    <Link to="/">Mapa</Link> › <Link to="/rivers">Rzeki</Link> › <span>{riverName}</span>
                </nav>
                <h1 className="river-title">{riverName}</h1>
                <ul className="stat-chips">
                    <li><strong>Stacje</strong><span>{riverStations.length}</span></li>
                    <li><strong>Śr. poziom</strong><span>{avgLevel} cm</span></li>
                    <li><strong>Min / Max</strong><span>{minLevel} / {maxLevel} cm</span></li>
                </ul>

                <div className="overview">
                    <div className="overview-chart box">
                        <div className="chart-toggle">
                            <button
                                className={chartType === "waterLevel" ? "active" : ""}
                                onClick={() => setChartType("waterLevel")}
                            >
                                Poziom wody
                            </button>
                            <button
                                className={chartType === "waterTemperature" ? "active" : ""}
                                onClick={() => setChartType("waterTemperature")}
                            >
                                Temperatura
                            </button>
                            <button
                                className={chartType === "waterFlow" ? "active" : ""}
                                onClick={() => setChartType("waterFlow")}
                            >
                                Przepływ
                            </button>
                        </div>

                        <StationChart
                            customTitle={titleMap[chartType]}
                            customColor="#0EA5E9"
                            customUnit={unitMap[chartType]}
                            customData={chartData}
                        />
                    </div>
                    <div className="overview-map">
                        <MapView filterRiver={riverName} setSelectedPoint={() => {}} />
                    </div>
                </div>

                <div className="stations-list">
                    <h2>Stacje pomiarowe</h2>
                    <div className="stations-cards">
                        {riverStations.map((s) => {
                            const value =
                            chartType === "waterTemperature"
                                ? s.waterTemperature
                                : chartType === "waterFlow"
                                ? s.waterFlow
                                : s.waterLevel;

                            const unit =
                            chartType === "waterTemperature" ? "°C" :
                            chartType === "waterFlow" ? "m³/s" : "cm";

                            return (
                            <Link to={`/station/${s.id}`} className="station-card" key={s.id}>
                                <h3>{s.name || `Stacja ${s.id}`}</h3>
                                <div className="val" style={{ color: s.color || "#0EA5E9" }}>
                                {value !== undefined ? `${value} ${unit}` : "brak danych"}
                                </div>
                            </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    </main>
  );
}
