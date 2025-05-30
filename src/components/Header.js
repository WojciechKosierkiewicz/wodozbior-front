import React from "react";
import { NavLink } from "react-router-dom";
//import logo from "../assets/wodozbior.png";

import "../styles/header.scss";

function Header() {

    return (
        <header className="header">
            <div className="header-left">
                <img src="/logo.png" alt="logo"></img> 
                <span className="logo-text">Wodozbiór</span>
            </div>

            <div className="header-center">
                <nav id="main-nav">
                    <ul className="menu">
                        <li className="menu-item" id="home">
                            <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Strona Główna</NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink to="/rivers" className={({ isActive }) => isActive ? "active" : ""}>Rzeki</NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink to="/stations" className={({ isActive }) => isActive ? "active" : ""}>Stacje pomiarowe</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className="header-right">
                <input type="text" placeholder="Search"></input>
            </div>
        </header>
    );
}

export default Header;