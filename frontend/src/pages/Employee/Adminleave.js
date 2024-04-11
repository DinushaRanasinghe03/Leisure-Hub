import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from 'react-router-dom';
import moment from 'moment';
import AdminStaffMenu from "../../components/Layout/AdminStaffMenu";
import LayoutAdmin from './../../components/Layout/LayoutAdmin';

const Adminleave = () => {
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

  const handleViewClick = (leaveId) => {
    console.log(`Viewing leave request with ID ${leaveId}`);
  };

  return (
    <LayoutAdmin><br/>
    <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <AdminStaffMenu />
        </div>
        <div className="col-md-9">
          <h2>Employee Leave Request</h2><br/>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Leave Type</th>
                <th>Leave From</th>
                <th>Leave To</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {leaveList.map(leave => (
                <tr key={leave._id}>
                  <td>{leave.Name}</td>
                  <td>{leave.role}</td>
                  <td>{leave.leaveType}</td>
                  <td>{moment(leave.leavefrom).format("YYYY-MM-DD")}</td>
                  <td>{moment(leave.leaveto).format("YYYY-MM-DD")}</td>
                  <td>{leave.leaveStatus}</td>
                  <td>
                    <Link to={`/adminleaveupdate/${leave._id}`}>
                      <button className="btn btn-primary">Update</button>
                    </Link>
                  </td>
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

export default Adminleave;
