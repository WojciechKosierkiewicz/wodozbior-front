import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkedAlt, FaTimesCircle } from "react-icons/fa";

import MapView      from "../components/MapView";
import SearchInput  from "../components/SearchInput";
import StationChart from "../components/StationChart";

import { exampleApi } from "../mockApidata";
import "../styles/home-page.scss";

function HomePage() {
  const [searchTerm,    setSearchTerm]    = useState("");
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [filterRiver,   setFilterRiver]   = useState(null);
  const [chartType,     setChartType]     = useState("waterLevel");

  const combinedPoints = useMemo(
    () =>
      exampleApi.stations.map((station) => ({
        id: station.id,
        name: station.name?.trim() || `Stacja ${station.id}`,
        river: station.river,
        lat: station.latitude,
        lon: station.longitude,
        waterLevel: station.waterLevel,
        color: station.color || "#0EA5E9",
      })),
    []
  );

  const rivers   = useMemo(
    () => [...new Set(exampleApi.stations.map(s => s.river))],
    []
  );

  const stations = useMemo(
    () => exampleApi.stations.map(
      s => s.name?.trim() || `Stacja ${s.id}`),
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

  const handleSuggestion = (picked) => {
    setSearchTerm(picked);

    const foundStation = combinedPoints.find(
      (pt) => pt.name.toLowerCase() === picked.toLowerCase()
    );
    if (foundStation) {
      setSelectedPoint(foundStation);
      setFilterRiver(null);
      return;
    }

    const isRiver = rivers.some(
      (r) => r.toLowerCase() === picked.toLowerCase()
    );
    if (isRiver) {
      setFilterRiver(picked);
      setSelectedPoint(null);
      return;
    }
  };

  const clearFilter = () => {
    setFilterRiver(null);
    setSearchTerm("");
    setSelectedPoint(null);
  };

  const riverSlug = (riverName) =>
    encodeURIComponent(riverName.toLowerCase().replace(/\s+/g, "-"));

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
                <p>
                  Rzeka:{" "}
                  <Link
                    to={`/river/${riverSlug(selectedPoint.river)}`}
                    className="river-link"
                  >
                    {selectedPoint.river}
                  </Link>
                </p>
                <p>Ostatni pomiar poziomu wody: {selectedPoint.waterLevel} cm</p>

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
                  selectedPoint={selectedPoint}
                  chartType={chartType}
                />
                {filterRiver && (
                  <button
                    className="clear-filter-btn"
                    onClick={clearFilter}
                  >
                    <FaTimesCircle size={14} />&nbsp;Wyczyść filtr
                  </button>
                )}
              </>
            ) : (
              <div className="no-selection">
                {filterRiver ? (
                  <>
                    <p>
                      Filtruję stacje dla rzeki:&nbsp;
                      <Link
                        to={`/river/${riverSlug(filterRiver)}`}
                        className="river-link"
                      >
                        {filterRiver}
                      </Link>
                    </p>
                    <button
                      className="clear-filter-btn"
                      onClick={clearFilter}
                    >
                      <FaTimesCircle size={14} />&nbsp;Wyczyść filtr
                    </button>
                  </>
                ) : (
                  <>
                    <p>
                      Nie wybrano jeszcze punktu na mapie&nbsp;
                      <FaMapMarkedAlt size={24} color="#888" />
                    </p>
                    <small>Wybierz marker lub skorzystaj z wyszukiwarki</small>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="map-panel">
          <MapView
            selectedPoint={selectedPoint}
            setSelectedPoint={setSelectedPoint}
            filterRiver={filterRiver}
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
