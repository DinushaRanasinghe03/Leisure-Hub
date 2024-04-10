import react, { useEffect, useState } from "react";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './personalDetails.css';
import axios from 'axios';
//import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';


const BasicExample = ({ id ='65f93fd2324ccf3684001584'}) => {

  //let id = '65f93fd2324ccf3684001584'
  
  const [name,setName]=useState('')
  const [number,setNumber]=useState('')
  const [address,setAdress]=useState('')
  const [email,setEmail]=useState('')
  
  
  //post data 
  const submitData=async()=>{
    let data ={
      name:name,
      number:number,
      address:address,
      email:email
    }

  
    try{
      const response=await axios.post('/api/payments',data)
      console.log('data',response.data)
    }catch(error){
      console.error('error:',error)
    }
    
  }

  //getdata
  useEffect(() => {

    axios.get(`/api/payments/${id}`)
        .then(response => {
            setName(response.data.name);
            setNumber(response.data.number);
            setAdress(response.data.address);
            setEmail(response.data.email);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}, []);

//patch data 
const editData=async()=>{
  let data ={
    name:name,
    number:number,
    address:address,
    email:email
  }


  try{
    const response=await axios.put(`/api/payments/${id}`,data)
    console.log('data',response.data)
  }catch(error){
    console.error('error:',error)
  }
  
}
 
  return (
    <div className="form-container"> 
    <Form>
        <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="text" value={name} onChange={(e)=>{setName(e.target.value) 
        console.log('name',name);}} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control type="text" placeholder="phone number" value={number} onChange={(e)=>{setNumber(e.target.value)}}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Address</Form.Label>
        <Form.Control type="text" placeholder="address" value={address} onChange={(e)=>{setAdress(e.target.value)}}/>
        </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCheckbox" style ={{display :'flex'}}>
        <Form.Check type="radio" label="cash" />
        <Form.Check type="radio" label="card" />
      </Form.Group>

      {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="radio" label="card" />
      </Form.Group> */}
      <Button  variant="primary"  onClick={id ? editData:submitData}>
      {id ? 'Edit' : 'submit'}
        </Button>
       
    </Form>
    </div>
  );
}

export default BasicExample;

