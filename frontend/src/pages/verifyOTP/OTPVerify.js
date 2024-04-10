import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

function OTPVerification() {
  const [card_id, setCardID] = useState('');
  const [secret, setSecret] = useState('');
  const [otp, setOTP] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const url = new URL(window.location.href); // Create a URL object
    const searchParams = new URLSearchParams(url.search); // Extract search params

    // Access specific parameter values using get()
    const secret = searchParams.get('secret');
    const card_id = searchParams.get('id');
    console.log("secret", secret);
    console.log("card_id", card_id);
    setCardID(card_id);
    setSecret(secret);
  };

  const submitData = async () => {
    try {
      let data = {
        otp: otp,
        secret: secret,
        card_id: card_id,
      }
      const response = await axios.post('/api/cardpayments/verification', data);
      console.log('data', response.data);
      if (response.data.verification) {
        window.location.href = "/end"
      } else {
        window.location.href = "/resunsuccess";
      }
    } catch (error) {
      console.error('error:', error);
    }
  }

  return (
    <div style={{ backgroundImage: "url('background.jpg')", height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: '#b3e0f2', padding: '60px', borderRadius: '20px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)', width: '50%', maxWidth: '800px' }}>
        <h2 style={{ fontSize: '28px', marginBottom: '30px' }}>OTP Verification</h2>
        <Form>
          <p style={{ marginTop: '20px', fontSize: '16px' }}>One time password has been sent to your email .Please verify it.</p>
          <Form.Group className="mb-4" controlId="formBasicEmail">
            <Form.Label style={{ fontSize: '20px', marginBottom: '10px' }}>Enter your OTP</Form.Label>
            <Form.Control type="text" placeholder="Enter OTP" style={{ fontSize: '18px', padding: '15px' }} value={otp} onChange={(e) => { setOTP(e.target.value) }} />
            <Form.Text className="text-muted" style={{ fontSize: '16px' }}>
            </Form.Text>
          </Form.Group>
          <Button variant="primary" onClick={submitData} style={{ fontSize: '20px', padding: '15px 30px' }}>
            Verify OTP
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default OTPVerification;
