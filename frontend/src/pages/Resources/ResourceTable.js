import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
//import { Link } from "react-router-dom";
import { BiSearch } from "react-icons/bi"; // Import search icon
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
    <div
  className="resource-table-container"
  style={{ margin: "20px" }}
>
<div
  className="search-container"
  style={{
    display: "flex",
    alignItems: "center",
    width: "3000px"
  }}
>
<div
    className="search-wrapper"
    style={{
      position: "relative",
      marginLeft: "1000px",
      marginTop: "-150px",
      padding: "10px"
    }}
>
<input
      type="text"
      placeholder="Search by Item ID"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="search-input"
      style={{
        width: "100%",
        padding: "8px",
        border: "1px solid black",
        width: "300px",
        paddingRight: "30px"
      }}
    />
<BiSearch
      className="search-icon"
      style={{
        position: "absolute",
        right: "20px",
        top: "50%",
        transform: "translateY(-50%)",
        cursor: "pointer"
      }}
    />
</div>
</div>
      <table
  className="resource-table"
  style={{ width: "98%", borderCollapse: "collapse", marginTop: "20px", marginLeft: "20px" }}
>
<thead>
<tr>
<th style={{ backgroundColor: "#f2f2f2", color: "black", borderCollapse: "collapse", border: "1px solid #dddddd", padding: "8px", textAlign: "left", borderTopLeftRadius: "8px" }}>Number Order</th>
<th style={{ backgroundColor: "#f2f2f2", color: "black", borderCollapse: "collapse", border: "1px solid #dddddd", padding: "8px", textAlign: "left" }}>Item ID</th>
<th style={{ backgroundColor: "#f2f2f2", color: "black", borderCollapse: "collapse", border: "1px solid #dddddd", padding: "8px", textAlign: "left" }}>Item Name</th>
<th style={{ backgroundColor: "#f2f2f2", color: "black", borderCollapse: "collapse", border: "1px solid #dddddd", padding: "8px", textAlign: "left" }}>Type</th>
<th style={{ backgroundColor: "#f2f2f2", color: "black", borderCollapse: "collapse", border: "1px solid #dddddd", padding: "8px", textAlign: "left" }}>Quantity</th>
<th style={{ backgroundColor: "#f2f2f2", color: "black", borderCollapse: "collapse", border: "1px solid #dddddd", padding: "8px", textAlign: "left" }}>Unit Price (LKR)</th>
<th style={{ backgroundColor: "#f2f2f2", color: "black", borderCollapse: "collapse", border: "1px solid #dddddd", padding: "8px", textAlign: "left" }}>Description</th>
<th style={{ backgroundColor: "#f2f2f2", color: "black", borderCollapse: "collapse", border: "1px solid #dddddd", padding: "8px", textAlign: "left" }}>Alert Quantity</th>
<th style={{ backgroundColor: "#f2f2f2", color: "black", borderCollapse: "collapse", border: "1px solid #dddddd", padding: "8px", textAlign: "left" }}>Supplier</th>
<th style={{ backgroundColor: "#f2f2f2", color: "black", borderCollapse: "collapse", border: "1px solid #dddddd", padding: "8px", textAlign: "left" }}>Supplier Email</th>
<th style={{ backgroundColor: "#f2f2f2", color: "black", borderCollapse: "collapse", border: "1px solid #dddddd", padding: "8px", textAlign: "left", borderTopRightRadius: "8px" }}>Date Purchased</th>
      {!reportMode && (
<th colSpan="3" style={{ backgroundColor: "#f2f2f2", color: "black", borderCollapse: "collapse", border: "1px solid #dddddd", padding: "8px", textAlign: "left" }}>Actions</th>
      )}
</tr>
</thead>
<tbody>
    {resources?.map((r) => (
<tr key={r._id}>
<td style={{ border: "1px solid #dddddd", padding: "8px", textAlign: "left" }}>{r.numberOrder}</td>
<td style={{ border: "1px solid #dddddd", padding: "8px", textAlign: "left" }}>{r.itemId}</td>
<td style={{ border: "1px solid #dddddd", padding: "8px", textAlign: "left" }}>{r.itemName}</td>
<td style={{ border: "1px solid #dddddd", padding: "8px", textAlign: "left" }}>{r.type}</td>
<td style={{ border: "1px solid #dddddd", padding: "8px", textAlign: "left" }}>{r.quantity}</td>
<td style={{ border: "1px solid #dddddd", padding: "8px", textAlign: "left" }}>{r.unitPrice}</td>
<td style={{ border: "1px solid #dddddd", padding: "8px", textAlign: "left" }}>{r.description}</td>
<td style={{ border: "1px solid #dddddd", padding: "8px", textAlign: "left" }}>{r.alertQuantity}</td>
<td style={{ border: "1px solid #dddddd", padding: "8px", textAlign: "left" }}>{r.supplier}</td>
<td style={{ border: "1px solid #dddddd", padding: "8px", textAlign: "left" }}>{r.supplierEmail}</td>
<td style={{ border: "1px solid #dddddd", padding: "8px", textAlign: "left" }}>{r.datePurchased}</td>
        {!reportMode && (
<>
<td>
<button
    className="view-button"
    onClick={() => handleView(r)}
    style={{
      padding: "5px 10px",
      margin: "0 5px",
      cursor: "pointer",
      borderRadius: "4px",
      backgroundColor: "rgb(203, 203, 69)",
      color: "black",
      border: "1px solid #b0bc30"
    }}
>
    View
</button>
</td>
<td>
<button
    className="update-button"
    onClick={() => handleUpdate(r._id)}
    style={{
      padding: "5px 10px",
      margin: "0 5px",
      cursor: "pointer",
      borderRadius: "4px",
      backgroundColor: "rgb(57, 153, 57)",
      color: "black",
      border: "1px solid #1f8620"
    }}
>
    Update
</button>
</td>
<td>
<button
    className="delete-button"
    onClick={() => deleteResource(r._id)}
    style={{
      padding: "5px 10px",
      margin: "0 5px",
      cursor: "pointer",
      borderRadius: "4px",
      backgroundColor: "rgb(198, 57, 57)",
      color: "black",
      border: "1px solid #e35538"
    }}
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
    style={{
      backgroundColor: "#0c446f",
      color: "white",
      padding: "8px 20px",
      fontSize: "16px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginTop: "30px",
      marginLeft: "1150px",
      marginRight: "5px"
    }}
>
    Print Report
</button>
)}
<button
  onClick={toggleReportMode}
  style={{
    backgroundColor: "#4c5f08",
    color: "white",
    padding: "8px 20px",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "30px",
    marginLeft: "20px"
  }}
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