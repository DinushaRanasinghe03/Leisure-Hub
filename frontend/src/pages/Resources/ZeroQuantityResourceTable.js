import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
//import Layout from "../../components/layout/LayoutAdmin";
//import LayoutAdmin from "../../components/layout/LayoutAdmin";
import LayoutAdmin from './../../components/Layout/LayoutAdmin';

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
    <LayoutAdmin title={"Admin Resources - LeisureHub"}>
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
          <table
  className="resource-table"
  style={{
    width: "98%",
    borderCollapse: "collapse",
    marginTop: "20px",
    marginLeft: "20px"
  }}
>
<thead>
<tr>
<th
        style={{
          backgroundColor: "#f2f2f2",
          color: "black",
          borderTopLeftRadius: "8px"
        }}
>
        Number Order
</th>
<th
        style={{
          backgroundColor: "#f2f2f2",
          color: "black"
        }}
>
        Item ID
</th>
<th
        style={{
          backgroundColor: "#f2f2f2",
          color: "black"
        }}
>
        Item Name
</th>
<th
        style={{
          backgroundColor: "#f2f2f2",
          color: "black"
        }}
>
        Supplier
</th>
<th
        style={{
          backgroundColor: "#f2f2f2",
          color: "black",
          borderTopRightRadius: "8px"
        }}
>
        Supplier Email
</th>
</tr>
</thead>
<tbody>
    {filteredResources.map((resource) => (
<tr key={resource._id} style={{ border: "1px solid #dddddd" }}>
<td style={{ padding: "8px", textAlign: "left" }}>
          {resource.numberOrder}
</td>
<td style={{ padding: "8px", textAlign: "left" }}>{resource.itemId}</td>
<td style={{ padding: "8px", textAlign: "left" }}>{resource.itemName}</td>
<td style={{ padding: "8px", textAlign: "left" }}>{resource.supplier}</td>
<td style={{ padding: "8px", textAlign: "left" }}>{resource.supplierEmail}</td>
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
    </LayoutAdmin>
  );
};

export default ZeroQuantityResourceTable;