import React from "react";
import { useParams, Link } from "react-router-dom";
import { exampleApi } from "../mockApidata";
import "../styles/station-details-page.scss";
import StationChart from "../components/StationChart";
import MapView from "../components/MapView";

function StationDetailsPage() {
  const { id } = useParams();

  const station = exampleApi.singleStation;

  const stationName = station?.name || `Stacja ${id}`;
  const riverName = station?.river || "Nieznana rzeka";
  const region = station?.region || "Brak danych";

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
                Rzeka: <strong>{riverName}</strong> &nbsp; Region: <strong>{region}</strong>
            </h2>

            <div className="stats"></div>

            <div className="overview">
                <div className="overview-chart box">
                    <div className="chart-toggle"></div>
                    <StationChart />
                </div>
                <div className="overview-map">
                    <MapView />
                </div>
            </div>
        </div>
      </div>
    </main>
  );
}

export default StationDetailsPage;
