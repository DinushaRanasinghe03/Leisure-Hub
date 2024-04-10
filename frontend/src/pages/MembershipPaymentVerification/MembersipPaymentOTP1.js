import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

function MemOTPAuthenticationPage() {
  const [email, setEmail] = useState('');
  const [id, setID] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const url = new URL(window.location.href); // Create a URL object
    const searchParams = new URLSearchParams(url.search); // Extract search params

    // Access specific parameter values using get()
    const id = searchParams.get('id');
    setID(id);
  };

  const submitData = async () => {
    let data = {
      email: email
    };
    try {
      const response = await axios.post('/api/membershipPayments/otp', data);
      console.log('data', response.data);
      window.location.href = `/memotpverification?id=${id}&secret=${response.data.secret}`;
    } catch (error) {
      console.error('error:', error);
    }
  };
  return (
    <div style={{ backgroundImage: "url('background.jpg')", height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: '#b3e0f2', padding: '60px', borderRadius: '20px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)', width: '50%', maxWidth: '800px' }}>
        <h2 style={{ fontSize: '28px', marginBottom: '30px' }}>OTP Verification</h2>
        <Form>
          <Form.Group className="mb-4" controlId="formBasicEmail">
            <Form.Label style={{ fontSize: '20px', marginBottom: '10px' }}>Enter your email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" style={{ fontSize: '18px', padding: '15px' }} value={email} onChange={(e) => { setEmail(e.target.value) }} />
            <Form.Text className="text-muted" style={{ fontSize: '16px' }}>
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Button variant="primary" onClick={submitData} style={{ fontSize: '20px', padding: '15px 30px' }}>
            Send OTP
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default MemOTPAuthenticationPage;
//memOtpAuth
