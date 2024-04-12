import React, { useEffect, useState } from "react";
import axios from 'axios';
import Layout from "../../components/Layout/Layout";
 
const BasicCardDetailsForm = () => {
  const [nameOnCard, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setEXPDate] = useState('');
  const [cvv, setCVV] = useState('');
  const [id, setID] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [secret, set] = useState('');
 
  useEffect(() => {
    fetchData();
  }, []);
 
  const fetchData = async () => {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    const id = searchParams.get('id');
    setID(id);
    try {
      const response = await axios.get(`/api/v1/payments/${id}`);
      const { name, number, address, email } = response.data;
      setName(name);
      setNumber(number);
      setAddress(address);
      setEmail(email);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
 
  const submitData = async () => {
    let data = {
      nameOnCard: nameOnCard,
      cardNumber: cardNumber,
      expDate: expDate,
      cvv: cvv,
      payment: id
    };
 
    try {
      const response = await axios.post('/api/v1/cardpayments/', data);
      console.log('data', response.data);
      window.location.href = `/otp?id=${response.data._id}`;
    } catch (error) {
      console.error('error:', error);
    }
  };
 
  return (
    <Layout><br/><br/>
<div>
<h2 style={{ textAlign: "center" }}>Enter Your Card Details</h2>
<div style={{ maxWidth: "400px", margin: "0 auto" }}>
<form>
<div style={{ marginBottom: "15px" }}>
<label style={{ display: "block", marginBottom: "5px" }}>Name On Card</label>
<input
              type="text"
              placeholder="Name On Card"
              value={nameOnCard}
              onChange={(e) => { setCardName(e.target.value) }}
              style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
</div>
 
          <div style={{ marginBottom: "15px" }}>
<label style={{ display: "block", marginBottom: "5px" }}>Card Number</label>
<input
              type="text"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => { setCardNumber(e.target.value) }}
              style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
</div>
 
          <div style={{ marginBottom: "15px" }}>
<label style={{ display: "block", marginBottom: "5px" }}>Expire Date</label>
<input
              type="date"
              placeholder="Expire Date"
              value={expDate}
              onChange={(e) => { setEXPDate(e.target.value) }}
              style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
</div>
 
          <div style={{ marginBottom: "15px" }}>
<label style={{ display: "block", marginBottom: "5px" }}>CVV</label>
<input
              type="password"
              placeholder="CVV"
              value={cvv}
              onChange={(e) => { setCVV(e.target.value) }}
              style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
<span style={{ fontSize: "14px", color: "#666" }}>We'll never share your CVV with anyone else.</span>
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
 
export default BasicCardDetailsForm;
