import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

const MembershipAdd = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');

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
    } catch (error) {
      console.error('error:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Membership Payment</h2>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Name" value={name} onChange={(e) => { setName(e.target.value) }} />
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
    </div>
  );
}

export default MembershipAdd;
