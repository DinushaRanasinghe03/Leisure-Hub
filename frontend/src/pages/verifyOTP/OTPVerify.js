import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout/Layout';
 
function OTPVerification() {
  const [card_id, setCardID] = useState('');
  const [secret, setSecret] = useState('');
  const [otp, setOTP] = useState('');
  const [paymentId, setPaymentId] = useState('');
 
  useEffect(() => {
    fetchData();
  }, []);
 
  const fetchData = async () => {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
 
    const secret = searchParams.get('secret');
    const card_id = searchParams.get('id');
    const response = await axios.get(`/api/v1/cardpayments/${card_id}`);
    const p_id = response.data.payment._id;
    console.log("p_id", p_id);
    setPaymentId(p_id);
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
      const response = await axios.post('/api/v1/cardpayments/verification', data);
      console.log('data', response.data);
      if (response.data.verification) {
        window.location.href = `/end?id=${paymentId}`
      } else {
        window.location.href = "/resunsuccess";
      }
    } catch (error) {
      console.error('error:', error);
    }
  }
 
  return (
    <Layout>
      <h2 style={{ fontSize: '28px', marginBottom: '0px',textAlign: 'center' }}>OTP Verification</h2>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ backgroundColor: '#b3e0f2', padding: '60px', borderRadius: '20px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '800px' ,maxHeight: '600',height: '70%'}}>
          <p style={{ marginTop: '20px', fontSize: '16px' }}>One time password has been sent to your email. Please verify it.</p>
          <div style={{ marginTop:'50px',marginBottom: '20px' }}>
            <label htmlFor="otp" style={{ fontSize: '20px', marginBottom: '10px' }}>Enter your OTP</label>
            <input type="text" id="otp" placeholder="Enter OTP" style={{ fontSize: '18px', padding: '15px', width: '100%', borderRadius: '5px', border: '1px solid #ccc' }} value={otp} onChange={(e) => { setOTP(e.target.value) }} />
          </div>
          <button onClick={submitData} style={{ fontSize: '16px', padding: '20px 40px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', width: '60%',alignItems: 'center',margin: '0 auto', marginTop:'100px',marginLeft:'120px' }}>
            Verify OTP
          </button>
        </div>
      </div>
    </Layout>
  );
}
 
export default OTPVerification;
