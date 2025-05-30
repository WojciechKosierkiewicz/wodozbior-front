import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/wodozbior.png";

import "../styles/header.scss";

function Header() {

    return (
        <header className="header">
            <div className="header-left">
                <img src={logo} alt="logo"></img> 
                <span className="logo-text">WodoZbiór</span>
            </div>

            <div className="header-right">
                <nav id="main-nav">
                    <ul className="menu">
                        <li className="menu-item">
                            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>Mapa</NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink to="/rivers" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>Rzeki</NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink to="/stations" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>Stacje pomiarowe</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>

        </header>
    );
}

export default Header;