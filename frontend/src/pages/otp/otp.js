import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout/Layout';

function OTPAuthenticationPage() {
  const [email, setEmail] = useState('');
  const [id, setID] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    const id = searchParams.get('id');
    setID(id);
  };

  const submitData = async () => {
    let data = {
      email: email
    };
    try {
      const response = await axios.post('/api/v1/cardpayments/otp', data);
      console.log('data', response.data);
      window.location.href = `/verify?id=${id}&secret=${response.data.secret}`;
    } catch (error) {
      console.error('error:', error);
    }
  };

  return (
    <Layout>
      <h2 style={{ fontSize: '28px', textAlign: 'center' }}>OTP Verification</h2>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ backgroundColor: '#b3e0f2', padding: '60px', borderRadius: '20px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '800px' ,maxHeight: '600',height: '70%'}}>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="email" style={{ fontSize: '20px', marginBottom: '10px', display: 'block' }}>Enter your email address</label>
            <input type="email" id="email" placeholder="Enter email" style={{ fontSize: '20px', padding: '20px', width: '100%', borderRadius: '5px', border: '1px solid #ccc' }} value={email} onChange={(e) => { setEmail(e.target.value) }} />
            <p style={{ fontSize: '18px', marginTop: '10px' }}>We'll never share your email with anyone else.</p>
          </div>
          <button onClick={submitData} style={{ fontSize: '16px', padding: '20px 40px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', width: '60%',alignItems: 'center',margin: '0 auto', marginTop:'100px',marginLeft:'120px'}}>
            Send OTP
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default OTPAuthenticationPage;
