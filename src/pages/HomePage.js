import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";

import MapView      from "../components/MapView";
import SearchInput  from "../components/SearchInput";
import StationChart from "../components/StationChart";

import { exampleApi } from "../mockApidata";
import "../styles/home-page.scss";

function HomePage() {
  const [searchTerm,    setSearchTerm]    = useState("");
  const [selectedPoint, setSelectedPoint] = useState(null);

  const rivers   = useMemo(
    () => [...new Set(exampleApi.stations.map(s => s.river))],
    []
  );

  const stations = useMemo(
    () => exampleApi.stations.map(
      s => s.name?.trim() || `Stacja ${s.id}`
    ),
    []
  );

  const suggestions = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return [];

    const riversMatch = rivers.filter(r => r.toLowerCase().startsWith(q));

    const stationsOnMatchedRivers = exampleApi.stations
      .filter(s => riversMatch.includes(s.river))
      .map(s => s.name?.trim() || `Stacja ${s.id}`);

    const stationsMatch = stations.filter(name =>
      name.toLowerCase().includes(q)
    );

    return [...new Set([
      ...riversMatch,
      ...stationsOnMatchedRivers,
      ...stationsMatch
    ])];
  }, [searchTerm, rivers, stations]);

  const handleSuggestion = picked => {
    setSearchTerm(picked);
  };

  return (
    <main className="home-container">
      <div className="main-container">
        <div className="left-panel">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Wyszukaj rzeki / stacje"
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
                <p>Rzeka: {selectedPoint.river}</p>
                <p>Ostatni pomiar: {selectedPoint.waterLevel} cm</p>
                <StationChart selectedPoint={selectedPoint} />
              </>
            ) : (
              <div className="no-selection">
                <p>Nie wybrano jeszcze punktu na mapie&nbsp;🗺️</p>
                <small>Wybierz marker lub skorzystaj z wyszukiwarki</small>
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
