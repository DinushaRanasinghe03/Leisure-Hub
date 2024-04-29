import React, { useState } from "react";
import Layout from "../components/layout/LayoutAdmin";
import ResourceTable from "./Resources/ResourceTable";
import { Link } from "react-router-dom";
import "./Resources/AddResource.css";

const Resource = () => {
  const [filter, setFilter] = useState("All"); // State to store the selected filter value

  return (
    <Layout title={"Admin Resources - LeisureHub"}>
      <div className="resource-controls">
        <Link to={`/addResource`} className="addResource-link">
          <button className="addResource-button">Add Resource</button>
        </Link>
        <div className="resource-filter">
          <label htmlFor="filter">Filter by Type:</label>
          {/* Dropdown filter */}
          <select
            id="filter"
            name="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Activities">Activities</option>
            <option value="Games">Games</option>
            <option value="Theater">Theater</option>
          </select>
        </div>
      </div>

      <div>
        <ResourceTable filter={filter} />{" "}
        {/* Pass the filter value to ResourceTable */}
      </div>
       </Layout>
  );
};

export default Resource;
