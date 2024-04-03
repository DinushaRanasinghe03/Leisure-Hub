import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

const BasicExampleTable = () => {
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

  return (
    <div>
      {/* <div className="form-container">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="text" value={name} onChange={(e) => { setName(e.target.value) }} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="text" placeholder="phone number" value={number} onChange={(e) => { setNumber(e.target.value) }} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder="address" value={address} onChange={(e) => { setAddress(e.target.value) }} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Button variant="primary" onClick={submitData}>
            Submit
          </Button>
        </Form>
      </div> */}

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
      </div>
    </div>
  );
}

export default BasicExampleTable;
