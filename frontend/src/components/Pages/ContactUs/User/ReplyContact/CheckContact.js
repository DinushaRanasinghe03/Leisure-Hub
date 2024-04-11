import React, { useState } from "react";
import axios from "axios";
import Layout from "../../../../Layout/Layout";
 
function CheckContact() {
  const [gmail, setGmail] = useState("");
  const [contact, setContact] = useState(null);
 
  const handleChange = (e) => {
    setGmail(e.target.value);
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:8080/contacts?gmail=${gmail}`
      );
      console.log("Response:", response.data); // Log the response for debugging
      // Check the structure of the response data
      if (Array.isArray(response.data.contacts)) {
        const relevantContact = response.data.contacts.find(
          (contact) => contact.gmail === gmail
        );
        if (relevantContact) {
          setContact(relevantContact);
        } else {
          setContact(null); // Reset contact state if no relevant contact found
          alert("No contact found for the entered Gmail address");
        }
      } else {
        console.error("Invalid response data structure:", response.data);
      }
    } catch (error) {
      console.error("Error fetching contact:", error);
    }
  };
 
  return (
    <Layout>
<div>
<div style={{ display: "flex", justifyContent: "center" }} className="reply_full_box">
<div>
<div>
<h1 style={{ textAlign: "center", textTransform: "capitalize", fontSize: "35px" }}>
              View Reply <span style={{ color: "#4890ad" }}>Messages</span>{" "}
</h1>
<form onSubmit={handleSubmit} style={{ border: "2px solid #4890ad", width: "500px", padding: "25px", borderRadius: "5px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}>
<label htmlFor="gmail" style={{ fontWeight: "500", fontSize: "18px" }}>
                Enter Your Gmail:
</label>
<input
                style={{ width: "100%", fontSize: "18px", backgroundColor: "#a7c4d2", color: "black", border: "1px solid #a7c4d2", borderRadius: "3px", padding: "4px 2px" }}
                type="email"
                id="gmail"
                name="gmail"
                value={gmail}
                onChange={handleChange}
                required
              />
<button type="submit" style={{ backgroundColor: "#4890ad", color: "white", fontSize: "25px", textAlign: "center", fontWeight: "bold", border: "2px solid #4890ad", borderRadius: "5px", padding: "4px 18px", cursor: "pointer", marginTop: "10px" }}>
                Check
</button>
</form>
</div>
<br />
<div style={{ display: "flex", justifyContent: "center" }}>
            {contact && (
<div style={{ backgroundColor: "rgba(167, 196, 210, 1)", padding: "20px 12px", width: "350px", border: "2px solid #4890ad", borderRadius: "4px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)" }}>
<h2 style={{ color: "black", fontSize: "20px", position: "relative", padding: 0, margin: 0, textTransform: "capitalize", textAlign: "start" }}>Name</h2>
<p style={{ paddingLeft: "10px", fontSize: "18px", margin: "10px 0", paddingRight: "10px" }}>{contact.name}</p>
<h2 style={{ color: "black", fontSize: "20px", position: "relative", padding: 0, margin: 0, textTransform: "capitalize", textAlign: "start" }}>Gmail</h2>
<p style={{ paddingLeft: "10px", fontSize: "18px", margin: "10px 0", paddingRight: "10px" }}>{contact.gmail}</p>
<h2 style={{ color: "black", fontSize: "20px", position: "relative", padding: 0, margin: 0, textTransform: "capitalize", textAlign: "start" }}>Phone Number</h2>
<p style={{ paddingLeft: "10px", fontSize: "18px", margin: "10px 0", paddingRight: "10px" }}>{contact.phone}</p>
<h2 style={{ color: "black", fontSize: "20px", position: "relative", padding: 0, margin: 0, textTransform: "capitalize", textAlign: "start" }}>Message</h2>
<p style={{ paddingLeft: "10px", fontSize: "18px", margin: "10px 0", paddingRight: "10px" }}>{contact.message}</p>
<h2 style={{ color: "black", fontSize: "20px", position: "relative", padding: 0, margin: 0, textTransform: "capitalize", textAlign: "start" }}>Reply</h2>
<p style={{ paddingLeft: "10px", fontSize: "18px", margin: "10px 0", paddingRight: "10px" }}>{contact.reply || "No reply yet"}</p>
</div>
            )}
</div>
</div>
</div>
</div>
</Layout>
  );
}
 
export default CheckContact;