import React from "react";
import "./Header.css";
import {NavLink} from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <h1>Leisure Hub</h1>
      </div>
      <nav className="top-nav-bar">
        <ul>
          <li>
            <NavLink to="/" activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/resource" activeClassName="active">
              Resource
            </NavLink>
          </li>
          <li>
            <NavLink to="/maintenance" activeClassName="active">
              Maintenance
            </NavLink>
          </li>
          <li>
            <NavLink to="/pageNotFound" activeClassName="active">
              Payment
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
