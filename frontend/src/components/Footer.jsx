import React from "react";
import { NavLink } from "react-router-dom";

const navigation = [
  {
    name: "About Us",
    url: "/about",
  },
  {
    name: "Contact Us",
    url: "/contact",
  },
  {
    name: "Privacy & Policy",
    url: "/policy",
  },
  {
    name: "Reviews & Ratings",
    url: "/reviews",
  },
  {
    name: "Provide Feedback To LEISUREHUB",
    url: "/feedback",
  },
];

const contacts = [
  {
    name: "075 314 5578",
    url: "",
  },
  {
    name: "Info@Leisurehub.gov.lk",
    url: "",
  },
  {
    name: "AB10, Kaduwela",
    url: "",
  },
];

const Footer = () => {
  return (
    <footer className="w-full px-4 flex flex-col items-center justify-center bg-primary py-8 gap-5">
      <h4 className="text-center mb-4">All Right Reserved &copy; LEISUREHUB</h4>

      <div className=" flex flex-row items-center justify-center gap-8 text-center">
        <>
          {navigation.map((item, index) => {
            return (
              <NavLink
                to={item.url}
                key={index}
                className={({ isActive }) =>
                  isActive
                    ? "text-black"
                    : `text-primary-high transition text-black whitespace-nowrap ${
                        index === navigation.length - 1
                          ? ""
                          : "border-r border-r-black pr-4"
                      }`
                }
              >
                <div className="font-semibold text-2xs">{item?.name}</div>
              </NavLink>
            );
          })}
        </>
      </div>

      <div className=" flex flex-row items-center justify-center gap-8 text-center">
        <>
          {contacts.map((item, index) => {
            return (
              <NavLink
                to={item.url}
                key={index}
                className={({ isActive }) =>
                  isActive
                    ? "text-black"
                    : `text-primary-high transition text-black whitespace-nowrap ${
                        index === contacts.length - 1
                          ? ""
                          : "border-r border-r-black pr-4"
                      }`
                }
              >
                <div className="font-medium text-2xs">{item?.name}</div>
              </NavLink>
            );
          })}
        </>
      </div>
    </footer>
  );
};

export default Footer;
