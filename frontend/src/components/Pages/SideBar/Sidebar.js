import React from "react";

const Sidebar = ({ children }) => {
  return (
    <div style={{ position: "fixed", left: "20px", top: 0, height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: "180px", height: "50%", backgroundColor: "#f0f0f0", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <div style={{ padding: "10px" }}>
          <h1
            style={{ cursor: "pointer", marginBottom: "20px", fontSize: "20px", textAlign: "center" }}
            onClick={() => (window.location.href = "/feeddetails")}
          >
            Feedback
          </h1>
          <h1
            style={{ cursor: "pointer", marginBottom: "20px", fontSize: "20px", textAlign: "center" }}
            onClick={() => (window.location.href = "/contactdetails")}
          >
            Inquiries
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
