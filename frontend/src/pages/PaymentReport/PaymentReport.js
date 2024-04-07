import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

const PaymentReport = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/payments');
      console.log("response",response.data);
      setAllData(response.data);
    } catch (error) {
      console.error('error:', error);
    }
  };

  const submitData = async () => {
    let data = {
      name: name,
      number: number,
      address: address,
      email: email
    };

    try {
      const response = await axios.post('/api/payments', data);
      console.log('data', response.data);
      fetchData(); // Fetch data again after adding new data
    } catch (error) {
      console.error('error:', error);
    }
  };

  const handleSelect = async(rowData) => {
    window.location.href = `/edit?id=${rowData._id}`
    /*try {
        const response = await axios.get(`/api/payments/${rowData._id}`);
        console.log("response1",response.data);
        setName(response.data.name);
        setNumber(response.data.number);
        setAddress(response.data.address);
        setEmail(response.data.email);

       // setAllData(response.data);
      } catch (error) {
        console.error('error:', error);
      }*/

    // Handle select button click for a specific row
    console.log("Selected row:", rowData);
    // Add your logic here
  };

  const generateReport = () => {
    // Here you would write the logic to generate the report based on the data in 'allData'
    // You can use libraries like pdfmake or react-pdf to generate PDF reports, or simply format the data into a CSV format
    // For simplicity, let's just log the data to the console for now
    console.log("Generating report with data:", allData);
  };

  return (
    <div>
      <div className="table-container">
        <h2>Payment Personal Details</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Email</th>
              <th>Select</th> {/* New column for select button */}
            </tr>
          </thead>
          <tbody>
            {allData.map((data, index) => (
              <tr key={index}>
                <td>{data.name}</td>
                <td>{data.number}</td>
                <td>{data.address}</td>
                <td>{data.email}</td>
                <td>
                  <Button variant="info" onClick={() => handleSelect(data)}>Select</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button variant="primary" onClick={generateReport}>Generate Report</Button>
      </div>
    </div>
  );
}

export default PaymentReport;
