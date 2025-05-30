import React, { useState } from "react";
import "../styles/home-page.scss";

function HomePage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPoint, setSelectedPoint] = useState(null);

    return (
        <main className="home-container">
            <div className="main-container">
                <div className="left-panel">
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Wyszukaj rzeki/stacje"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
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
                    <div className="map-placeholder">mapa</div>
                    <div className="legend">legenda</div>
                </div>
            </div>
        </main>
    );
}

export default HomePage;