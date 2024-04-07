import React from "react";
import "./sidebar.css";

const Sidebar = ({ children }) => {
  return (
    <div className="container_nav">
      <div style={{ width: "180px" }} className="sidebar">
        <div className="nav_item_main">
          <div>
            <h1
              className="nav_item"
              onClick={() => (window.location.href = "/feeddetails")}
            >
              feedback
            </h1>
            <br></br> <br></br> <br></br>
            <h1
              className="nav_item"
              onClick={() => (window.location.href = "/contactdetails")}
            >
              inquiries
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
