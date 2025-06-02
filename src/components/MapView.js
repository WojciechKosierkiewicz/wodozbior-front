import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  useMap,
  GeoJSON
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import "../styles/map-view.scss";

const examplePoints = [
  {
    id: 1,
    name: "Stacja Warszawa",
    lat: 52.2297,
    lon: 21.0122,
    description: "Pomiar poziomu Wisły w Warszawie",
  },
  {
    id: 2,
    name: "Stacja Kraków",
    lat: 50.0647,
    lon: 19.945,
    description: "Pomiar poziomu Wisły w Krakowie",
  },
];

const defaultPin = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/252/252025.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

function FlyToPoint({ point }) {
  const map = useMap();
  useEffect(() => {
    if (point) map.flyTo([point.lat, point.lon], 12, { duration: 1.2 });
  }, [point, map]);
  return null;
}

const pulseIcon = L.divIcon({
  html: '<span class="pulse-ring"></span>',
  className: "pulse-icon",
  iconSize: [0, 0],
});

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
  }, [map]);

  return null;
}

function MapView({ selectedPoint, setSelectedPoint }) {
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
        {examplePoints.map((p) => (
          <Marker
            key={p.id}
            position={[p.lat, p.lon]}
            icon={defaultPin}
            eventHandlers={{ click: () => setSelectedPoint(p) }}
          >
            <Tooltip direction="top" offset={[0, -10]} opacity={1}>{p.name}</Tooltip>
            <Popup>{p.description}</Popup>
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
