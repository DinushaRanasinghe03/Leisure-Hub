import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ResourceTable.css";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { BiSearch } from "react-icons/bi"; // Import search icon

import ResourceModal from "./ResourceModal"; // Import the modal component

const ResourceTable = ({ filter }) => {
  // Receive filter as a prop
  const [resources, setResources] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null); // State to store the selected resource
  const [modalVisible, setModalVisible] = useState(false); // State to manage modal visibility
  const [searchTerm, setSearchTerm] = useState(""); // State to store search term
  const [reportMode, setReportMode] = useState(false);

  // Function to handle the click event of the "View" button
  const handleView = (resource) => {
    setSelectedResource(resource); // Set the selected resource
    setModalVisible(true); // Show the modal
  };

  // Function to fetch all resources
  const getAllResources = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8070/api/v1/resources/getResource"
      );
      if (response.data.success) {
        let filteredResources = response.data.resources;

        // Filter based on the selected filter value
        if (filter !== "All") {
          filteredResources = filteredResources.filter(
            (resource) => resource.type === filter
          );
        }

        // Filter based on search term (Item ID)
        if (searchTerm !== "") {
          filteredResources = filteredResources.filter((resource) =>
            resource.itemId.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        setResources(filteredResources);
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
    // eslint-disable-next-line
  }, [filter, searchTerm]); // Trigger useEffect whenever filter changes

  // Function to delete a resource
  const deleteResource = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8070/api/v1/resources/deleteResource/${id}`
      );
      if (response.data.success) {
        toast.success("Resource deleted successfully");
        // After deleting, fetch all resources again to update the table
        getAllResources();
      } else {
        throw new Error(response.data.message || "Failed to delete resource");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in deleting resource: " + error.message);
    }
  };
  // Function to toggle report generation mode
  const toggleReportMode = () => {
    setReportMode(!reportMode);
  };
  // Function to handle printing
  const handlePrint = () => {
    window.print(); // Trigger browser's print functionality
  };
  return (
    <div className="resource-table-container">
      <div className="search-container">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search by Item ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <BiSearch className="search-icon" />
        </div>
        <button onClick={toggleReportMode}>
          {reportMode ? "Exit Report Mode" : "Generate Report"}
        </button>
      </div>
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
            {!reportMode && <th colSpan="3">Actions</th>}{" "}
            {/* Merge three columns for actions */}
          </tr>
        </thead>
        <tbody>
          {resources?.map((r) => (
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
              {!reportMode && (
                <>
                  <td>
                    <button
                      className="view-button"
                      onClick={() => handleView(r)}
                    >
                      View
                    </button>
                  </td>
                  <td>
                    <Link to={`/updateResource/${r._id}`}>
                      <button className="update-button">Update</button>
                    </Link>
                  </td>
                  <td>
                    {/* Delete button with onClick handler */}
                    <button
                      className="delete-button"
                      onClick={() => deleteResource(r._id)}
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {reportMode && (
        <button onClick={handlePrint} className="print-button">
          Print Report
        </button>
      )}
      {/* Modal component */}
      {modalVisible && (
        <ResourceModal
          resource={selectedResource} // Pass selected resource to modal
          onClose={() => setModalVisible(false)} // Close modal function
        />
      )}
    </div>
  );
};

export default ResourceTable;
