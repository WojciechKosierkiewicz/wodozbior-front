import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  useMap
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import "../styles/map-view.scss";
import { exampleApi } from "../mockApidata";

const createColoredIcon = (color) =>
  L.divIcon({
    className: "custom-marker",
    html: `<div class="marker-dot" style="background:${color}"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });

const combinedPoints = exampleApi.stations.map((station) => ({
  id: station.id,
  name: station.id === exampleApi.singleStation.id
    ? exampleApi.singleStation.name
    : "Stacja " + station.id,
  river: station.river,
  lat: station.latitude,
  lon: station.longitude,
  waterLevel: station.waterLevel,
  color: station.color || "#0EA5E9"
}));

const pulseIcon = L.divIcon({
  html: '<span class="pulse-ring"></span>',
  className: "pulse-icon",
  iconSize: [0, 0]
});

function FlyToPoint({ point }) {
  const map = useMap();
  useEffect(() => {
    if (point) {
      map.flyTo([point.lat, point.lon], 12, { duration: 1.2 });
    }
  }, [point, map]);
  return null;
}

function ResetViewControl() {
  const map = useMap();
  useEffect(() => {
    const btn = L.DomUtil.create("button", "reset-view-btn");
    btn.title = "Pokaż całą Polskę";
    btn.innerHTML = "⤢";
    L.DomEvent.on(btn, "click", () => map.setView([52, 19], 6));
    const control = L.control({ position: "topright" });
    control.onAdd = () => btn;
    control.addTo(map);
    return () => control.remove();
  }, []);
  return null;
}

function MapView({ selectedPoint, setSelectedPoint, filterRiver }) {
  return (
      <MapContainer
        center={[52, 19]}
        zoom={6}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom
      >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
      />

      <FlyToPoint point={selectedPoint} />
      <ResetViewControl />

      <MarkerClusterGroup chunkedLoading>
        {combinedPoints
          // *** TUTAJ robimy filtrowanie po rzece, jeśli filterRiver !== null ***
          .filter((p) => {
            // Jeśli filterRiver jest ustawiony → wyświetl tylko te, które mają tę samą rzekę
            if (filterRiver) {
              return p.river.toLowerCase() === filterRiver.toLowerCase();
            }
            // Jeśli filterRiver jest null → wyświetl wszystko
            return true;
          })
          .map((p) => (
            <Marker
              key={p.id}
              position={[p.lat, p.lon]}
              icon={createColoredIcon(p.color)}
              eventHandlers={{
                click: () => {
                  // klikając marker → ustawiamy go jako selectedPoint
                  setSelectedPoint(p);
                },
              }}
            >
              <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                {p.name}
              </Tooltip>
              <Popup>
                <strong>{p.name}</strong>
                <br />
                Rzeka: {p.river}
                <br />
                Pomiar: {p.waterLevel} cm
              </Popup>
            </Marker>
          ))}
      </MarkerClusterGroup>

      {selectedPoint && (
        <Marker
          key="active-ring"
          position={[selectedPoint.lat, selectedPoint.lon]}
          icon={pulseIcon}
          interactive={false}
        />
      )}
    </MapContainer>
  );
}

export default MapView;
