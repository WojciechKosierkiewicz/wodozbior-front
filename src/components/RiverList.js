import React from "react";
import { Link } from "react-router-dom";
import "../styles/river-list.scss";
import { BsDropletFill } from "react-icons/bs";

function RiverList({ rivers }) {
  return (
    <ul className="river-list">
      {rivers.map(({ id, name, stationCount }) => (
        <li key={id} className="river-item">
          <Link to={`/river/${encodeURIComponent(name.toLowerCase().replace(/\s+/g, '-'))}`}>
            <BsDropletFill     className="river-icon" size={20} color="#0EA5E9" />
            <div className="river-info">
              <span className="river-name">{name}</span>
              <span className="river-stations">Liczba stacji: {stationCount}</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default RiverList;