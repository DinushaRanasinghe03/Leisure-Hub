import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ResourceTable.css";
import Layout from "../../components/layout/LayoutAdmin";

const ZeroQuantityResourceTable = () => {
  const [filteredResources, setFilteredResources] = useState([]);

  useEffect(() => {
    const fetchFilteredResources = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/resources/getResource"
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
    <Layout title={"Admin Resources - LeisureHub"}>
      <div>
        
        <div className="resource-table-container">
          <h1
            style={{
              fontWeight: "bold",
              fontSize: "24px",
              marginLeft: "15px",
              marginTop: "15px",
            }}
          >
            Low Stock
          </h1>
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
          <div
            style={{
              display: "inline-block",
              marginTop: "20px",
              marginLeft: "1300px",
            }}
          >
            <button
              style={{
                marginRight: "10px",
                backgroundColor: "#3FA450",
                color: "#000",
                padding: "8px 16px",
                borderRadius: "6px",
                border: "1px solid #000",
                cursor: "pointer",
                fontWeight: "bold",
              }}
              onClick={handleContact}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#45BA57";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "#3FA450";
              }}
            >
              Contact
            </button>
            <Link to="/resource">
              <button
                style={{
                  backgroundColor: "#6E9C9F",
                  color: "#000",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  border: "1px solid #000",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#668F92";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "#6E9C9F";
                }}
              >
                Back
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ZeroQuantityResourceTable;
