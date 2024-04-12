import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout/Layout';
 
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
      const response = await axios.post('/api/v1/membershipPayments/otp', data);
      console.log('data', response.data);
      window.location.href = `/memotpverification?id=${id}&secret=${response.data.secret}`;
    } catch (error) {
      console.error('error:', error);
    }
  };
 
  return (
    <Layout>
<div style={{ backgroundImage: "url('background.jpg')", height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
<div style={{ backgroundColor: '#b3e0f2', padding: '60px', borderRadius: '20px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)', width: '50%', maxWidth: '800px' }}>
<h2 style={{ fontSize: '28px', marginBottom: '30px', textAlign: 'center' }}>OTP Verification</h2>
<div style={{ textAlign: 'center' }}>
<label style={{ fontSize: '20px', marginBottom: '10px' }}>Enter your email address</label>
<input type="email" placeholder="Enter email" style={{ fontSize: '18px', padding: '15px', marginBottom: '10px', width: '100%', boxSizing: 'border-box', borderRadius: '5px', border: '1px solid #ccc' }} value={email} onChange={(e) => { setEmail(e.target.value) }} />
<p style={{ fontSize: '16px' }}>We'll never share your email with anyone else.</p>
</div>
<button onClick={submitData} style={{ fontSize: '20px', padding: '15px 30px', display: 'block', margin: '0 auto', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Send OTP
</button>
</div>
</div>
</Layout>
  );
}
 
export default MemOTPAuthenticationPage;

