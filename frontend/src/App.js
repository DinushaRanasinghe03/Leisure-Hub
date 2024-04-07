import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import React from 'react';
import EmployeeForm from './pages/Employee/EmployeeForm';
import EmployeeList from './pages/Employee/EmployeeList';
import UpdateEmployeeForm from './pages/Employee/UpdateEmployeeForm';
import EmployeeLeaveForm from './pages/Employee/EmployeeLeaveForm';
import EmployeeSalaryForm from './pages/Employee/EmployeeSalaryForm';

// Import other pages if you have

function App() {
  return (
    <Router>

      <Routes>
          <Route path="/" element={< EmployeeForm/>} />
          <Route path="/employeelist" element={< EmployeeList/>} />
          <Route path='/updateEmploee/:employeeId' element={<UpdateEmployeeForm />} />
          <Route path='/employeeleave' element={<EmployeeLeaveForm/>}/>
          <Route path='/employeesalary' element={<EmployeeSalaryForm/>}/>
          </Routes>
    
     
    </Router>
  );
}

export default App;
