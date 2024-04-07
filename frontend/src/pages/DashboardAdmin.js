import React from "react";
import Layout from "../components/layout/Layout";
import "./DashboardAdmin.css";
import { Link } from "react-router-dom";

const DashboardAdmin = () => {
  return (
    <Layout title={"Admin Dashboard - LeisureHub"}>
      <div className="container">
        <div className="button-container">
          <div className="button-row">
            <button className="large-button">Users</button>
            <button className="large-button">Movies</button>
            <button className="large-button">Games and Activities</button>
            <Link to={`/resource`}>
              <button className="large-button">Resources</button>
            </Link>
          </div>

          <div className="button-row">
            <button className="large-button">Maintenance</button>
            <button className="large-button">Staff</button>
            <button className="large-button">Customer Service</button>
            <button className="large-button">Payment</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardAdmin;
