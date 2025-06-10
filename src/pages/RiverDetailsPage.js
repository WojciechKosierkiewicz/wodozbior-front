import React, { useMemo, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import MapView from "../components/MapView";
import StationChart from "../components/StationChart";
import "../styles/river-details-page.scss";

export default function RiverDetailsPage() {
  const { riverName: encodedRiverName } = useParams();
  const riverName = decodeURIComponent(encodedRiverName).replace(/\-/g, " ");

  const [chartType, setChartType] = useState("waterLevel");
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStation, setSelectedStation] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [hasTemperatureData, setHasTemperatureData] = useState(false);
  const [hasWaterFlowData, setHasWaterFlowData] = useState(false);
  const [rawChartData, setRawChartData] = useState(null);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        // Fetch basic station list
        const response = await fetch(`https://śpiwory.nowaccy.cloud/api/hydrodata/stations/related?riverName=${encodeURIComponent(riverName)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch stations data');
        }
        const basicStations = await response.json();

        // Fetch detailed data for each station
        const detailedStations = await Promise.all(
          basicStations.map(async (station) => {
            try {
              const detailResponse = await fetch(`https://śpiwory.nowaccy.cloud/api/hydrodata/stations/${station.id}`);
              if (!detailResponse.ok) {
                return station; // Return basic station if detailed fetch fails
              }
              const detailData = await detailResponse.json();
              return {
                ...station,
                ...detailData,
                // Keep the original coordinates if they exist in basic data
                latitude: station.latitude || detailData.latitude,
                longitude: station.longitude || detailData.longitude
              };
            } catch (err) {
              console.error(`Failed to fetch details for station ${station.id}:`, err);
              return station;
            }
          })
        );

        setStations(detailedStations);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStations();
  }, [riverName]);

  // Fetch chart data when a station is selected
  useEffect(() => {
    const fetchChartData = async () => {
      if (!selectedStation) {
        setChartData([]);
        setRawChartData(null);
        setHasTemperatureData(false);
        setHasWaterFlowData(false);
        return;
      }

      try {
        // Calculate date range for last month
        const endDate = new Date();
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);
        
        // Format dates as YYYY-MM-DD
        const formatDate = (date) => {
          return date.toISOString().split('T')[0];
        };

        const chartResponse = await fetch(
          `https://śpiwory.nowaccy.cloud/api/hydrodata/stations/${selectedStation.id}/chart?startDate=${formatDate(startDate)}&endDate=${formatDate(endDate)}`
        );
        if (!chartResponse.ok) throw new Error('Failed to fetch chart data');
        const data = await chartResponse.json();
        
        // Store raw chart data
        setRawChartData(data);
        
        // Check if temperature and water flow data exists
        setHasTemperatureData(data.waterTemperature?.length > 0);
        
        // Check if water flow data exists and is not all zeros
        const hasValidWaterFlow = data.waterFlow?.length > 0 && 
          !data.waterFlow.every(entry => entry.value === 0);
        setHasWaterFlowData(hasValidWaterFlow);
        
        // Set initial chart data
        setChartData(data[chartType] || []);
      } catch (error) {
        console.error('Error fetching chart data:', error);
        setChartData([]);
      }
    };

    fetchChartData();
  }, [selectedStation]);

  // Update chart data when chart type changes
  useEffect(() => {
    if (rawChartData) {
      setChartData(rawChartData[chartType] || []);
    }
  }, [chartType, rawChartData]);

  const riverStations = useMemo(
    () => stations,
    [stations]
  );

  const latestValues = riverStations.map(s => s.waterLevel).filter(level => level !== null);
  const minLevel = latestValues.length ? Math.min(...latestValues) : 0;
  const maxLevel = latestValues.length ? Math.max(...latestValues) : 0;
  const avgLevel = latestValues.length ? Math.round(latestValues.reduce((a, b) => a + b, 0) / latestValues.length) : 0;

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

  if (loading) {
    return <div className="river-details-container">Loading...</div>;
  }

  if (error) {
    return <div className="river-details-container">Error: {error}</div>;
  }

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
                            customColor="#0EA5E9"
                            customUnit={unitMap[chartType]}
                            customData={chartData}
                        />
                    </div>
                    <div className="overview-map">
                        <MapView 
                            filterRiver={riverName} 
                            setSelectedPoint={(point) => {
                                if (point) {
                                    const station = stations.find(s => s.id === point.id);
                                    setSelectedStation(station);
                                } else {
                                    setSelectedStation(null);
                                }
                            }} 
                        />
                    </div>
                </div>

                <div className="stations-list">
                    <h2>Stacje pomiarowe</h2>
                    <div className="stations-cards">
                        {riverStations.map((s) => {
                            const value = chartType === "waterTemperature" 
                                ? s.waterTemperature 
                                : s.waterLevel;
                            const unit = chartType === "waterTemperature" ? "°C" : "cm";

                            return (
                            <Link to={`/station/${s.id}`} className="station-card" key={s.id}>
                                <h3>{s.name}</h3>
                                <div className="val" style={{ color: "#0EA5E9" }}>
                                {value !== null ? `${value} ${unit}` : "brak danych"}
                                </div>
                                {s.waterLevelDate && (
                                    <div className="date">
                                        Ostatni pomiar: {new Date(s.waterLevelDate).toLocaleString()}
                                    </div>
                                )}
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
