import React, { useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
 
const MembershipAdd = () => {
  const [nameOnCard, setNameOnCard] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setEXPDate] = useState('');
  const [cvv, setCVV] = useState('');
 
  const submitData = async () => {
    let data = {
      nameOnCard: nameOnCard,
      cardNumber: cardNumber,
      expDate: expDate,
      cvv: cvv
    };
 
    try {
      const response = await axios.post('/api/v1/membershipPayments/', data);
      console.log('data', response.data);
      window.location.href = `/memOtpAuth?id=${response.data._id}`;
    } catch (error) {
      console.error('error:', error);
    }
  };
 
  return (
<Layout>
<div className="form-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
<h2 style={{ textAlign: "center" }}>Membership Payments</h2>
<input
          type="text"
          placeholder="Name On Card"
          value={nameOnCard}
          onChange={(e) => { setNameOnCard(e.target.value) }}
          style={{ margin: '10px', padding: '10px', width: '400px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
<input
          type="text"
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e) => { setCardNumber(e.target.value) }}
          style={{ margin: '10px', padding: '10px', width: '400px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
<input
          type="date"
          placeholder="Expire Date"
          value={expDate}
          onChange={(e) => { setEXPDate(e.target.value) }}
          style={{ margin: '10px', padding: '10px', width: '400px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
<input
          type="password"
          placeholder="CVV"
          value={cvv}
          onChange={(e) => { setCVV(e.target.value) }}
          style={{ margin: '10px', padding: '10px', width: '400px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
<button
          onClick={submitData}
          style={{ margin: '10px', padding: '10px 20px', fontSize: '16px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
>
          Submit
</button>
</div>
</Layout>
  );
}
 
export default MembershipAdd;

