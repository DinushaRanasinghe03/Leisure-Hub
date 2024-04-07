import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
//import '../../App.css'

function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/Employee/getAllEmployee');
      if (response.ok) {
        const data = await response.json();
        setEmployees(data);
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
        // Remove the deleted employee from the state
        setEmployees(employees.filter(employee => employee._id !== employeeId));
      } else {
        console.error('Failed to delete employee');
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div>
      <h2>Employee List</h2>
      <Table striped bordered hover>
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
          {employees.map(employee => (
            <tr key={employee._id}>
              <td>{employee.Name}</td>
              <td>{employee.NIC}</td>
              <td>{employee.role}</td>
              <td>{employee.DOB}</td>
              <td>{employee.contactNo}</td>
              <td>{employee.email}</td>
              <td>{employee.address}</td>
              <td>{employee.joinedDate}</td>
              <td>
              <a href={'/updateEmploee/' + employee._id}>
      <button variant="primary">Update</button>
   </a>
                <Button variant="danger" onClick={() => handleDelete(employee._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default EmployeeList;
