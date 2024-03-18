import React from "react";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";

const Header = () => {
  const navigation = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Movies",
      url: "/movies",
    },
    {
      name: "Show times & Scheduling",
      url: "/show-time",
    },
    {
      name: "Bookings",
      url: "/booking",
    },
    {
      name: "Games & Activities",
      url: "/games",
    },
    {
      name: "Facilities",
      url: "/facilities",
    },
    {
      name: "Membership",
      url: "/membership",
    },
    {
      name: "Login",
      url: "/login",
    },
  ];

  return (
      <header className="w-full">
      <div className="flex items-center justify-center">
        <img src={logo} alt="" />
        <h2 className="text-black font-bold text-5xl">LEISURE HUB</h2>
      </div>
        <div className="relative grid grid-cols-8 items-center justify-center text-center">
          <>
            {navigation.map((item, index) => {
              return (
                <NavLink
                  to={item.url}
                  key={index}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-secondary px-4 py-3 border-r border-r-black"
                      : "text-primary-high transition bg-primary px-4 py-3 whitespace-nowrap border-r border-r-black"
                  }
                >
                  <div className="font-semibold text-2xs mt-1">
                    {item?.name}
                  </div>
                </NavLink>
              );
            })}
          </>
        </div>
      </header>
  );
};

export default Header;
