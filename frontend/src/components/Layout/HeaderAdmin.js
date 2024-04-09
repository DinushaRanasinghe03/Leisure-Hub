import React from "react";
import "./HeaderAdmin.css";
import {NavLink} from "react-router-dom";
import LEISUREHUB_LOGO from "../../assets/LEISUREHUB_LOGO.jpg";

const HeaderAdmin = () => {
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
            <NavLink to="/adminmoviedashboard" activeClassName="active">
              Movies
            </NavLink>
          </li>
          <li>
            <NavLink to="/adminactivitydashboard/activitymanagement/create-category" activeClassName="active">
              Games and Activities
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
              Staff
            </NavLink>
          </li>
          <li>
            <NavLink to="/pageNotFound" activeClassName="active">
              Members
            </NavLink>
          </li>
          <li>
              <NavLink to="/pageNotFound" activeClassName="active">
                Customer Service
              </NavLink>
          </li>
          <li>
            <NavLink to="/pageNotFound" activeClassName="active">
              Payment
            </NavLink>
          </li>
          <li>
            <NavLink to="/" activeClassName="active">
              Logout
            </NavLink>
          </li>
          <img
                src={LEISUREHUB_LOGO}
                alt="logo"
                style={{ maxHeight: "50px", marginRight: "10px" }}
              />
        </ul>
      </nav>
    </header>
  );
};

export default HeaderAdmin;