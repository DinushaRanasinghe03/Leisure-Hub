import React from "react";
import { NavLink, Link } from "react-router-dom";
//import LEISUREHUB_LOGO from '../assets/LEISUREHUB_LOGO.jpg'
import LEISUREHUB_LOGO from "../../assets/LEISUREHUB_LOGO.jpg";

import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";

const Header = () => {
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
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div
            className="collapse navbar-collapse header-nav"
            id="navbarTogglerDemo01"
          >
            <Link
              to="/"
              className="navbar-brand"
              style={{ display: "flex", alignItems: "center" }}
            >
              <img
                src={LEISUREHUB_LOGO}
                alt="logo"
                style={{ maxHeight: "50px", marginRight: "10px" }}
              />
              <span style={{ marginTop: "5px" }}>LEISUREHUB</span>
            </Link>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/movies" className="nav-link">
                  Movies
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/schedules" className="nav-link">
                  Movie Show Times
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/booking" className="nav-link">
                  Booking
                </NavLink>
              </li>

              {auth && auth.user && (
                <li className="nav-item">
                  <NavLink to="/gamesandactivities" className="nav-link">
                    Games & Activities
                  </NavLink>
                </li>
              )}

              <li className="nav-item">
                <NavLink to="/facilities" className="nav-link">
                  Facilities
                </NavLink>
              </li>

              {/* <li className="nav-item">
                <NavLink to="/memberships" className="nav-link">
                  Memberships
                </NavLink>
              </li> */}
              {!auth || !auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/memberships" className="nav-link">
                      Memberships
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link" href="#">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      //style={{ border: "none" }}
                    >
                      {auth && auth.user && auth.user.fname}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={
                            auth?.user?.role === 1
                              ? "/admin/dashboard"
                              : "/dashboard/user"
                          }
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
