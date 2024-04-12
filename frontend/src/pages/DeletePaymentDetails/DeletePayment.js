import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
 
const BasicExampleDelete = ({}) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [id, setID] = useState('');
 
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
    const data = {
      name: name,
      number: number,
      address: address,
      email: email
    };
    try {
      const response = await axios.post('/api/v1/payments', data);
      console.log('data', response.data);
    } catch (error) {
      console.error('error:', error);
    }
  };
 
  const editData = async () => {
    const data = {
      name: name,
      number: number,
      address: address,
      email: email
    };
    try {
      const response = await axios.put(`/api/v1/payments/${id}`, data);
      console.log('data', response.data);
      window.location.href = `/all?id=${response.data._id}`;
    } catch (error) {
      console.error('error:', error);
    }
  };
 
  const deleteData = async () => {
    try {
      const response = await axios.delete(`/api/v1/payments/${id}`);
      console.log('Deleted:', response.data);
      window.location.href = "/resunsuccess";
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
 
  return (
<Layout>
  <br/><br/>
<div style={{ textAlign: "center" }}>
<h2 style={{ marginBottom: "20px" }}>You can edit Your Personal Details here</h2>
<div style={{ maxWidth: "400px", margin: "0 auto", background: "#AEC6CF", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
<form style={{ display: "flex", flexDirection: "column" }}>
<div style={{ marginBottom: "15px" }}>
<label htmlFor="name" style={{ marginBottom: "5px", display: "block" }}>Name</label>
<input type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} style={{ padding: "8px", marginBottom: "10px", width: "100%", boxSizing: "border-box", borderRadius: "5px", border: "1px solid #ccc" }} />
</div>
<div style={{ marginBottom: "15px" }}>
<label htmlFor="number" style={{ marginBottom: "5px", display: "block" }}>Phone Number</label>
<input type="text" placeholder="Enter phone number" value={number} onChange={(e) => setNumber(e.target.value)} style={{ padding: "8px", marginBottom: "10px", width: "100%", boxSizing: "border-box", borderRadius: "5px", border: "1px solid #ccc" }} />
</div>
<div style={{ marginBottom: "15px" }}>
<label htmlFor="address" style={{ marginBottom: "5px", display: "block" }}>Address</label>
<input type="text" placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)} style={{ padding: "8px", marginBottom: "10px", width: "100%", boxSizing: "border-box", borderRadius: "5px", border: "1px solid #ccc" }} />
</div>
<div style={{ marginBottom: "15px" }}>
<label htmlFor="email" style={{ marginBottom: "5px", display: "block" }}>Email address</label>
<input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: "8px", marginBottom: "10px", width: "100%", boxSizing: "border-box", borderRadius: "5px", border: "1px solid #ccc" }} />
</div>
<button type="button" onClick={id ? editData : submitData} style={{ color: "#fff", border: "none", padding: "10px", borderRadius: "5px", cursor: "pointer", marginBottom: "10px", background: "#007bff" }}>
              {id ? 'Edit' : 'Submit'}
</button>
            {id && (
<button type="button" onClick={deleteData} style={{ color: "#fff", border: "none", padding: "10px", borderRadius: "5px", cursor: "pointer", background: "red" }}>
                Delete
</button>
            )}
</form>
</div>
</div>
<br/><br/>
</Layout>
  );
}
 
export default BasicExampleDelete;
