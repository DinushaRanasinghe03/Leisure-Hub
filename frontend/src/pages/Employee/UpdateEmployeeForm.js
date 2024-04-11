import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import LayoutAdmin from './../../components/Layout/LayoutAdmin';

function UpdateEmployee() {
    const { employeeId } = useParams();
    const navigate = useNavigate();

    const [employeeDetails, setEmployeeDetails] = useState({
        Name: '',
        NIC: '',
        role: '',
        DOB: '',
        contactNo: '',
        email: '',
        address: '',
        joinedDate: ''
    });

    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/employee/getEmployee/${employeeId}`);
                const data = response.data;

                // Convert DOB and joinedDate to the correct format
                const formattedDOB = moment(data.DOB).format("YYYY-MM-DD");
                const formattedJoinedDate = moment(data.joinedDate).format("YYYY-MM-DD");
            
                // Update the state with the formatted dates
                setEmployeeDetails({
                    ...data,
                    DOB: formattedDOB,
                    joinedDate: formattedJoinedDate
                });
            } catch (error) {
                console.error('Error fetching employee details:', error);
            }
        };
        fetchEmployeeDetails();
    }, [employeeId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8080/api/v1/employee/updateEmployee/${employeeId}`, employeeDetails);
            console.log(response.data);
            alert("Employee details updated successfully");
            navigate(`/employeeList`); // Redirect to the employee list page after successful update
        } catch (error) {
            console.error('Error updating employee details:', error);
            alert('Update unsuccessful');
        }
    };

    const handleCancel = () => {
        navigate(`/employeeList`);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEmployeeDetails({ ...employeeDetails, [name]: value });
    };

    return (
        <LayoutAdmin><br/>
        <div className="container mt-4">
            <h2>Update Employee Details</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="Name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="Name" name="Name" value={employeeDetails.Name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="NIC" className="form-label">NIC</label>
                    <input type="text" className="form-control" id="NIC" name="NIC" value={employeeDetails.NIC} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="role" className="form-label">Role</label>
                    <input type="text" className="form-control" id="role" name="role" value={employeeDetails.role} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="DOB" className="form-label">DOB</label>
                    <input type="date" className="form-control" id="DOB" name="DOB" value={employeeDetails.DOB} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="contactNo" className="form-label">Contact No</label>
                    <input type="text" className="form-control" id="contactNo" name="contactNo" value={employeeDetails.contactNo} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={employeeDetails.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" className="form-control" id="address" name="address" value={employeeDetails.address} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="joinedDate" className="form-label">Joined Date</label>
                    <input type="date" className="form-control" id="joinedDate" name="joinedDate" value={employeeDetails.joinedDate} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary me-2">Update</button>
                <button 
  type="button" 
  className="btn btn-secondary" 
  onClick={handleCancel}
  style={{ backgroundColor: 'red', color: 'white', borderRadius: '5px' }}
>
  Cancel
</button>

            </form>
        </div>
        <br/><br/>
        </LayoutAdmin>
    );
}

export default UpdateEmployee;
