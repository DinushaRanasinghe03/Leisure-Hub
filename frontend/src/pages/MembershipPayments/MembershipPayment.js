import React, { useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";

const MembershipAdd = () => {
  const [nameOnCard, setNameOnCard] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setEXPDate] = useState('');
  const [cvv, setCVV] = useState('');
  const [nameOnCardError, setNameOnCardError] = useState('');
  const [cardNumberError, setCardNumberError] = useState('');
  const [expDateError, setEXPDateError] = useState('');
  const [cvvError, setCVVError] = useState('');

  const handleNameOnCardChange = (e) => {
    setNameOnCard(e.target.value);
    if (!e.target.value.trim()) {
      setNameOnCardError('Name on Card is required');
    } else {
      setNameOnCardError('');
    }
  };

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);
    if (!e.target.value.trim()) {
      setCardNumberError('Card Number is required');
    } else if (!/^\d{16}$/.test(e.target.value.trim())) {
      setCardNumberError('Invalid Card Number');
    } else {
      setCardNumberError('');
    }
  };

  const handleExpDateChange = (e) => {
    setEXPDate(e.target.value);
    if (!e.target.value) {
      setEXPDateError('Expiration Date is required');
    } else {
      setEXPDateError('');
    }
  };

  const handleCVVChange = (e) => {
    setCVV(e.target.value);
    if (!e.target.value.trim()) {
      setCVVError('CVV is required');
    } else if (!/^\d{3,4}$/.test(e.target.value.trim())) {
      setCVVError('Invalid CVV');
    } else {
      setCVVError('');
    }
  };

  const validateForm = () => {
    if (!nameOnCard.trim()) {
      setNameOnCardError('Name on Card is required');
      return false;
    }
    if (!cardNumber.trim()) {
      setCardNumberError('Card Number is required');
      return false;
    }
    if (!/^\d{16}$/.test(cardNumber.trim())) {
      setCardNumberError('Invalid Card Number');
      return false;
    }
    if (!expDate) {
      setEXPDateError('Expiration Date is required');
      return false;
    }
    if (!cvv.trim()) {
      setCVVError('CVV is required');
      return false;
    }
    if (!/^\d{3,4}$/.test(cvv.trim())) {
      setCVVError('Invalid CVV');
      return false;
    }
    return true;
  };

  const submitData = async () => {
    if (validateForm()) {
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
    }
  };

  return (
    <Layout>
      <h1 style={{ textAlign: "center" }}>Membership Payments</h1>
      <div className="form-container" style={{ maxWidth: '500px', margin: 'auto', justifyContent: 'center', alignItems: 'center', backgroundColor: '#AEC6CF', borderRadius: '10px', padding: '20px' }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Name on Card</label>
        <input
          type="text"
          placeholder="Name On Card"
          value={nameOnCard}
          onChange={handleNameOnCardChange}
          onBlur={handleNameOnCardChange} // Check validity on blur
          style={{ margin: '10px', padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        {nameOnCardError && <p style={{ color: 'red', marginTop: '5px' }}>{nameOnCardError}</p>}
        <label style={{ display: "block", marginBottom: "5px" }}>Card Number</label>
        <input
          type="text"
          placeholder="Card Number"
          value={cardNumber}
          onChange={handleCardNumberChange}
          onBlur={handleCardNumberChange} // Check validity on blur
          style={{ margin: '10px', padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        {cardNumberError && <p style={{ color: 'red', marginTop: '5px' }}>{cardNumberError}</p>}
        <label style={{ display: "block", marginBottom: "5px" }}>Expire Date</label>
        <input
          type="date"
          placeholder="Expire Date"
          value={expDate}
          onChange={handleExpDateChange}
          onBlur={handleExpDateChange} // Check validity on blur
          style={{ margin: '10px', padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        {expDateError && <p style={{ color: 'red', marginTop: '5px' }}>{expDateError}</p>}
        <label style={{ display: "block", marginBottom: "5px" }}>CVV</label>
        <input
          type="password"
          placeholder="CVV"
          value={cvv}
          onChange={handleCVVChange}
          onBlur={handleCVVChange} // Check validity on blur
          style={{ margin: '10px', padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        {cvvError && <p style={{ color: 'red', marginTop: '5px' }}>{cvvError}</p>}
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
