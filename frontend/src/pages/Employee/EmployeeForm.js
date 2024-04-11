import React, { useState } from "react";
import AdminStaffMenu from "../../components/Layout/AdminStaffMenu";
import '../../pages/Employee/EmployeeForm.css';
import { useNavigate } from 'react-router-dom';
import LayoutAdmin from './../../components/Layout/LayoutAdmin';

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
      Name: "",
      NIC: "",
      role: "",
      DOB: "",
      contactNo: "",
      email: "",
      address: "",
      joinedDate: ""
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
      const errors = {};
      if (!formData.Name) {
          errors.Name = "*Required";
      }
      if (!formData.NIC) {
          errors.NIC = "*Required";
      } else if (!/^\d{9}[Vv]?$/.test(formData.NIC) && !/^\d{12}$/.test(formData.NIC)) {
          errors.NIC = "*Must be in XXXXXXXXXV or XXXXXXXXXXXX format";
      }
      if (!formData.role) {
          errors.role = "*Required";
      }
      if (!formData.DOB) {
          errors.DOB = "*Required";
      }
      if (!formData.contactNo) {
          errors.contactNo = "*Required";
      } else if (formData.contactNo.length !== 10) {
          errors.contactNo = "*Must be 10 digits";
      } else if (!/^\d+$/.test(formData.contactNo)) {
          errors.contactNo = "*Contact number must contain only digits";
      }
      if (!formData.email) {
          errors.email = "*Required";
      } else if (formData.email.length < 5) {
          errors.email = "*Must be 5 characters or more";
      } else if (formData.email.indexOf('@') === -1) {
          errors.email = "*Must contain an '@' symbol";
      }
      if (!formData.address) {
          errors.address = "*Required";
      }
      if (!formData.joinedDate) {
          errors.joinedDate = "*Required";
      }
      setErrors(errors);
      return errors;
  }

  const handleChange = (e) => {
      setFormData({
          ...formData,
          [e.target.name]: e.target.value
      });
  }

  const handleSubmit = async (e) => {
      e.preventDefault();
      const validationErrors = validate();
      if (Object.keys(validationErrors).length === 0) {
          try {
              const response = await fetch('http://localhost:8080/api/v1/Employee/addEmployee', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(formData),
              });
              if (response.ok) {
                  window.alert('Data has been inserted successfully');
                  console.log('Successfully added to list');
                  navigate('/employeelist');
              } else {
                  console.error('Failed to submit form:', response.status, response.statusText);
              }
          } catch (error) {
              console.error('Error submitting form:', error);
          }
      }
  }

  return (
    <LayoutAdmin><br/><br/>
      <div className="container-fluid">
          <div className="row">
              <div className="col-md-3">
                  <AdminStaffMenu />
              </div>
              <div className="col-md-9">
                  <section className="employeeForm">
                      <div className="form">
                          <h2 className="title code">Employee Registration</h2>
                          <div id="role-form-outer-div">
                              <form id="form" onSubmit={handleSubmit}>
                                  <div className="form-group">
                                      <label>Name</label>
                                      <input
                                          type="text"
                                          name="Name"
                                          className="form-control"
                                          placeholder="Name"
                                          value={formData.Name}
                                          onChange={handleChange}
                                          required
                                      />
                                      {errors.Name && <div className="error">{errors.Name}</div>}
                                  </div>
                                  <br/>
                                  <div className="form-group">
                                      <label>NIC</label>
                                      <input
                                          type="text"
                                          name="NIC"
                                          className="form-control"
                                          placeholder="NIC"
                                          value={formData.NIC}
                                          onChange={handleChange}
                                          required
                                      />
                                      {errors.NIC && <div className="error">{errors.NIC}</div>}
                                  </div>
                                  <br/>
                                  <div className="form-group">
                                      <label>Role</label>
                                      <input
                                          type="text"
                                          name="role"
                                          className="form-control"
                                          placeholder="Role"
                                          value={formData.role}
                                          onChange={handleChange}
                                          required
                                      />
                                      {errors.role && <div className="error">{errors.role}</div>}
                                  </div>
                                  <br/>
                                  <div className="form-group">
                                      <label>Date of Birth</label>
                                      <input
                                          type="date"
                                          name="DOB"
                                          className="form-control"
                                          placeholder="Date of Birth"
                                          value={formData.DOB}
                                          onChange={handleChange}
                                          required
                                      />
                                      {errors.DOB && <div className="error">{errors.DOB}</div>}
                                  </div>
                                  <br/>
                                  <div className="form-group">
                                      <label>Contact No</label>
                                      <input
                                          type="text"
                                          name="contactNo"
                                          className="form-control"
                                          placeholder="Contact No"
                                          value={formData.contactNo}
                                          onChange={handleChange}
                                          required
                                      />
                                      {errors.contactNo && <div className="error">{errors.contactNo}</div>}
                                  </div>
                                  <br/>
                                  <div className="form-group">
                                      <label>Email</label>
                                      <input
                                          type="email"
                                          name="email"
                                          className="form-control"
                                          placeholder="Email"
                                          value={formData.email}
                                          onChange={handleChange}
                                          required
                                      />
                                      {errors.email && <div className="error">{errors.email}</div>}
                                  </div>
                                  <br/>
                                  <div className="form-group">
                                      <label>Address</label>
                                      <input
                                          type="text"
                                          name="address"
                                          className="form-control"
                                          placeholder="Address"
                                          value={formData.address}
                                          onChange={handleChange}
                                          required
                                      />
                                      {errors.address && <div className="error">{errors.address}</div>}
                                  </div>
                              <br/>
                                  <div className="form-group">
                                      <label>Date Of Joining</label>
                                      <input
                                          type="date"
                                          name="joinedDate"
                                          className="form-control"
                                          placeholder="Date Of Joining"
                                          value={formData.joinedDate}
                                          onChange={handleChange}
                                          required
                                      />
                                      {errors.joinedDate && <div className="error">{errors.joinedDate}</div>}
                                  </div>
                                  <br/>
                                  <div className="row">
                                  <div className="col-md-12 text-center">
                                  <button type="submit" className="btn btn-primary">Submit</button>
                                  </div>
                                  </div>

                              </form>
                          </div>
                      </div>
                  </section>
              </div>
          </div>
      </div>
      <br/><br/>
      </LayoutAdmin>
  );
}

export default EmployeeForm;
