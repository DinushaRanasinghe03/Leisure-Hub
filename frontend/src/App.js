import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import React from 'react';
import EmployeeForm from './pages/Employee/EmployeeForm';
import EmployeeList from './pages/Employee/EmployeeList';
import UpdateEmployeeForm from './pages/Employee/UpdateEmployeeForm';
import EmployeeLeaveForm from './pages/Employee/EmployeeLeaveForm';
import EmployeeLeaveList from './pages/Employee/EmployeeLeaveList';
import Adminleave from './pages/Employee/Adminleave';
import Adminleaveupdate from './pages/Employee/Adminleaveupdate';
import EmployeeSalaryForm from './pages/Employee/EmployeeSalaryForm';
import EmployeeSalaryList from './pages/Employee/EmployeeSalaryList';
import UpdateEmployeeSalaryForm from './pages/Employee/UpdateEmployeeSalaryForm';


// Import other pages if you have

function App() {
  return (
    <Router>

      <Routes>
          <Route path="/employeeregister" element={< EmployeeForm/>} />
          <Route path="/employeelist" element={< EmployeeList/>} />
          <Route path='/updateEmploee/:employeeId' element={<UpdateEmployeeForm />} />
          <Route path='/employeeleave' element={<EmployeeLeaveForm/>}/>
          <Route path="/employeeleavelist" element={< EmployeeLeaveList/>} />
          <Route path='/Adminleave' element={<Adminleave />} />
          <Route path='/adminleaveupdate/:leaveId' element={<Adminleaveupdate />} />
          <Route path='/employeesalary' element={<EmployeeSalaryForm/>}/>
          <Route path='/employeesalarylist' element={<EmployeeSalaryList/>}/> 
          <Route path="/updateEmployeeSalary/:id" element={<UpdateEmployeeSalaryForm />} />
          </Routes>
    
     
    </Router>
  );
}

export default App;
