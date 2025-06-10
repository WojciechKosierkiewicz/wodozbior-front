import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkedAlt, FaTimesCircle } from "react-icons/fa";

import MapView      from "../components/MapView";
import SearchInput  from "../components/SearchInput";
import StationChart from "../components/StationChart";

import "../styles/home-page.scss";

function HomePage() {
  const [searchTerm,    setSearchTerm]    = useState("");
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [stations, setStations] = useState([]);

  const combinedPoints = useMemo(
    () =>
      stations.map((station) => ({
        id: station.id,
        name: station.name,
        lat: station.latitude,
        lon: station.longitude,
        waterLevel: station.waterLevel,
        color: "#0EA5E9",
      })),
    [stations]
  );

  const stationNames = useMemo(
    () => stations.map(s => s.name),
    [stations]
  );

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch('https://wody.nowaccy.cloud/api/hydrodata/stations/list');
        if (!response.ok) throw new Error('Failed to fetch stations');
        const data = await response.json();
        setStations(data);
      } catch (error) {
        console.error('Error fetching stations:', error);
      }
    };

    fetchStations();
  }, []);

  const suggestions = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return [];

    return stationNames.filter(name =>
      name.toLowerCase().includes(q)
    );
  }, [searchTerm, stationNames]);

  const handleSuggestion = (picked) => {
    setSearchTerm(picked);

    const foundStation = combinedPoints.find(
      (pt) => pt.name.toLowerCase() === picked.toLowerCase()
    );
    if (foundStation) {
      setSelectedPoint(foundStation);
    }
  };

  const clearFilter = () => {
    setSearchTerm("");
    setSelectedPoint(null);
  };

  return (
    <main className="home-container">
      <div className="main-container">
        <div className="left-panel">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Wyszukaj stacje"
            suggestions={suggestions}
            onSuggestionClick={handleSuggestion}
          />

          <div
            className="details-box"
            style={{ borderColor: selectedPoint?.color || "#c9c9e2" }}
          >
            {selectedPoint ? (
              <>
                <h2 className="selected-point-title">
                  Wybrany punkt:&nbsp;
                  <Link
                    to={`/station/${selectedPoint.id}`}
                    className="station-link"
                  >
                    {selectedPoint.name}
                  </Link>
                </h2>
                <p>Ostatni pomiar poziomu wody: {selectedPoint.waterLevel} cm</p>

                <div className="chart-toggle">
                  <button
                    className="active"
                  >
                    Poziom wody
                  </button>
                </div>

                <StationChart
                  selectedPoint={selectedPoint}
                  chartType="waterLevel"
                />
              </>
            ) : (
              <div className="no-selection">
                <>
                  <p>
                    Nie wybrano jeszcze punktu na mapie&nbsp;
                    <FaMapMarkedAlt size={24} color="#888" />
                  </p>
                  <small>Wybierz marker lub skorzystaj z wyszukiwarki</small>
                </>
              </div>
            )}
          </div>
        </div>

        <div className="map-panel">
          <MapView
            selectedPoint={selectedPoint}
            setSelectedPoint={setSelectedPoint}
          />

          <div className="legend">
            {[
              ["#00FF00","Niski poziom"],
              ["#FFFF00","Średni poziom"],
              ["#FF0000","Wysoki poziom"],
            ].map(([clr,txt])=>(
              <div className="legend-item" key={txt}>
                <span className="color-box" style={{backgroundColor:clr}} />
                {txt}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
