import React, { useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import "../../pages/Employee/EmployeeForm.css";
import "../../App.css";

const EmployeeLeaveForm = () => {
  const params = useParams();

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
      leaveStatus: "Not approved",
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

  return (
    <body id="Body">
      <section className="employeeForm">
        <div className="form" style={{ margin: "0 20%" }}>
          <h2 className="title code">Employee Leave Application</h2>
          <div id="role-form-outer-div">
            <form id="form" onSubmit={formik.handleSubmit}>
              <div style={{ marginBottom: "10px" }}>
                <label htmlFor="Name">Name</label>
                <input
                  type="text"
                  name="Name"
                  placeholder="Employee Name"
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
                  onChange={formik.handleChange}
                  value={formik.values.role}
                  required
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label htmlFor="leaveType">Leave Type</label>
                <select
                  name="leaveType"
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
                  placeholder="From Date"
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
                  placeholder="To Date"
                  onChange={formik.handleChange}
                  value={formik.values.leaveTo}
                  onBlur={formik.handleBlur}
                  required
                />
                {formik.touched.leaveTo && formik.errors.leaveTo ? (
                  <div className="error">{formik.errors.leaveTo}</div>
                ) : null}
              </div>
              <div id="form-submit-button" style={{ marginBottom: "10px" }}>
                <button disabled={formik.isSubmitting} type="submit">
                  {formik.isSubmitting ? "Submitting" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </body>
  );
};

export default EmployeeLeaveForm;
