import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
 
const BasicExampleTable = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [allData, setAllData] = useState([]);
  const [id, setID] = useState('');
  const [paymentDetails, setPaymentDetails] = useState(null);
 
  useEffect(() => {
    fetchData();
  }, []);
 
  const fetchData = async () => {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    const id = searchParams.get('id');
    setID(id)
 
    try {
      const response = await axios.get(`/api/v1/payments/${id}`);
      setPaymentDetails(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
 
  const submitData = async () => {
    let data = {
      name: name,
      number: number,
      address: address,
      email: email
    };
 
    try {
      const response = await axios.post('/api/v1/payments', data);
      console.log('data', response.data);
      fetchData();
    } catch (error) {
      console.error('error:', error);
    }
  };
 
  const handleSelect = async (rowData) => {
    window.location.href = `/edit?id=${rowData._id}`;
    console.log("Selected row:", rowData);
  };
 
  const handleSave = async (rowData) => {
    window.location.href = `/end?id=${rowData._id}`;
    console.log("Selected row:", rowData);
  };
 
  return (
          <Layout>
             <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}> {/* Center content */}
            <div style={{ width: "80%", marginTop: "10px" }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Please confirm your  Personal Details</h2>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              {paymentDetails && (
              <>
            <tr>
          <td style={{ border: "1px solid #ddd", padding: "8px" }}>Name</td>
          <td style={{ border: "1px solid #ddd", padding: "8px" }}>{paymentDetails.name}</td>
          </tr>
          <tr>
          <td style={{ border: "1px solid #ddd", padding: "8px" }}>Phone Number</td>
          <td style={{ border: "1px solid #ddd", padding: "8px" }}>{paymentDetails.number}</td>
          </tr>
          <tr>
          <td style={{ border: "1px solid #ddd", padding: "8px" }}>Address</td>
          <td style={{ border: "1px solid #ddd", padding: "8px" }}>{paymentDetails.address}</td>
          </tr>
          <tr>
          <td style={{ border: "1px solid #ddd", padding: "8px" }}>Email</td>
          <td style={{ border: "1px solid #ddd", padding: "8px" }}>{paymentDetails.email}</td>
          </tr>
          <tr>
         <td colSpan="2" style={{ textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button style={{ padding: "8px 16px", background: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }} onClick={() => handleSelect(paymentDetails)}>Select</button>
        <button style={{ padding: "8px 16px", background: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }} onClick={() => handleSave(paymentDetails)}>Save</button>
        </div>
        </td>
        </tr>
        </>
              )}
        </tbody>
       </table>
       </div>
       </div>
       </Layout>
        );
}
 
export default BasicExampleTable;
