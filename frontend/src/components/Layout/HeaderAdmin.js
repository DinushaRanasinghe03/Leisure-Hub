import React from "react";
import "./HeaderAdmin.css";
import { NavLink } from "react-router-dom";
import LEISUREHUB_LOGO from "../../assets/LEISUREHUB_LOGO.jpg";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";

const HeaderAdmin = () => {
  const [auth, setAuth] = useAuth(); //const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    //Check if auth is null before accessing its properties
    if (auth && auth.user) {
      setAuth({
        ...auth,
        user: null,
        token: "",
      });
      localStorage.removeItem("auth");
      toast.success("Logout Successfully");
    }
  };

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
            <NavLink
              to="/adminactivitydashboard/activitymanagement/create-category"
              activeClassName="active"
            >
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
            <NavLink to="/employeeregister" activeClassName="active">
              Staff
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/users" activeClassName="active">
              Members
            </NavLink>
          </li>
          <li>
            <NavLink to="/feeddetails" activeClassName="active">
              Customer Service
            </NavLink>
          </li>
          <li>
            <NavLink to="/psummary" activeClassName="active">
              Payment
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/dashboard" activeClassName="active">
              Admin Profile
            </NavLink>
          </li>
          <li>
            <NavLink onClick={handleLogout} to="/" activeClassName="active">
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
