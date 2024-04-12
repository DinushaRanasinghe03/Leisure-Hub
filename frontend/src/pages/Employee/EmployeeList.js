import React, { useState, useEffect } from 'react';
import AdminStaffMenu from '../../components/Layout/AdminStaffMenu';
import LayoutAdmin from './../../components/Layout/LayoutAdmin';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/Employee/getAllEmployee');
      if (response.ok) {
        const data = await response.json();
        setEmployees(data);
        setFilteredEmployees(data);
      } else {
        console.error('Failed to fetch employee data');
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  const handleUpdate = (employeeId) => {
    // Implement update functionality here
    console.log(`Updating employee with ID: ${employeeId}`);
  };

  const handleDelete = async (employeeId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/Employee/deleteEmployee/${employeeId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        console.log('Employee removed successfully');
        setEmployees(employees.filter(employee => employee._id !== employeeId));
        setFilteredEmployees(filteredEmployees.filter(employee => employee._id !== employeeId));
      } else {
        console.error('Failed to delete employee');
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    filterEmployees(event.target.value);
  };

  const filterEmployees = (query) => {
    const filteredData = employees.filter(item =>
      item.Name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredEmployees(filteredData);
  };

  // Format a date string to remove the time zone
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <LayoutAdmin>
    <div className="container-fluid m-3 p-2">
      <div className="row">
        <div className="col-md-3">
          <AdminStaffMenu />
        </div>
        <div className="col-md-9">
          <h2 className="text-center">Employee List</h2>
          <div className="text-right mb-3">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={handleSearchInputChange}
              style={{
                width: '200px',
                border: '1px solid #ced4da',
                borderRadius: '4px',
                padding: '8px',
                fontSize: '16px',
                outline: 'none'
              }}
            />
          </div>
          <table className="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>NIC</th>
                <th>Role</th>
                <th>DOB</th>
                <th>Contact No</th>
                <th>Email</th>
                <th>Address</th>
                <th>Joined Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map(employee => (
                <tr key={employee._id}>
                  <td>{employee.Name}</td>
                  <td>{employee.NIC}</td>
                  <td>{employee.role}</td>
                  <td>{formatDate(employee.DOB)}</td>
                  <td>{employee.contactNo}</td>
                  <td>{employee.email}</td>
                  <td>{employee.address}</td>
                  <td>{formatDate(employee.joinedDate)}</td>
                  <td>
                    <a href={'/updateEmploee/' + employee._id}>
                      <button className="btn btn-primary">Update</button>
                    </a>
                    <button className="btn btn-danger" onClick={() => handleDelete(employee._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <br/><br/>
    </LayoutAdmin>
  );
}

export default EmployeeList;