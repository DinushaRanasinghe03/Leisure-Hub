import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

const BasicExampleDelete = ({}) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [id,setID]=useState('')

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const url = new URL(window.location.href); // Create a URL object
  const searchParams = new URLSearchParams(url.search); // Extract search params

  // Access specific parameter values using get()
  const id = searchParams.get('id');
  setID(id)
    try {
      const response = await axios.get(`/api/payments/${id}`);
      const { name, number, address, email } = response.data;
      setName(name);
      setNumber(number);
      setAddress(address);
      setEmail(email);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const submitData = async () => {
    const data = {
      name: name,
      number: number,
      address: address,
      email: email
    };

    try {
      const response = await axios.post('/api/payments', data);
      console.log('data', response.data);
    } catch (error) {
      console.error('error:', error);
    }
  };

  const editData = async () => {
    const data = {
      name: name,
      number: number,
      address: address,
      email: email
    };

    try {
      const response = await axios.put(`/api/payments/${id}`, data);
      console.log('data', response.data);
      window.location.href = `/all?id=${response.data._id}`
    } catch (error) {
      console.error('error:', error);
    }
  };

  const deleteData = async () => {
    try {
      const response = await axios.delete(`/api/payments/${id}`);
      console.log('Deleted:', response.data);
      window.location.href = "/end"
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <div className="form-container">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="text" placeholder="Enter phone number" value={number} onChange={(e) => setNumber(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Button variant="primary" onClick={id ? editData : submitData}>
          {id ? 'Edit' : 'Submit'}
        </Button>

        {id && (
          <Button variant="danger" onClick={deleteData} className="ms-2">
            Delete
          </Button>
        )}
      </Form>
    </div>
  );
}

export default BasicExampleDelete;
