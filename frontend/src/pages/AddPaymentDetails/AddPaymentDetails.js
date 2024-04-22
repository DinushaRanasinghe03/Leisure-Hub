import React, { useState, useEffect } from "react";
import axios from 'axios';
import Layout from "../../components/Layout/Layout";

const BasicExampleAdd = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [booking, setBooking] = useState('');
  const [total, setTotal] = useState(null);
  const [errors, setErrors] = useState({
    name: '',
    number: '',
    address: '',
    email: '',
    paymentType: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

 const fetchData =  async () => {
  const url = new URL(window.location.href);
  const id = url.href.split('/')[4];
  setBooking(id);
  const response = await axios.get(`/api/v1/buytickets`);
    const bookings = response.data.bookings.filter((x) => x._id === id);
    setTotal(bookings[0].total);
    console.log("bookinig_id", bookings[0].total);
  
  }

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: name.trim() ? '' : 'Name is required',
      number: /^\d{10}$/.test(number) ? '' : 'Phone number must be 10 digits',
      address: address.trim() ? '' : 'Address is required',
      email: /\S+@\S+\.\S+/.test(email) ? '' : ' email address is required',
      paymentType: paymentType ? '' : 'Payment type is required'
    };
    if (/\d/.test(name)) {
      newErrors.name = 'Invalid input: Name cannot contain numeric characters';
      isValid = false;
    }

    setErrors(newErrors);

    for (const error in newErrors) {
      if (newErrors[error]) {
        isValid = false;
        break;
      }
    }

    return isValid;
  };

  const handleInputBlur = (field) => {
    validateForm();
  };

  const submitData = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    let data = {
      name: name,
      number: number,
      address: address,
      email: email,
      booking: booking,
      paymentType: paymentType
    };

    try {
      const response = await axios.post('/api/v1/payments', data);
      console.log('data', response.data);
      if (paymentType === 'card') {
        window.location.href = `/card?id=${response.data._id}`
      
      } else {
        window.location.href = `/all?id=${response.data._id}`
      }
    } catch (error) {
      console.error('error:', error);
    }
  };

  return (
    <Layout>
      <br/><br/>
      
      <h2 style={{ textAlign: "center" }}>Enter Your Personal Details</h2>
      <div style={{ backgroundColor: "#AEC6CF", maxWidth: "500px", margin: "0 auto", padding: "20px", borderRadius: "10px" }}>
        <div style={{ maxWidth: "400px", margin: "0 auto" }}>
          <form>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => { setName(e.target.value) }}
                onBlur={() => handleInputBlur('name')}
                style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                required
              />
              {errors.name && <p style={{ color: 'red', marginTop: '5px' }}>{errors.name}</p>}
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>Phone Number</label>
              <input
                type="text"
                placeholder="Enter your phone number"
                value={number}
                onChange={(e) => { setNumber(e.target.value) }}
                onBlur={() => handleInputBlur('number')}
                style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                required
              />
              {errors.number && <p style={{ color: 'red', marginTop: '5px' }}>{errors.number}</p>}
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>Address</label>
              <input
                type="text"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => { setAddress(e.target.value) }}
                onBlur={() => handleInputBlur('address')}
                style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                required
              />
              {errors.address && <p style={{ color: 'red', marginTop: '5px' }}>{errors.address}</p>}
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>Email address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => { setEmail(e.target.value) }}
                onBlur={() => handleInputBlur('email')}
                style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                required
              />
              {errors.email && <p style={{ color: 'red', marginTop: '5px' }}>{errors.email}</p>}
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
                  onBlur={() => handleInputBlur('paymentType')}
                  style={{ marginRight: "5px" }}
                  required
                />
                Cash
              </label>
              <label>
                <input
                  type="radio"
                  value="card"
                  checked={paymentType === 'card'}
                  onChange={(e) => setPaymentType(e.target.value)}
                  onBlur={() => handleInputBlur('paymentType')}
                  style={{ marginRight: "5px" }}
                  required
                />
                Card
              </label>
             
              {errors.paymentType && <p style={{ color: 'red', marginTop: '5px' }}>{errors.paymentType}</p>}
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
        <h3 style={{ textAlign: "center",color: "blue" }}> Total Amount you have to pay: {total} </h3>
      </div>
    </Layout>
  );
}

export default BasicExampleAdd;
