import React, { useState, useMemo } from "react";
import SearchInput from "../components/SearchInput";
import RiverList from "../components/RiverList";
import "../styles/rivers-page.scss";
import { normalize } from "../utils/text";

const mockRivers = [
  { id: "wisla", name: "Wisła", stationCount: 18 },
  { id: "odra", name: "Odra", stationCount: 12 },
  { id: "warta", name: "Warta", stationCount: 10 },
  { id: "bug", name: "Bug", stationCount: 9 },
  { id: "san", name: "San", stationCount: 7 },
  { id: "narew", name: "Narew", stationCount: 7 },
];

function RiversPage() {
  const [query, setQuery] = useState("");

  const filteredRivers = useMemo(() => {
    const norm = normalize(query.trim());
    return mockRivers.filter((r) => normalize(r.name).includes(norm));
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
