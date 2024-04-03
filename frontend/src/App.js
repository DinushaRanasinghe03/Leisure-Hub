import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Axios from "axios";

import EmployeeForm from './pages/Employee/EmployeeForm.js';

function App() {
  return (
    <Routes>

        {/* Employee Management pages routing */}
        
        <Route path="/employeeRegister" element={<EmployeeForm />} />

    </Routes>
  );
}

export default App;

