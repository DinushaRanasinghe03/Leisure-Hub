import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import moment from 'moment';
import AdminStaffMenu from "../../components/Layout/AdminStaffMenu";
import LayoutAdmin from './../../components/Layout/LayoutAdmin';
 
const EmployeeLeaveList = () => {
  const [leaveList, setLeaveList] = useState([]);
  const { employeeId } = useParams();
 
  const fetchEmployeeData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/employeeleave/getAllEmployeeLeave`);
      setLeaveList(response.data);
    } catch (error) {
      console.error('Error fetching leave data:', error);
    }
  };
 
  useEffect(() => {
    fetchEmployeeData();
  }, []);
 
  return (
    <LayoutAdmin><br/>
    <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <AdminStaffMenu />
        </div>
        <div className="col-md-9">
          <h2>Employee Leave List</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Leave Type</th>
                <th>Leave From</th>
                <th>Leave To</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveList.map(leave => (
                <tr key={leave._id}>
                  <td>{leave.Name}</td>
                  <td>{leave.role}</td>
                  <td>{leave.leaveType}</td>
                  <td>{moment(leave.leaveFrom).format("YYYY-MM-DD")}</td>
                  <td>{moment(leave.leaveTo).format("YYYY-MM-DD")}</td>
                  <td>{leave.leaveStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </LayoutAdmin>
  );
};
 
export default EmployeeLeaveList;
