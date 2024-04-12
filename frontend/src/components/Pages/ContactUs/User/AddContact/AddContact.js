import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "../../contact.css";
import Layout from './../../../../Layout/Layout';

function AddContact() {
  const navigate = useNavigate(); // Changed variable name to navigate
  const [inputs, setInputs] = useState({
    name: "",
    gmail: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    await sendRequest();
    window.alert("Message Sent successfully!");
    navigate("/addcontact");
    window.location.reload();
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:8080/contacts", {
      name: inputs.name,
      gmail: inputs.gmail,
      phone: inputs.phone,
      message: inputs.message,
    });
  };

  return (
    <Layout>
    <div>    
      <div>
        <div className="Contact_full_box">
          <div>
            <h1 className="con_topic">
              Contact <span className="clo_us"> Us</span>{" "}
            </h1>
            <div>
              <button
                type="submit"
                className="send_btn_con_viw"
                onClick={() => {
                  window.location.href = "/checkcontact";
                }}
              >
                View Reply
              </button>
            </div>
            <form onSubmit={handleSubmit} className="Contact_full_box_form">
              <label className="Contact_full_box_label">Name</label>
              <br></br>
              <input
                className="Contact_full_box_input"
                type="text"
                name="name"
                value={inputs.name}
                onChange={handleChange}
                required
              />
              <br></br>
              <label className="Contact_full_box_label">Email</label>
              <br></br>
              <input
                className="Contact_full_box_input"
                type="email"
                name="gmail"
                value={inputs.gmail}
                onChange={handleChange}
                required
              />
              <br></br>
              <label className="Contact_full_box_label">Phone</label>
              <br></br>
              <input
                className="Contact_full_box_input"
                type="text"
                name="phone"
                pattern="[0-9]{10}"
                title="Please enter a 10-digit phone number"
                value={inputs.phone}
                onChange={handleChange}
                required
              />
              <br></br>
              <label className="Contact_full_box_label">Message</label>
              <br></br>
              <textarea
                className="Contact_full_box_input text_con"
                name="message"
                value={inputs.message}
                onChange={handleChange}
                required
              />
              <br></br>
              <button type="submit" className="send_btn_con">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
}

export default AddContact;
