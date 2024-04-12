import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminStaffMenu = () => {
  return (
    <>
      <div className='text-center'>
        <h4>Staff Management Panel</h4>
        <div className="list-group">
          <div className="row">
            <div className="col">
              <NavLink to="/employeeregister" className="list-group-item list-group-item-action">Employee Registration </NavLink>
            </div><br></br><br></br>
          </div>
          <div className="row">
            <div className="col">
              <NavLink to="/employeelist" className="list-group-item list-group-item-action">Employee List</NavLink>
            </div><br></br><br></br>
          </div>
          <div className="row">
            <div className="col">
              <NavLink to="/employeesalary" className="list-group-item list-group-item-action">Employee Salary Form</NavLink>
            </div><br></br><br></br>
          </div>
          <div className="row">
            <div className="col">
              <NavLink to="/employeesalarylist" className="list-group-item list-group-item-action">Employee Salary List</NavLink>
            </div><br></br><br></br>
          </div>
          <div className="row">
            <div className="col">
              <NavLink to="/AdminLeave" className="list-group-item list-group-item-action">Leave Requests</NavLink>
            </div><br></br><br></br>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default AdminStaffMenu;