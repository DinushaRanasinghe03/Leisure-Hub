import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { jsPDF } from "jspdf"; // Import jsPDF for PDF generation
import "jspdf-autotable"; // Import autotable plugin for tabular data
import ReportGenerator from "./ReportGenerator";
import LayoutAdmin from "./../../components/Layout/LayoutAdmin";

const Users = () => {
  const [auth] = useAuth();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); // State for filtered users
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMembership, setSelectedMembership] = useState(""); // State for selected membership type

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("/api/v1/auth/users");
        console.log("Fetched users data:", data.users);
        // Filter out users with role "admin"
        const regularUsers = data.data.filter((user) => user.role !== 1);
        setUsers(regularUsers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Something went wrong. Please try again later.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    // Filter users based on selectedMembership
    if (selectedMembership) {
      const filtered = users.filter(
        (user) => user.membership === selectedMembership
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [selectedMembership, users]);

  const handleMembershipChange = (event) => {
    setSelectedMembership(event.target.value);
  };

  return (
    <LayoutAdmin title={"Membership Holders-Leisure Hub"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          {/* <div className="col-md-3"> */}
          {/* <AdminMenu /></div> */}
          <div className="col-md-12 mx-auto">
            <ReportGenerator users={filteredUsers} />{" "}
            {/* Render the ReportGenerator component */}
            <br />
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : users && users.length > 0 ? (
              <div>
                <div>
                  <label htmlFor="membershipFilter">
                    Filter by Membership Type:
                  </label>
                  <select
                    id="membershipFilter"
                    value={selectedMembership}
                    onChange={handleMembershipChange}
                  >
                    <option value="">All</option>
                    <option value="individual">Individual</option>
                    <option value="family">Family</option>
                    <option value="corporate standared">
                      Corporate Standered
                    </option>
                    <option value="corporate max">Corporate Max</option>
                    {/* Add more options if needed */}
                  </select>
                </div>
                <br />
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Address</th>
                      <th>DOB</th>
                      <th>Membership Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user._id}>
                        <td>
                          {user.fname} {user.lname}
                        </td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>
                          {user.address1} {user.address2}
                        </td>
                        <td>{user.dob}</td>
                        <td>{user.membership}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No users found.</p>
            )}
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default Users;
