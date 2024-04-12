import React, { useEffect } from "react";
import { useFormik } from 'formik';
import { useParams, useNavigate } from 'react-router-dom';
import LayoutAdmin from './../../components/Layout/LayoutAdmin';

const EmployeeSalaryFormEdit = () => {

  const params = useParams();
  const navigate = useNavigate();

  const calculateOTTotal = () => {
    const otHours = parseFloat(formik.values.otHours) || 0;
    const otRate = parseFloat(formik.values.otRate) || 0;
    const basicSal = parseFloat(formik.values.basicSal) || 0;
    const bonus = parseFloat(formik.values.bonus) || 0;
    const otTotal = otHours * otRate;
    formik.setFieldValue('otTotal', otTotal.toFixed(2));
    const totalSal = otTotal + basicSal + bonus;
    formik.setFieldValue('totalSal', totalSal.toFixed(2));
  };

  const validate = values => {
    const errors = {};

    if (!values.month) {
      errors.month = "*Required";
    }
    if (!values.basicSal) {
      errors.basicSal = "*Required";
    }
    if (!values.bonus) {
      errors.bonus = "*Required";
    }

    return errors;
  }

  const getEmployeeSalaryDetails = async () => {
    console.warn(params)
    let result = await fetch(`http://localhost:8080/api/v1/EmployeeSalary/getEmployeeSalary/${params.id}`);
    result = await result.json();
    console.warn(result)

    formik.setValues({
      NIC: result.NIC,
      basicSal: result.basicSal,
      otHours: result.otHours,
      otRate: result.otRate,
      bonus: result.bonus,
      month: result.month.substr(0, 7),
      otTotal: result.otTotal,
      totalSal: result.totalSal
    });

  }

  useEffect(() => {
    getEmployeeSalaryDetails();
  }, [])

  const updateEmployeeSalary = async (data) => {
    console.warn(data)
    let result = await fetch(`http://localhost:8080/api/v1/EmployeeSalary/updateEmployeeSalary/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    result = await result.json()
    console.warn(result)
    if (result) {
      window.alert('Data has been updated successfully');
    }
    navigate(`/employeesalarylist`);
  }

  const formik = useFormik({
    initialValues: {
      NIC: "",
      basicSal: "",
      otHours: "",
      otRate: "",
      bonus: "",
      month: "",
      otTotal: "",
      totalSal: ""
    },
    validate,
    onSubmit: () => {
      updateEmployeeSalary(formik.values)
    }
  });

  return (
    <LayoutAdmin><br/>
    <body id='Body'>
      <section className="employeeForm">
        <div className='form'>
          <h2 className="title code">Employee Salary Update</h2>
          <div id="role-form-outer-div">
            <form id="form" onSubmit={formik.handleSubmit}>

              <div className="form-group" style={{ marginLeft: '10px', marginRight: '10px' }}>
                <label>Employee NIC</label>
                <input
                  type="text"
                  className="form-control"
                  name="NIC"
                  placeholder="Employee NIC"
                  onChange={formik.handleChange}
                  value={formik.values.NIC}
                  readOnly
                />
              </div>
<br/>
              <div className="form-group" style={{ marginLeft: '10px', marginRight: '10px' }}>
                <label>Select Month</label>
                <input
                  type="month"
                  className="form-control"
                  name="month"
                  placeholder="Month"
                  onChange={formik.handleChange}
                  value={formik.values.month}
                  onBlur={formik.handleBlur}
                  required
                />
                {formik.touched.month && formik.errors.month ? <div className="error">{formik.errors.month}</div> : null}
              </div>
<br/>
              <div className="form-group" style={{ marginLeft: '10px', marginRight: '10px' }}>
                <label>Basic Salary</label>
                <input
                  type="number"
                  className="form-control"
                  name="basicSal"
                  placeholder="Basic Salary"
                  onChange={formik.handleChange}
                  value={formik.values.basicSal}
                  onBlur={() => calculateOTTotal()}
                  required
                />
                {formik.touched.basicSal && formik.errors.basicSal ? <div className="error">{formik.errors.basicSal}</div> : null}
              </div>
<br/>
              <div className="form-group" style={{ marginLeft: '10px', marginRight: '10px' }}>
                <label>OT Hours</label>
                <input
                  type="number"
                  className="form-control"
                  name="otHours"
                  placeholder="OT Hours"
                  onChange={formik.handleChange}
                  value={formik.values.otHours}
                  onBlur={() => calculateOTTotal()}
                  required
                />
                {formik.touched.otHours && formik.errors.otHours ? <div className="error">{formik.errors.otHours}</div> : null}
              </div>
<br/>
              <div className="form-group" style={{ marginLeft: '10px', marginRight: '10px' }}>
                <label>OT Rate</label>
                <input
                  type="number"
                  className="form-control"
                  name="otRate"
                  placeholder="OT Rate"
                  onChange={formik.handleChange}
                  value={formik.values.otRate}
                  onBlur={() => calculateOTTotal()}
                  required
                />
                {formik.touched.otRate && formik.errors.otRate ? <div className="error">{formik.errors.otRate}</div> : null}
              </div>
<br/>
              <div className="form-group" style={{ marginLeft: '10px', marginRight: '10px' }}>
                <label>OT Total</label>
                <input
                  type="number"
                  className="form-control"
                  name="otTotal"
                  placeholder="OT Total"
                  onChange={formik.handleChange}
                  value={formik.values.otTotal}
                  readOnly
                />
              </div>
<br/>
              <div className="form-group" style={{ marginLeft: '10px', marginRight: '10px' }}>
                <label>Bonus</label>
                <input
                  type="number"
                  className="form-control"
                  name="bonus"
                  placeholder="Bonus"
                  onChange={formik.handleChange}
                  value={formik.values.bonus}
                  onBlur={() => calculateOTTotal()}
                  required
                />
                {formik.touched.bonus && formik.errors.bonus ? <div className="error">{formik.errors.bonus}</div> : null}
              </div>
<br/>
              <div className="form-group" id="form-submit-button" style={{ marginLeft: '10px', marginRight: '10px' }}>
                <button className="btn btn-primary" disabled={formik.isSubmitting} type="submit">{formik.isSubmitting ? 'Updating' : 'Update'}</button>
              </div>

            </form>
          </div>
        </div>
      </section>
    </body>
    </LayoutAdmin>
  );
}

export default EmployeeSalaryFormEdit;
