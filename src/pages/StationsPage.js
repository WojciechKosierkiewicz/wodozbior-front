import React, { useState, useMemo } from "react";
import SearchInput from "../components/SearchInput";
import StationList from "../components/StationList";
import "../styles/stations-page.scss";
import { normalize } from "../utils/text";
import { exampleApi } from "../mockApidata";


const stationsapi = await fetch('https://wody.nowaccy.cloud/api/hydrodata/stations')
  .then(response => response.json())
  .then(data => data.map(station => ({
    id: station.id,
    name: station.stationName || `!>!@Stacja ${station.id}`,
    river: station.river,
    waterLevel: station.waterLevel,
    color: station.color || "#0EA5E9"
  })));

// scalone dane stacji
const combinedStations = stationsapi.map((station) => ({
  id: station.id,
  name: station.name,
  river: station.river,
  waterLevel: station.waterLevel,
  color: station.color || "#0EA5E9"
}));

function StationsPage() {
  const [query, setQuery] = useState("");

  const filteredStations = useMemo(() => {
    const norm = normalize(query.trim());
    return combinedStations.filter(
      (s) =>
        normalize(s.name || "").includes(norm) ||
        normalize(s.river || "").includes(norm)
    );
  }, [query]);

  return (
    <main className="stations-page">
      <div className="stations-list">
        <h1 className="stations-title">Stacje pomiarowe</h1>
        <SearchInput value={query} onChange={setQuery} placeholder="Wyszukaj" />
        <StationList stations={filteredStations} />
      </div>
    </main>
  );
}

export default StationsPage;
