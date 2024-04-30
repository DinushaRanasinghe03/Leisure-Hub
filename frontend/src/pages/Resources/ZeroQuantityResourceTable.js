import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ResourceTable.css";
import HeaderAdmin from "../../components/layout/HeaderAdmin";

const ZeroQuantityResourceTable = () => {
  const [filteredResources, setFilteredResources] = useState([]);

  useEffect(() => {
    const fetchFilteredResources = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8070/api/v1/resources/getResource"
        );
        if (response.data.success) {
          const resources = response.data.resources.filter(
            (resource) => resource.quantity === 0
          );
          setFilteredResources(resources);
        } else {
          throw new Error("Failed to fetch resources");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchFilteredResources();
  }, []);

  const handleContact = () => {
    window.confirm("Contact the relevant person through E-mail.");
  };

  return (
    <div>
      <HeaderAdmin />
      <div className="resource-table-container">
        <h1>Low Stock</h1>
        <table className="resource-table">
          <thead>
            <tr>
              <th>Number Order</th>
              <th>Item ID</th>
              <th>Item Name</th>
              <th>Supplier</th>
              <th>Supplier Email</th>
            </tr>
          </thead>
          <tbody>
            {filteredResources.map((resource) => (
              <tr key={resource._id}>
                <td>{resource.numberOrder}</td>
                <td>{resource.itemId}</td>
                <td>{resource.itemName}</td>
                <td>{resource.supplier}</td>
                <td>{resource.supplierEmail}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="button-container">
          <Link to="/resource">
            <button className="back-button">Back</button>
          </Link>

          <button className="contact-button" onClick={handleContact}>
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default ZeroQuantityResourceTable;
