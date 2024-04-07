import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';


const BasicCardDetailsForm = () => {
  const [nameOnCard, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setEXPDate] = useState('');
  const [cvv, setCVV] = useState('');
  const [id,setID]=useState('');
  const [name,setName]=useState('');
  const [address,setAddress]=useState('');
  const [number,setNumber]=useState('');
  const [email,setEmail]=useState('');
  const [otp, setOTP] = useState('');
  const [secret, set] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  //submitdata by id new
  const fetchData = async () => {
    const url = new URL(window.location.href); // Create a URL object
  const searchParams = new URLSearchParams(url.search); // Extract search params

  // Access specific parameter values using get()
  const id = searchParams.get('id');
  setID(id)
    try {
      const response = await axios.get(`/api/payments/${id}`);
      const { name, number, address, email } = response.data;
      setName(name);
      setNumber(number);
      setAddress(address);
      setEmail(email);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
console.log('id',id);
  //already

  const submitData = async () => {
    let data = {
      nameOnCard: nameOnCard,
      cardNumber: cardNumber,
      expDate: expDate,
      cvv: cvv,
      payment:id
    };


    try {
    
      const response = await axios.post('/api/cardpayments/', data);
      console.log('data', response.data);
      window.location.href = `/otp?id=${response.data._id}`;
    } catch (error) {
      console.error('error:', error);
    }
  };



  return (
    <div className="form-container">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Name On Card</Form.Label>
          <Form.Control type="text" placeholder="Name On Card" value={nameOnCard} onChange={(e) => { setCardName(e.target.value) }} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Card Number</Form.Label>
          <Form.Control type="text" placeholder="Card Number" value={cardNumber} onChange={(e) => { setCardNumber(e.target.value) }} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Expire Date</Form.Label>
          <Form.Control type="text" placeholder="Expire Date" value={expDate} onChange={(e) => { setEXPDate(e.target.value) }} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>CVV</Form.Label>
          <Form.Control type="password" placeholder="CVV" value={cvv} onChange={(e) => { setCVV(e.target.value) }} />
          <Form.Text className="text-muted">
            We'll never share your CVV with anyone else.
          </Form.Text>
        </Form.Group>

        <Button variant="primary" onClick={submitData}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default BasicCardDetailsForm;
