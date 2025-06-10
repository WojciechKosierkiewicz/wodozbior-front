import React, { useState, useMemo, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/station-details-page.scss";
import StationChart from "../components/StationChart";
import MapView from "../components/MapView";

function StationDetailsPage() {
  const { id } = useParams();
  const [station, setStation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartType, setChartType] = useState("waterLevel");
  const [chartData, setChartData] = useState([]);
  const [hasTemperatureData, setHasTemperatureData] = useState(false);
  const [hasWaterFlowData, setHasWaterFlowData] = useState(false);
  const [rawChartData, setRawChartData] = useState(null);

  useEffect(() => {
    const fetchStationData = async () => {
      try {
        const response = await fetch(`https://wody.nowaccy.cloud/api/hydrodata/stations/${id}`);
        if (!response.ok) throw new Error('Failed to fetch station data');
        const stationData = await response.json();
        setStation(stationData);
        
        // Calculate date range for last month
        const endDate = new Date();
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);
        
        // Format dates as YYYY-MM-DD
        const formatDate = (date) => {
          return date.toISOString().split('T')[0];
        };

        const chartResponse = await fetch(
          `https://wody.nowaccy.cloud/api/hydrodata/stations/${id}/chart?startDate=${formatDate(startDate)}&endDate=${formatDate(endDate)}`
        );
        if (!chartResponse.ok) throw new Error('Failed to fetch chart data');
        const chartData = await chartResponse.json();
        
        // Store raw chart data
        setRawChartData(chartData);
        
        // Check if temperature and water flow data exists
        setHasTemperatureData(chartData.waterTemperature?.length > 0);
        
        // Check if water flow data exists and is not all zeros
        const hasValidWaterFlow = chartData.waterFlow?.length > 0 && 
          !chartData.waterFlow.every(entry => entry.value === 0);
        setHasWaterFlowData(hasValidWaterFlow);
        
        // Set initial chart data
        setChartData(chartData[chartType] || []);
      } catch (error) {
        console.error('Error fetching station data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStationData();
  }, [id]);

  // Update chart data when chart type changes
  useEffect(() => {
    if (rawChartData) {
      setChartData(rawChartData[chartType] || []);
    }
  }, [chartType, rawChartData]);

  if (loading) {
    return <div>Ładowanie...</div>;
  }

  if (!station) {
    return <div>Nie znaleziono stacji</div>;
  }

  const stationName = station.name || `Stacja ${id}`;
  const riverName = station.river || "Nieznana rzeka";
  const region = station.region || "Brak danych";

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

  const stationColor = "#0EA5E9"; // Default color

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
                  <strong>Zjawisko lodowe:</strong> {station.icePhenomenon === "0" ? "Brak" : station.icePhenomenon ?? "brak danych"}
                  <span className="date">{formatDate(station.icePhenomenonDate)}</span>
                </li>
                <li>
                  <strong>Roślinność:</strong> {station.overgrowthPhenomenon === "0" ? "Brak" : station.overgrowthPhenomenon ?? "brak danych"}
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
                {hasTemperatureData && (
                  <button
                    className={chartType === "waterTemperature" ? "active" : ""}
                    onClick={() => setChartType("waterTemperature")}
                  >
                    Temperatura
                  </button>
                )}
                {hasWaterFlowData && (
                  <button
                    className={chartType === "waterFlow" ? "active" : ""}
                    onClick={() => setChartType("waterFlow")}
                  >
                    Przepływ
                  </button>
                )}
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
