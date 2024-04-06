import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ResourceTable.css";
import { toast } from "react-toastify";

const ResourceTable = () => {
  const [resources, setResources] = useState([]);

  //get all resources
  const getAllResources = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8070/api/v1/resources/getResource"
      );
      if (response.data.success) {
        setResources(response.data.resources);
      } else {
        throw new Error(response.data.message || "Failed to fetch resources");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in getting resources: " + error.message);
    }
  };

  useEffect(() => {
    getAllResources();
  }, []);

  return (
    <div className="resource-table-container">
      <table className="resource-table">
        <thead>
          <tr>
            <th>Number Order</th>
            <th>Item ID</th>
            <th>Item Name</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Description</th>
            <th>Alert Quantity</th>
            <th>Supplier</th>
            <th>Supplier Email</th>
            <th>Date Purchased</th>
            <th colSpan="3">Actions</th> {/* Merge three columns for actions */}
          </tr>
        </thead>
        <tbody>
          {resources.map((r) => (
            <tr key={r._id}>
              <td>{r.numberOrder}</td>
              <td>{r.itemId}</td>
              <td>{r.itemName}</td>
              <td>{r.type}</td>
              <td>{r.quantity}</td>
              <td>{r.unitPrice}</td>
              <td>{r.description}</td>
              <td>{r.alertQuantity}</td>
              <td>{r.supplier}</td>
              <td>{r.supplierEmail}</td>
              <td>{r.datePurchased}</td>

              <td>
                <button className="view-button">View</button>
              </td>
              <td>
                <button className="update-button">Update</button>
              </td>
              <td>
                <button className="delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResourceTable;
