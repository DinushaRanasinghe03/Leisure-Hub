import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResourceModal from "./ResourceModal"; // Import the modal component

const ResourceTable = ({ filter }) => {
  // Receive filter as a prop
  const [resources, setResources] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null); // State to store the selected resource
  const [modalVisible, setModalVisible] = useState(false); // State to manage modal visibility
  const [searchTerm, setSearchTerm] = useState(""); // State to store search term
  const [reportMode, setReportMode] = useState(false);
  const navigate = useNavigate();

  // Function to handle the click event of the "View" button
  const handleView = (resource) => {
    setSelectedResource(resource); // Set the selected resource
    setModalVisible(true); // Show the modal
  };

  const handleUpdate = (id) => {
    navigate(`/updateResource/${id}`);
  };

  // Function to fetch all resources
  const getAllResources = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/resources/getResource"
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
        `http://localhost:8080/api/v1/resources/deleteResource/${id}`
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
      <div
        className="search-container"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div
          className="search-wrapper"
          style={{
            position: "relative",
            marginTop: "-90px",
            marginLeft: "1200px",
          }}
        >
          <input
            type="text"
            placeholder="Search by Item ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            style={{
              padding: "4px", // Adjusted padding to make space for the search icon
              border: "1px solid #ccc",
              borderRadius: "10px",
              width: "200px",
              fontSize: "16px",
              backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23444"><path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.94-5-5.98-5.34a6.02 6.02 0 0 0-7.52 7.52c.34 3.04 2.56 5.51 5.34 5.98a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/><path d="M0 0h24v24H0z" fill="none"/></svg>')`, // Set the search icon as background image
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 10px center",
              backgroundSize: "16px 16px", // Adjust the size of the icon
            }}
          />
          
        </div>
      </div>
      <table className="border-collapse border border-gray-700  border-7 m-5">
        <thead>
          <tr className="border  bg-gray-200">
            <th className="border px-4 py-2">Number Order</th>
            <th className="border px-4 py-2">Item ID</th>
            <th className="border px-4 py-2">Item Name</th>
            <th className="border px-4 py-2">Type</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Unit Price (LKR)</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Alert Quantity</th>
            <th className="border px-4 py-2">Supplier</th>
            <th className="border px-4 py-2">Supplier Email</th>
            <th className="border px-4 py-2">Date Purchased</th>
            {!reportMode && (
              <th className="border px-4 py-2" colSpan="3">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {resources?.map((r) => (
            <tr key={r._id} className="border">
              <td className="border px-4 py-2">{r.numberOrder}</td>
              <td className="border px-4 py-2">{r.itemId}</td>
              <td className="border px-4 py-2">{r.itemName}</td>
              <td className="border px-4 py-2">{r.type}</td>
              <td className="border px-4 py-2">{r.quantity}</td>
              <td className="border px-4 py-2">{r.unitPrice}</td>
              <td className="border px-4 py-2">{r.description}</td>
              <td className="border px-4 py-2">{r.alertQuantity}</td>
              <td className="border px-4 py-2">{r.supplier}</td>
              <td className="border px-4 py-2">{r.supplierEmail}</td>
              <td className="border px-4 py-2">{r.datePurchased}</td>
              {!reportMode && (
                <>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-yellow-400 text-black border border-yellow-500 px-3 py-1 rounded hover:bg-yellow-500 hover:border-yellow-600"
                      onClick={() => handleView(r)}
                    >
                      View
                    </button>
                  </td>

                  <td className="border px-4 py-2">
                    <button
                      className="bg-green-500 text-black border border-green-600 px-3 py-1 rounded hover:bg-green-600 hover:border-green-700"
                      onClick={() => handleUpdate(r._id)}
                    >
                      Update
                    </button>
                  </td>

                  <td className="border px-4 py-2">
                    <button
                      className="bg-red-500 text-black border border-red-600 px-3 py-1 rounded hover:bg-red-600 hover:border-red-700"
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
        <button
          onClick={handlePrint}
          className="bg-blue-800 text-white px-5 py-1 text-lg rounded-md cursor-pointer mt-30 ml-5"
        >
          Print Report
        </button>
      )}
      <button
        className="bg-green-800 text-white px-5 py-1 text-lg rounded-md cursor-pointer mt-30 ml-5"
        onClick={toggleReportMode}
      >
        {reportMode ? "Exit Report Mode" : "Generate Report"}
      </button>
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
