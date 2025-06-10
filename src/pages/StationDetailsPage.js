import React, { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { exampleApi } from "../mockApidata";
import "../styles/station-details-page.scss";
import StationChart from "../components/StationChart";
import MapView from "../components/MapView";

function StationDetailsPage() {
  const { id } = useParams();
  const station = exampleApi.singleStation;

  const [chartType, setChartType] = useState("waterLevel");

  const stationName = station?.name || `Stacja ${id}`;
  const riverName = station?.river || "Nieznana rzeka";
  const region = station?.region || "Brak danych";

  const formatDate = (dateStr) => {
    if (!dateStr) return "brak daty";
    const date = new Date(dateStr);
    return date.toLocaleString("pl-PL", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const chartData = useMemo(() => {
    return exampleApi.stationChart[chartType]?.map((entry) => ({
      date: entry.date,
      value: entry.value
    })) || [];
  }, [chartType]);

  const unitMap = {
    waterLevel: "cm",
    waterTemperature: "°C",
    waterFlow: "m³/s"
  };

  const titleMap = {
    waterLevel: "Poziom wody (cm)",
    waterTemperature: "Temperatura wody (°C)",
    waterFlow: "Przepływ wody (m³/s)"
  };

const stationColor = useMemo(() => {
  const match = exampleApi.stations.find((s) => s.id === station.id);
  return match?.color || "#0EA5E9";
}, [station.id]);

  return (
    <main className="station-details-container">
      <div className="details-container">
        <div className="all-details">
          <nav className="breadcrumbs">
            <Link to="/">Mapa</Link> ›{" "}
            <Link to="/rivers">Rzeki</Link> ›{" "}
            <Link to={`/river/${riverName.toLowerCase()}`}>{riverName}</Link> ›{" "}
            <span>{stationName}</span>
          </nav>
          <h1 className="station-title">{stationName}</h1>
          <h2 className="station-subtitle">
            Rzeka: <strong>{riverName}</strong> &nbsp; Region:{" "}
            <strong>{region}</strong>
          </h2>

          <div className="station-layout">
            <section className="latest-measurements box">
              <h3>Ostatnie pomiary</h3>
              <ul>
                <li>
                  <strong>Poziom wody:</strong> {station.waterLevel ?? "brak danych"} cm
                  <span className="date">{formatDate(station.waterLevelDate)}</span>
                </li>
                <li>
                  <strong>Temperatura:</strong> {station.waterTemperature ?? "brak danych"} °C
                  <span className="date">{formatDate(station.waterTemperatureDate)}</span>
                </li>
                <li>
                  <strong>Przepływ:</strong> {station.waterFlow ?? "brak danych"} m³/s
                  <span className="date">{formatDate(station.waterFlowDate)}</span>
                </li>
                <li>
                  <strong>Zjawisko lodowe:</strong> {station.icePhenomenon ?? "brak danych"}
                  <span className="date">{formatDate(station.icePhenomenonDate)}</span>
                </li>
                <li>
                  <strong>Roślinność:</strong> {station.overgrowthPhenomenon ?? "brak danych"}
                  <span className="date">{formatDate(station.overgrowthPhenomenonDate)}</span>
                </li>
              </ul>
            </section>

            <div className="station-map">
              <MapView
                selectedPoint={{ lat: station.latitude, lon: station.longitude }}
                setSelectedPoint={() => {}}
              />
            </div>

            <div className="station-chart box">
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
                customColor={stationColor}
                customUnit={unitMap[chartType]}
                customData={chartData}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default StationDetailsPage;
