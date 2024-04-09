import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
//import './personalDetails.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

const BasicExampleAdd = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [error, setError] = useState('');
  const [is_card_payment, setIsCardPayment] = useState(false);

  const validatePhoneNumber = () => {
    if (!number.trim()) {
      setError('Phone number is required');
      return false;
    } else if (!/^\d{10}$/.test(number)) {
      setError('Phone number must be 10 digits');
      return false;
    }
    setError('');
    return true;
  };
  
  const submitData = async (e) => {
    if (paymentType === 'card') {
      setIsCardPayment(true);
    }
    let data = {
      name: name,
      number: number,
      address: address,
      email: email,
      is_card_payment: is_card_payment
    };

    try {
      e.preventDefault();
      const isValid = validatePhoneNumber();
      if (isValid) {
        const response = await axios.post('/api/payments', data);
        console.log('data', response.data);
        if (paymentType === 'card') {
          window.location.href = `/card?id=${response.data._id}`
        } else {
          window.location.href = `/all?id=${response.data._id}`
        }

      } else {
        console.log('invalid data', error);
      }


    } catch (error) {
      console.error('error:', error);
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Enter Your Personal Details</h2>
    <div className="form-container">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your name" value={name} onChange={(e) => { setName(e.target.value) }} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="text" placeholder="Enter your phone number" value={number} onChange={(e) => { setNumber(e.target.value) }} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" placeholder="Enter your address" value={address} onChange={(e) => { setAddress(e.target.value) }} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter your email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>


        <Form.Group className="mb-3" controlId="formBasicCheckbox" style={{ display: 'flex' }} >
          <Form.Check type="radio" label="cash" value='cash' checked={paymentType === 'cash'} onChange={(e) => setPaymentType(e.target.value)} />
          <Form.Check type="radio" label="card" value='card' checked={paymentType === 'card'} onChange={(e) => setPaymentType(e.target.value)} />
        </Form.Group>

        <Button variant="primary" onClick={submitData}>
          Submit
        </Button>
      </Form>
    </div>
    </div>
  );
}

export default BasicExampleAdd;
