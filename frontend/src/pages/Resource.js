import React, { useState, useEffect } from "react";
import Layout from "../components/layout/LayoutAdmin";
import ResourceTable from "./Resources/ResourceTable";
import { Link } from "react-router-dom";
import "./Resources/AddResource.css";
import axios from "axios";

const Resource = () => {
  const [filter, setFilter] = useState("All"); // State to store the selected filter value
  const [totalCount, setTotalCount] = useState(0); // State to store total count
  const [totalAmountSpent, setTotalAmountSpent] = useState(0); // State to store total amount spent
  const [zeroQuantityCount, setZeroQuantityCount] = useState(0); // State to store count of resources with Quantity = 0

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8070/api/v1/resources/getResource"
        );
        const { countTotal, totalAmountSpent, zeroQuantityCount } =
          response.data; // Extract total count from response
        setTotalCount(countTotal); // Update total count state
        setTotalAmountSpent(totalAmountSpent); // Update total amount spent state
        setZeroQuantityCount(zeroQuantityCount); // Update zero quantity count state
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Layout title={"Admin Resources - LeisureHub"}>
      <h2>Total Resources: {totalCount}</h2> {/* Display total count */}
      <h2>Total Amount Spent: {totalAmountSpent}</h2>{" "}
      {/* Display total amount spent */}
      <h2>
        <Link to={`/zeroQuantityResources`}>
          Low Stock: {zeroQuantityCount}
        </Link>
      </h2>
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
