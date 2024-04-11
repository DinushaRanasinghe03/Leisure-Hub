import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import '../../App.css'


function AdminLeaveUpdate() {
    const { leaveId } = useParams();
    const navigate = useNavigate();

    const [leaveDetails, setLeaveDetails] = useState({
        Name: '',
        leaveType: '',
        leaveFrom: '',
        leaveTo: '',
        leaveStatus: ''
    });

    useEffect(() => {
        const fetchLeaveDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/employeeleave/getEmployeeLeave/${leaveId}`);
                const data = response.data;

                // Convert leaveFrom and leaveTo to the correct format
                const formattedLeaveFrom = moment(data.leaveFrom).format("YYYY-MM-DD");
                const formattedLeaveTo = moment(data.leaveTo).format("YYYY-MM-DD");

                // Update the state with the formatted dates
                setLeaveDetails({
                    ...data,
                    leaveFrom: formattedLeaveFrom,
                    leaveTo: formattedLeaveTo
                });
            } catch (error) {
                console.error('Error fetching leave details:', error);
            }
        };
        fetchLeaveDetails();
    }, [leaveId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8080/api/v1/employeeleave/updateEmployeeLeave/${leaveId}`, leaveDetails);
            console.log(response.data);
            alert("Leave details updated successfully");
            navigate(`/employeeLeaveList`); // Redirect to the employee leave list page after successful update
        } catch (error) {
            console.error('Error updating leave details:', error);
            alert('Update unsuccessful');
        }
    };

    const handleCancel = () => {
        navigate(`/employeeLeaveList`);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLeaveDetails({ ...leaveDetails, [name]: value });
    };

    return (
        <div className="container mt-4">
            <h2>Update Employee Leave Details</h2>
            <form onSubmit={handleSubmit}>
    <div className="mb-3">
        <label htmlFor="Name" className="form-label">Name</label>
        <input type="text" className="form-control" id="Name" name="Name" value={leaveDetails.Name} onChange={handleChange} required readonly />
    </div>
    <div className="mb-3">
        <label htmlFor="leaveType" className="form-label">Leave Type</label>
        <input type="text" className="form-control" id="leaveType" name="leaveType" value={leaveDetails.leaveType} onChange={handleChange} required readonly />
    </div>
    <div className="mb-3">
        <label htmlFor="leaveFrom" className="form-label">Leave From</label>
        <input type="date" className="form-control" id="leaveFrom" name="leaveFrom" value={leaveDetails.leaveFrom} onChange={handleChange} required readonly />
    </div>
    <div className="mb-3">
        <label htmlFor="leaveTo" className="form-label">Leave To</label>
        <input type="date" className="form-control" id="leaveTo" name="leaveTo" value={leaveDetails.leaveTo} onChange={handleChange} required readonly />
    </div>
    <div className="mb-3">
        <label htmlFor="leaveStatus" className="form-label">Leave Status</label>
        <input type="text" className="form-control" id="leaveStatus" name="leaveStatus" value={leaveDetails.leaveStatus} onChange={handleChange} required />
    </div>
    <button type="submit" className="btn btn-primary me-2">Update</button>
    <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
</form>
        </div>
    );
}

export default AdminLeaveUpdate;