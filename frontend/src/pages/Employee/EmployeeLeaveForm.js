import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import moment from 'moment';
 
const EmployeeLeaveForm = () => {
  const params = useParams();
  const navigate = useNavigate();
 
  const validate = (values) => {
    const errors = {};
 
    if (!values.role) {
      errors.role = "*Required";
    }
    if (!values.leaveType) {
      errors.leaveType = "*Required";
    }
    if (!values.leaveFrom) {
      errors.leaveFrom = "*Required";
    }
    if (!values.leaveTo) {
      errors.leaveTo = "*Required";
    }
    return errors;
  };
 
  const formik = useFormik({
    initialValues: {
      Name: "",
      role: "",
      leaveType: "",
      leaveFrom: "",
      leaveTo: "",
      leaveStatus: "Pending",
    },
    validate,
    onSubmit: async (values) => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/EmployeeLeave/addEmployeeLeave`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );
        if (response.ok) {
          window.alert("Data has been inserted successfully");
          console.log("Successfully added to list");
        } else {
          console.error(
            "Failed to submit form:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });
 
  const [leaveList, setLeaveList] = useState([]);
 
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
 
  const handleLogout = () => {
    navigate("/");
  };
 
  return (
    <div>
      <div className="col-md-9" style={{ margin: "0 auto", textAlign: "center" }}>
        <h2>Employee Leave List</h2><br></br>
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
      <body id="Body">
        <section className="employeeForm">
          <div className="form" style={{ margin: "0 20%" }}>
            <h2 className="title code">Employee Leave Application</h2><br></br>
            <div id="role-form-outer-div">
              <form id="form" onSubmit={formik.handleSubmit}>
                <div style={{ marginBottom: "10px" }}>
                  <label htmlFor="Name">Name</label>
                  <input
                    type="text"
                    name="Name"
                    placeholder="Employee Name"
                    style={{ width: "100%", padding: "5px", borderRadius: "5px" }}
                    onChange={formik.handleChange}
                    value={formik.values.Name}
                    required
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <label htmlFor="role">Role</label>
                  <input
                    type="text"
                    name="role"
                    placeholder="Role"
                    style={{ width: "100%", padding: "5px", borderRadius: "5px" }}
                    onChange={formik.handleChange}
                    value={formik.values.role}
                    required
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <label htmlFor="leaveType">Leave Type</label>
                  <select
                    name="leaveType"
                    style={{ width: "100%", padding: "5px", borderRadius: "5px" }}
                    onChange={formik.handleChange}
                    value={formik.values.leaveType}
                    onBlur={formik.handleBlur}
                    required
                  >
                    <option value="">Select your option</option>
                    <option value="annual">Annual</option>
                    <option value="medical">Medical</option>
                    <option value="casual">Casual</option>
                  </select>
                  {formik.touched.leaveType && formik.errors.leaveType ? (
                    <div className="error">{formik.errors.leaveType}</div>
                  ) : null}
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <label htmlFor="leaveFrom">Leave From</label>
                  <input
                    type="date"
                    name="leaveFrom"
                    style={{ width: "100%", padding: "5px", borderRadius: "5px" }}
                    onChange={formik.handleChange}
                    value={formik.values.leaveFrom}
                    onBlur={formik.handleBlur}
                    required
                  />
                  {formik.touched.leaveFrom && formik.errors.leaveFrom ? (
                    <div className="error">{formik.errors.leaveFrom}</div>
                  ) : null}
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <label htmlFor="leaveTo">Leave To</label>
                  <input
                    type="date"
                    name="leaveTo"
                    style={{ width: "100%", padding: "5px", borderRadius: "5px" }}
                    onChange={formik.handleChange}
                    value={formik.values.leaveTo}
                    onBlur={formik.handleBlur}
                    required
                  />
                  {formik.touched.leaveTo && formik.errors.leaveTo ? (
                    <div className="error">{formik.errors.leaveTo}</div>
                  ) : null}
                </div>
                <div id="form-submit-button" style={{ textAlign: "center", marginBottom: "10px" }}>
                  <button disabled={formik.isSubmitting} type="submit" style={{ width: "10%", padding: "10px", borderRadius: "5px", backgroundColor: "#007bff", color: "#fff", border: "none" }}>
                    {formik.isSubmitting ? "Submitting" : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </body>
      <div style={{ position: "absolute", top: "20px", right: "20px" }}>
        <button onClick={handleLogout} style={{ padding: "10px", borderRadius: "5px", backgroundColor: "red", color: "#fff", border: "none" }}>Logout</button>
      </div>
    </div>
  );
};
 
export default EmployeeLeaveForm;
