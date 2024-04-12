import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "../FeedBack.css";
import Layout from './../../../Layout/Layout';


function AddFeedBack() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    gmail: "",
    category: "",
    message: "",
    solution:"",
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
    window.alert("FeedBack Send successfully!");
    navigate("/addfeed");
    window.location.reload();
  };
  const sendRequest = async () => {
    await axios.post("http://localhost:8080/feedback", {
      name: inputs.name,
      gmail: inputs.gmail,
      category: inputs.category,
      message: inputs.message,
      solution: inputs.solution,
    });
  };

  return (
    <Layout>
    <div>
      
      <div className="Contact_full_box">
        <div>
          <h1 className="con_topic">
            Add <span className="clo_us"> Feedback</span>{" "}
          </h1>
          <br></br>
          <form onSubmit={handleSubmit} className="Contact_full_box_form">
            <label className="Contact_full_box_label">Full Name</label>
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
            <label className="Contact_full_box_label">
              Please Slect Your FeedBack Category
            </label>
            <br></br>
            <select
              className="Contact_full_box_input"
              name="category"
              value={inputs.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              <option value="Movie">Movie</option>
              <option value="Games">Games</option>
              <option value="Activities">
              Activities
              </option>
              <option value="Other">Other</option>
            </select>

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

            <label className="Contact_full_box_label">Solution</label>
            <br></br>
            <textarea
              className="Contact_full_box_input text_con"
              name="solution"
              value={inputs.solution}
              onChange={handleChange}
              required
            />
            <br></br>
            <button type="submit" className="send_btn_con">
              Submit
            </button>
          </form>
        </div>
      </div>
  
    </div>
    </Layout>
  );
}

export default AddFeedBack;
