import React from 'react';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../../pages/Employee/EmployeeForm.css';
import '../../App.css';
import AdminStaffMenu from '../../components/Layout/AdminStaffMenu';
import LayoutAdmin from './../../components/Layout/LayoutAdmin';
 
const EmployeeSalaryForm = () => {
  const navigate = useNavigate();
  const params = useParams();
 
  const calculateOTTotal = (values) => {
    const otHours = parseFloat(values.otHours) || 0;
    const otRate = parseFloat(values.otRate) || 0;
    const basicSal = parseFloat(values.basicSal) || 0;
    const bonus = parseFloat(values.bonus) || 0;
    const otTotal = otHours * otRate;
    const totalSal = otTotal + basicSal + bonus;
    return { otTotal: otTotal.toFixed(2), totalSal: totalSal.toFixed(2) };
  };
 
  const validate = (values) => {
    const errors = {};
   
    if (!values.month) {
      errors.month = '*Required';
    } else {
      const selectedDate = new Date(values.month);
      const currentDate = new Date();
      if (selectedDate > currentDate) {
        errors.month = 'Month cannot be a future month';
      }
    }
 
    if (!values.basicSal) {
      errors.basicSal = '*Required';
    }
 
    if (!values.otHours) {
      errors.otHours = '*Required';
    } else if (parseFloat(values.otHours) < 0) {
      errors.otHours = 'OT Hours cannot be a negative value';
    }
 
    if (!values.otRate) {
      errors.otRate = '*Required';
    } else if (parseFloat(values.otRate) < 0) {
      errors.otRate = 'OT Rate cannot be a negative value';
    }
 
    if (!values.bonus) {
      errors.bonus = '*Required';
    }
 
    return errors;
  };
 
  const formik = useFormik({
    initialValues: {
      NIC: '',
      basicSal: '',
      otHours: '',
      otRate: '',
      bonus: '',
      month: '',
      otTotal: '',
      totalSal: '',
    },
    validate,
    onSubmit: async (values) => {
      try {
        const { otTotal, totalSal } = calculateOTTotal(values);
        const response = await fetch('http://localhost:8080/api/v1/EmployeeSalary/addEmployeeSalary', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...values, otTotal, totalSal }),
        });
        if (response.ok) {
          window.alert('Data has been inserted successfully');
          navigate('/employeesalarylist');
        } else {
          console.error('Failed to submit form:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
  });
 
  return (
    <LayoutAdmin><br/>
      <body id="Body">
        <div className="container-fluid m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <AdminStaffMenu />
            </div>
            <div className="col-md-9">
              <h2 className="text-center">Employee Salary Assignment</h2><br/>
              <form id="form" onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="NIC">Employee NIC</label>
                  <input
                    type="text"
                    id="NIC"
                    name="NIC"
                    placeholder="Employee NIC"
                    onChange={formik.handleChange}
                    value={formik.values.NIC}
                    className="form-control"
                    required
                  />
                  {formik.touched.NIC && formik.errors.NIC ? <div className="error" style={{ color: 'red' }}>{formik.errors.NIC}</div> : null}
                </div>
                <br/>
                <div className="form-group">
                  <label htmlFor="month">Select Month</label>
                  <input
                    type="month"
                    id="month"
                    name="month"
                    placeholder="Month"
                    onChange={formik.handleChange}
                    value={formik.values.month}
                    className="form-control"
                    required
                  />
                  {formik.touched.month && formik.errors.month ? <div className="error" style={{ color: 'red' }}>{formik.errors.month}</div> : null}
                </div>
                <br/>
                <div className="form-group">
                  <label htmlFor="basicSal">Basic Salary</label>
                  <input
                    type="number"
                    id="basicSal"
                    name="basicSal"
                    placeholder="Basic Salary"
                    onChange={formik.handleChange}
                    value={formik.values.basicSal}
                    onBlur={() => {
                      const { otTotal, totalSal } = calculateOTTotal(formik.values);
                      formik.setFieldValue('otTotal', otTotal);
                      formik.setFieldValue('totalSal', totalSal);
                    }}
                    className="form-control"
                    required
                  />
                  {formik.touched.basicSal && formik.errors.basicSal ? <div className="error" style={{ color: 'red' }}>{formik.errors.basicSal}</div> : null}
                </div>
                <br/>
                <div className="form-group">
                  <label htmlFor="otHours">OT Hours</label>
                  <input
                    type="number"
                    id="otHours"
                    name="otHours"
                    placeholder="OT Hours"
                    onChange={formik.handleChange}
                    value={formik.values.otHours}
                    onBlur={() => {
                      const { otTotal, totalSal } = calculateOTTotal(formik.values);
                      formik.setFieldValue('otTotal', otTotal);
                      formik.setFieldValue('totalSal', totalSal);
                    }}
                    className="form-control"
                    required
                  />
                  {formik.touched.otHours && formik.errors.otHours ? <div className="error" style={{ color: 'red' }}>{formik.errors.otHours}</div> : null}
                </div>
                <br/>
                <div className="form-group">
                  <label htmlFor="otRate">OT Rate</label>
                  <input
                    type="number"
                    id="otRate"
                    name="otRate"
                    placeholder="OT Rate"
                    onChange={formik.handleChange}
                    value={formik.values.otRate}
                    onBlur={() => {
                      const { otTotal, totalSal } = calculateOTTotal(formik.values);
                      formik.setFieldValue('otTotal', otTotal);
                      formik.setFieldValue('totalSal', totalSal);
                    }}
                    className="form-control"
                    required
                  />
                  {formik.touched.otRate && formik.errors.otRate ? <div className="error" style={{ color: 'red' }}>{formik.errors.otRate}</div> : null}
                </div>
                <br/>
                <div className="form-group">
                  <label htmlFor="bonus">Bonus</label>
                  <input
                    type="number"
                    id="bonus"
                    name="bonus"
                    placeholder="Bonus"
                    onChange={formik.handleChange}
                    value={formik.values.bonus}
                    onBlur={() => {
                      const { otTotal, totalSal } = calculateOTTotal(formik.values);
                      formik.setFieldValue('otTotal', otTotal);
                      formik.setFieldValue('totalSal', totalSal);
                    }}
                    className="form-control"
                    required
                  />
                  {formik.touched.bonus && formik.errors.bonus ? <div className="error" style={{ color: 'red' }}>{formik.errors.bonus}</div> : null}
                </div>
                <br/>
                <div className="form-group">
                  <label htmlFor="otTotal">OT Total</label>
                  <input
                    type="number"
                    id="otTotal"
                    name="otTotal"
                    placeholder="OT Total"
                    value={formik.values.otTotal}
                    className="form-control"
                    readOnly
                    required
                  />
                </div>
                <br/>
                <div className="form-group">
                  <label htmlFor="totalSal">Total Salary</label>
                  <input
                    type="number"
                    id="totalSal"
                    name="totalSal"
                    placeholder="Total Salary"
                    value={formik.values.totalSal}
                    className="form-control"
                    readOnly
                    required
                  />
                </div>
                <br/>
                <div className="form-submit-button" id="form-submit-button" style={{ display: 'flex', justifyContent: 'center' }}>
                  <button
                    disabled={formik.isSubmitting}
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '150px' }} // Adjust button width as needed
                  >
                    {formik.isSubmitting ? 'Submitting' : 'Submit'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </body>
    </LayoutAdmin>
  );
 
};
 
export default EmployeeSalaryForm;
 