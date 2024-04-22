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
  //new 
  //const [booking, setBooking] = useState('');
  //const [total, setTotal] = useState(null);
 

  const [errors, setErrors] = useState({
    nameOnCard: '',
    cardNumber: '',
    expDate: '',
    cvv: ''
  });

  //new 
//   useEffect(() => {
//     fetchDataBooking();
//   }, []);

//  const fetchDataBooking =  async () => {//change the function name
//   const url = new URL(window.location.href);
//   const id = url.href.split('/')[4];
//   setBooking(id);
//   const response = await axios.get(`/api/v1/buytickets`);
//     const bookings = response.data.bookings.filter((x) => x._id === id);
//     setTotal(bookings[0].total);
//     console.log("bookinig_id", bookings[0].total);
//  }
 
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

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      nameOnCard: '',
      cardNumber: '',
      expDate: '',
      cvv: ''
    };

    if (!nameOnCard.trim()) {
      newErrors.nameOnCard = 'Name on card is required';
      isValid = false;
    }

    if (!cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
      isValid = false;
    } else if (!/^\d{16}$/.test(cardNumber)) {
      newErrors.cardNumber = 'Card number must be 16 digits';
      isValid = false;
    }

    if (!expDate.trim()) {
      newErrors.expDate = 'Expiration date is required';
      isValid = false;
    }

    if (!cvv.trim()) {
      newErrors.cvv = 'CVV is required';
      isValid = false;
    } else if (!/^\d{3}$/.test(cvv)) {
      newErrors.cvv = 'CVV must be a 3-digit number';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleBlur = (field) => {
    validateForm();
  };

  const submitData = async () => {
    if (validateForm()) {
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
    }
  };

  return (
    <Layout>
      <br/><br/>
      
        <h2 style={{ textAlign: "center" }}>Enter Your Card Details</h2>
        <div style={{ backgroundColor: "#AEC6CF", maxWidth: "400px", margin: "0 auto", padding: "20px", borderRadius: "10px" }}>
        <div style={{ maxWidth: "400px", margin: "0 auto" }}>
          <form>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>Name On Card</label>
              <input
                type="text"
                placeholder="Name On Card"
                value={nameOnCard}
                onChange={(e) => { setCardName(e.target.value) }}
                onBlur={() => handleBlur('nameOnCard')}
                style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                required
              />
              {errors.nameOnCard && <p style={{ color: 'red', marginTop: '5px' }}>{errors.nameOnCard}</p>}
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>Card Number</label>
              <input
                type="text"
                placeholder="Card Number"
                value={cardNumber}
                onChange={(e) => { setCardNumber(e.target.value) }}
                onBlur={() => handleBlur('cardNumber')}
                style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                required
              />
              {errors.cardNumber && <p style={{ color: 'red', marginTop: '5px' }}>{errors.cardNumber}</p>}
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>Expire Date</label>
              <input
                type="date"
                placeholder="Expire Date"
                value={expDate}
                onChange={(e) => { setEXPDate(e.target.value) }}
                onBlur={() => handleBlur('expDate')}
                style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                required
              />
              {errors.expDate && <p style={{ color: 'red', marginTop: '5px' }}>{errors.expDate}</p>}
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>CVV</label>
              <input
                type="password"
                placeholder="CVV"
                value={cvv}
                onChange={(e) => { setCVV(e.target.value) }}
                onBlur={() => handleBlur('cvv')}
                style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                required
              />
              {errors.cvv && <p style={{ color: 'red', marginTop: '5px' }}>{errors.cvv}</p>}
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
