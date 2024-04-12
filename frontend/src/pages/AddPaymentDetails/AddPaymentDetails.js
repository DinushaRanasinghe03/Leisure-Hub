import React, { useState } from "react";
import axios from 'axios';
import Layout from "../../components/Layout/Layout";
 
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
        const response = await axios.post('/api/v1/payments', data);
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
    <Layout><br/><br/>
<div>
<h2 style={{ textAlign: "center" }}>Enter Your Personal Details</h2>
<div style={{ maxWidth: "400px", margin: "0 auto" }}>
<form>
<div style={{ marginBottom: "15px" }}>
<label style={{ display: "block", marginBottom: "5px" }}>Name</label>
<input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => { setName(e.target.value) }}
              style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
</div>
 
          <div style={{ marginBottom: "15px" }}>
<label style={{ display: "block", marginBottom: "5px" }}>Phone Number</label>
<input
              type="text"
              placeholder="Enter your phone number"
              value={number}
              onChange={(e) => { setNumber(e.target.value) }}
              style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
</div>
 
          <div style={{ marginBottom: "15px" }}>
<label style={{ display: "block", marginBottom: "5px" }}>Address</label>
<input
              type="text"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => { setAddress(e.target.value) }}
              style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
</div>
 
          <div style={{ marginBottom: "15px" }}>
<label style={{ display: "block", marginBottom: "5px" }}>Email address</label>
<input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
              style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
<span style={{ fontSize: "14px", color: "#666" }}>We'll never share your email with anyone else.</span>
</div>
 
          <div style={{ marginBottom: "15px" }}>
<label style={{ display: "block", marginBottom: "5px" }}>Payment Type</label>
<label style={{ marginRight: "15px" }}>
<input
                type="radio"
                value="cash"
                checked={paymentType === 'cash'}
                onChange={(e) => setPaymentType(e.target.value)}
                style={{ marginRight: "5px" }}
              />
              Cash
</label>
<label>
<input
                type="radio"
                value="card"
                checked={paymentType === 'card'}
                onChange={(e) => setPaymentType(e.target.value)}
                style={{ marginRight: "5px" }}
              />
              Card
</label>
</div>
 
          <button
            type="button"
            onClick={submitData}
            style={{ background: "#007bff", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }}
>
            Submit
</button>
</form>
</div>
</div>
</Layout>
  );
}
 
export default BasicExampleAdd;
