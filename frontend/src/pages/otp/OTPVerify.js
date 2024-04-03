import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

function OTPAuthenticationPageSave() {
  return (
    <div style={{ backgroundImage: "url('background.jpg')", height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: '#b3e0f2', padding: '60px', borderRadius: '20px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)', width: '50%', maxWidth: '800px' }}>
        <h2 style={{ fontSize: '28px', marginBottom: '30px' }}>OTP Verification</h2>
        <Form>
        <p style={{ marginTop: '20px', fontSize: '16px' }}>One time password has been sent to your email .Please verify it.</p>
          <Form.Group className="mb-4" controlId="formBasicEmail">
            <Form.Label style={{ fontSize: '20px', marginBottom: '10px' }}>Enter your OTP</Form.Label>
            <Form.Control type="text" placeholder="Enter OTP" style={{ fontSize: '18px', padding: '15px' }} />
            <Form.Text className="text-muted" style={{ fontSize: '16px' }}>

            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit" style={{ fontSize: '20px', padding: '15px 30px' }}>
            Verify OTP
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default OTPAuthenticationPageSave;
