import React, { useState } from "react";
import "../styles/home-page.scss";
import MapView from "../components/MapView";
import SearchInput from "../components/SearchInput";

function HomePage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPoint, setSelectedPoint] = useState(null);

    return (
        <main className="home-container">
            <div className="main-container">
                <div className="left-panel">
                    <SearchInput
                        value={searchTerm}
                        onChange={setSearchTerm}
                        placeholder="Wyszukaj rzeki/stacje"
                    />
                    <div className="details-box">
                        <h2>Wybrany punkt:</h2>
                        {selectedPoint ? (
                        <div>
                            <strong>{selectedPoint.name}</strong>
                            <p>{selectedPoint.description}</p>
                        </div>
                        ) : (
                        <p>(nazwa wybranej na mapie rzeki/stacji)</p>
                        )}
                        <p className="details-info">(szczegóły?)</p>
                    </div>
                </div>
                <div className="map-panel">
                    <MapView
                        selectedPoint={selectedPoint}
                        setSelectedPoint={setSelectedPoint}
                    />
                    <div className="legend">legenda</div>
                </div>
            </div>
        </main>
    );
}

export default HomePage;