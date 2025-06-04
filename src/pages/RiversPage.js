import React from "react";
import "../styles/rivers-page.scss";

function RiversPage() {
    // /stations
    const stations = `
    [
    {
        "id": "1",
        "river": "Wisła",
        "latitude": 52.2297,
        "longitude": 21.0122,
        "waterLevel": 300,
        "measurementDate": "2023-10-01T12:00:00Z",
        "color": "#FF0000"
    },
    {
        "id": "2",
        "river": "Odra",
        "latitude": 51.1079,
        "longitude": 17.0385,
        "waterLevel": 250,
        "measurementDate": "2023-10-01T12:00:00Z",
        "color": "#00FF00"
    },
    {
        "id": "3",
        "river": "Warta",
        "latitude": 52.4064,
        "longitude": 16.9252,
        "waterLevel": 200,
        "measurementDate": "2023-10-01T12:00:00Z",
        "color": "#0000FF"
    }
]
`;
    // /stations/{id}
    const precisestation = `{
    "id": "1",
    "name": "wwa",
    "river": "Wisła",
    "region": "Mazowieckie",
    "latitude": 52.2297,
    "longitude": 21.0122,
    "waterLevel": 300,
    "waterLevelDate": "2023-10-01T12:00:00Z",
    "waterTemperature": 15.5,
    "waterTemperatureDate": "2023-10-01T12:00:00Z",
    "icePhenomenon": "Brak",
    "icePhenomenonDate": "2023-10-01T12:00:00Z",
    "overgrowthPhenomenon": "Brak",
    "overgrowthPhenomenonDate": "2023-10-01T12:00:00Z"
}`;
// /rivers
const rzekastacje = `[
    {
        "first": "Wisła",
        "second": [
            {
                "id": "1",
                "name": "Wisła",
                "latitude": 52.2297,
                "longitude": 21.0122,
                "waterLevel": "300"
            },
            {
                "id": "2",
                "name": "Wisła Płock",
                "latitude": 52.55,
                "longitude": 19.7,
                "waterLevel": "280"
            }
        ]
    },
    {
        "first": "Odra",
        "second": [
            {
                "id": "3",
                "name": "Odra Wrocław",
                "latitude": 51.1079,
                "longitude": 17.0385,
                "waterLevel": "250"
            }
        ]
    }
]`;


    return (
        <main className="rivers-page">
            <h1>Rzeki</h1>
        </main>
    );
}

export default RiversPage;