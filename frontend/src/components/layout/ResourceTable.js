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
          {resources.map((resource) => (
            <tr key={resource._id}>
              <td>{resource.numberOrder}</td>
              <td>{resource.itemId}</td>
              <td>{resource.itemName}</td>
              <td>{resource.type}</td>
              <td>{resource.quantity}</td>
              <td>{resource.unitPrice}</td>
              <td>{resource.description}</td>
              <td>{resource.alertQuantity}</td>
              <td>{resource.supplier}</td>
              <td>{resource.supplierEmail}</td>
              <td>{resource.datePurchased}</td>

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
