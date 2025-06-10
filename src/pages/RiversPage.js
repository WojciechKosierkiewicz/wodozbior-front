import React, { useState, useMemo } from "react";
import SearchInput from "../components/SearchInput";
import RiverList from "../components/RiverList";
import "../styles/rivers-page.scss";
import { normalize } from "../utils/text";
import { exampleApi } from "../mockApidata";


const riversapi = await fetch('https://śpiwory.nowaccy.cloud/api/hydrodata/rivers')
  .then(response => response.json())
  .then(data => data.map(river => ({
    id: river.id.toString(),
    name: river.name,
    stationCount: river.stations.length
  })));

const apiRivers = riversapi.map(river => ({
  id: river.id,
  name: river.name,
  stationCount: river.stationCount,
}));

function RiversPage() {
  const [query, setQuery] = useState("");

  const filteredRivers = useMemo(() => {
    const norm = normalize(query.trim());
    return apiRivers.filter((r) => normalize(r.name).includes(norm));
  }, [query]);

  return (
    <main className="rivers-page">
      <div className="rivers-list">
        <h1 className="rivers-title">Rzeki</h1>
        <SearchInput value={query} onChange={setQuery} placeholder="Wyszukaj" />
        <RiverList rivers={filteredRivers} />
      </div>
    </main>
  );
}

export default RiversPage;
