import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";

const Users = () => {
  const [auth] = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state to show loading indicator
  const [error, setError] = useState(null); // Add error state to handle errors
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("/api/v1/auth/users");
        console.log("Fetched users data:", data.users); // Check fetched data
        setUsers(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Something went wrong. Please try again later.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Layout title={"Membership Holders-Leisure Hub"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            {loading ? (
              <p>Loading...</p> // Show loading indicator while fetching data
            ) : error ? (
              <p>{error}</p> // Show error message if there's an error
            ) : users && users.length > 0 ? (
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
                  {users.map((user) => (
                    <tr key={user.id}>
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
            ) : (
              <p>No users found.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
