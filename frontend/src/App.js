import {Routes,Route} from 'react-router-dom'
import React, { useEffect, useState } from "react";
import EmployeeForm from './pages/Employee/EmployeeForm.js';
import Axios from "axios";

function App() {

  //const [data, setData] = useState();

  //const getData = async () => {
      //const response = await Axios.get("http://localhost:8080/api/v1/employee");
      //setData(response.data)
  //}

 // useEffect(() => {
      //getData()

  //}, []);

  return (
    <div className="App">
      <EmployeeForm/>
    </div>
    
  );
}

export default App;

