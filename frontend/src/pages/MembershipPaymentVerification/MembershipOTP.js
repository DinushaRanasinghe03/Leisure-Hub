import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import axios from "axios"


function MemOTPVerification() {
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
      const response = await axios.post('/api/v1/membershipPayments/verification', data);
      console.log('data', response.data);
      if (response.data.verification) {
        window.location.href = "/memsuccess"
      } else {
        window.location.href = "/memunsuccess";
      }
    } catch (error) {
      console.error('error:', error);
    }
  }

  return (
    <Layout>
    <div style={{ backgroundImage: "url('background.jpg')", height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: '#b3e0f2', padding: '60px', borderRadius: '20px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)', width: '50%', maxWidth: '800px' }}>
        <h2 style={{ fontSize: '28px', marginBottom: '30px' }}>OTP Verification</h2>
        <p style={{ marginTop: '20px', fontSize: '16px' }}>One time password has been sent to your email. Please verify it.</p>
        <label style={{ fontSize: '20px', marginBottom: '10px' }}>Enter your OTP</label>
        <input type="text" placeholder="Enter OTP" style={{ fontSize: '18px', padding: '15px', marginBottom: '20px', width: '100%' }} value={otp} onChange={(e) => { setOTP(e.target.value) }} />
        <button onClick={submitData} style={{ fontSize: '20px', padding: '15px 30px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Verify OTP
        </button>
      </div>
    </div>
    </Layout>
  );
}

export default MemOTPVerification;
