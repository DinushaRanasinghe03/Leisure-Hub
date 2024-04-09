import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

const MembershipAdd = () => {
  const [nameOnCard, setNameOnCard] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setEXPDate] = useState('');
  const [cvv, setcvv] = useState('');

  
  const submitData = async () => {
    let data = {
      nameOnCard: nameOnCard,
      cardNumber: cardNumber,
      expDate: expDate,
      cvv: cvv
    };

    try {
    
      const response = await axios.post('/api/membershipPayments/', data);
      console.log('data', response.data);
      window.location.href = `/otp?id=${response.data._id}`;
    } catch (error) {
      console.error('error:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Membership Payment</h2>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Name On Card</Form.Label>
          <Form.Control type="text" placeholder="Name On card" value={nameOnCard} onChange={(e) => { setNameOnCard(e.target.value) }} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Card Number</Form.Label>
          <Form.Control type="text" placeholder="Enter Card number" value={cardNumber} onChange={(e) => { setCardNumber(e.target.value) }} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Expire Date</Form.Label>
          <Form.Control type="date" placeholder="Enter Expire Date" value={expDate} onChange={(e) => { setEXPDate(e.target.value) }} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>CVV</Form.Label>
          <Form.Control type="password" placeholder="Enter your CVV" value={cvv} onChange={(e) => { setcvv(e.target.value) }} />
        </Form.Group>

        <Button variant="primary" onClick={submitData}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default MembershipAdd;
