import React from "react";
import { Link } from "react-router-dom";
import "../styles/station-list.scss";
import { FaMapMarkerAlt } from "react-icons/fa";

function StationList({ stations }) {
  return (
    <ul className="station-list">
      {stations.map(({ id, name, river, waterLevel, color }) => (
        <li key={id} className="station-item">
          <Link to={`/station/${id}`}>
            <FaMapMarkerAlt className="station-icon" size={20} style={{ color }} />
            <div className="station-info">
              <span className="station-name">{name}</span>
              <span className="station-extra">Ostatni pomiar: {waterLevel} cm</span>
              <span className="station-river">Rzeka: {river}</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default StationList;
