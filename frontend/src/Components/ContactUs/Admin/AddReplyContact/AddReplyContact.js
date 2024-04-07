import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import "../../contact.css";
import SideBar from "../../../SideBar/Sidebar";
import AdminNav from "../../../AdminMenu/AdminMovieMenu"

function AddReplyContact() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:8080/contacts/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.contact));
    };
    fetchHandler();
  }, [id]);
  const sendRequest = async () => {
    await axios
      .put(`http://localhost:8080/contacts/${id}`, {
        name: String(inputs.name),
        gmail: String(inputs.gmail),
        phone: String(inputs.phone),
        message: String(inputs.message),
        reply: String(inputs.reply),
      })
      .then((res) => res.data);
  };
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);

    sendRequest().then(() => {
      window.alert("Reply send successfully!");
      history("/contactdetails");
    });
  };
  return (
    <div>
       <AdminNav/>
      <SideBar />
      <div className="Contact_full_box">
        <div>
          <h1 className="con_topic">
            Reply <span className="clo_us"> Message</span>{" "}
          </h1>
          <form onSubmit={handleSubmit} className="Contact_full_box_form">
            <label className="Contact_full_box_label">Name</label>
            <br></br>
            <input
              className="Contact_full_box_input"
              type="text"
              name="name"
              value={inputs.name}
              onChange={handleChange}
              readOnly
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
              readOnly
            />
            <br></br>
            <label className="Contact_full_box_label">Phone</label>
            <br></br>
            <input
              className="Contact_full_box_input"
              type="text"
              name="phone"
              value={inputs.phone}
              onChange={handleChange}
              readOnly
            />
            <br></br>
            <label className="Contact_full_box_label">Message</label>
            <br></br>
            <textarea
              className="Contact_full_box_input text_con"
              name="message"
              value={inputs.message}
              onChange={handleChange}
              readOnly
            />
            <br></br>
            <label className="Contact_full_box_label">Reply</label>
            <br></br>
            <textarea
              className="Contact_full_box_input text_con"
              name="reply"
              value={inputs.reply}
              onChange={handleChange}
              required
            />
            <br></br>
            <button type="submit" className="send_btn_con">
              Send Reply
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddReplyContact;
