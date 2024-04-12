import React, { useState } from "react";
import axios from "axios"
import Layout from "../../components/Layout/Layout";
 
const MembershipAdd = () => {
  const [nameOnCard, setNameOnCard] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setEXPDate] = useState('');
  const [cvv, setcvv] = useState('');
 
  const submitData = async () => {
    let data = {
      nameOnCard: nameOnCard,
      cardNumber: cardNumber,
      expDate: expDate,
      cvv: cvv
    };
 
    try {
      // Assuming axios is still used
      const response = await axios.post('/api/v1/membershipPayments/', data);
      console.log('data', response.data);
      window.location.href = `/memOtpAuth?id=${response.data._id}`;
    } catch (error) {
      console.error('error:', error);
    }
  };
 
  return (
    <Layout>
<div>

<div className="form-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
<h2 style={{ textAlign: "center" }}>Membership Payments</h2>
<input
          type="text"
          placeholder="Name On Card"
          value={nameOnCard}
          onChange={(e) => { setNameOnCard(e.target.value) }}
          style={{ margin: '10px', padding: '5px', width: '400px' }}
        />
<input
          type="text"
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e) => { setCardNumber(e.target.value) }}
          style={{ margin: '10px', padding: '5px', width: '400px' }}
        />
<input
          type="date"
          placeholder="Expire Date"
          value={expDate}
          onChange={(e) => { setEXPDate(e.target.value) }}
          style={{ margin: '10px', padding: '5px', width: '400px' }}
        />
<input
          type="password"
          placeholder="CVV"
          value={cvv}
          onChange={(e) => { setcvv(e.target.value) }}
          style={{ margin: '10px', padding: '5px', width: '400px' }}
        />
<button
          onClick={submitData}
          style={{ margin: '10px', padding: '10px 20px', fontSize: '16px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
>
          Submit
</button>
</div>
</div>
</Layout>
  );
}
 
export default MembershipAdd;