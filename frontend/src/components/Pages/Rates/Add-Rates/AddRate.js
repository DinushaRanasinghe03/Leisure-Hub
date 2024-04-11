import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "../RateDetails/rate.css";
import Layout from "../../../Layout/Layout";


function AddRate() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    filmname: "",
    name: "",
    gmail: "",
    ratestar: "",
    comment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "ratestar" ? value : value.trim();
    setInputs((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);

    // Convert ratestar value to an integer before sending the request
    const ratestarInt = parseInt(inputs.ratestar);

    await sendRequest({
      ...inputs,
      ratestar: ratestarInt,
    });
    window.alert("Rating added successfully!");
    navigate("/ratehome");
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:8080/rates", {
      filmname: inputs.filmname,
      name: inputs.name,
      gmail: inputs.gmail,
      ratestar: inputs.ratestar,
      comment: inputs.comment,
    });
  };

  return (
    <Layout>
    <div>
  
      <div className="rate_f_box">
        <div>
          <h1 className="rate-topic">
            Add <span className="rate-us">Review</span>{" "}
          </h1>
          <div className="rate-full-box">
            <div>
              <form onSubmit={handleSubmit} className="rate-full-box-form">
                <label className="add_form_label">Film Name</label>
                <input
                  required
                  type="text"
                  value={inputs.filmname}
                  onChange={handleChange}
                  name="filmname"
                  className="add_form_input"
                />

                <label className="add_form_label">Your Name</label>
                <input
                  required
                  type="text"
                  name="name"
                  value={inputs.name}
                  onChange={handleChange}
                  className="add_form_input"
                />

                <label className="add_form_label">Your Gmail</label>
                <input
                  required
                  type="email"
                  value={inputs.gmail}
                  onChange={handleChange}
                  name="gmail"
                  className="add_form_input"
                />

                <label className="add_form_label">Rate</label>
                <div className="rate">
                  <input
                    className="starinput"
                    type="radio"
                    id="star1"
                    value="1"
                    checked={inputs.ratestar === "1"}
                    onChange={handleChange}
                    name="ratestar"
                  />
                  <label className="starlabl" htmlFor="star1" title="text">
                    1 stars
                  </label>
                  <input
                    className="starinput"
                    type="radio"
                    value="2"
                    checked={inputs.ratestar === "2"}
                    onChange={handleChange}
                    id="star2"
                    name="ratestar"
                  />
                  <label className="starlabl" htmlFor="star2" title="text">
                    2 stars
                  </label>
                  <input
                    className="starinput"
                    type="radio"
                    id="star3"
                    value="3"
                    checked={inputs.ratestar === "3"}
                    onChange={handleChange}
                    name="ratestar"
                  />
                  <label className="starlabl" htmlFor="star3" title="text">
                    3 stars
                  </label>
                  <input
                    className="starinput"
                    type="radio"
                    value="4"
                    checked={inputs.ratestar === "4"}
                    onChange={handleChange}
                    id="star4"
                    name="ratestar"
                  />
                  <label className="starlabl" htmlFor="star4" title="text">
                    4 stars
                  </label>
                  <input
                    className="starinput"
                    type="radio"
                    id="star5"
                    value="5"
                    checked={inputs.ratestar === "5"}
                    onChange={handleChange}
                    name="ratestar"
                  />
                  <label className="starlabl" htmlFor="star5" title="text">
                    5 star
                  </label>
                </div>
                <label className="add_form_label">Review</label>
                <textarea
                  required
                  type="email"
                  name="comment"
                  value={inputs.comment}
                  onChange={handleChange}
                  className="add_form_input rate_text_area"
                />

                <button type="submit" className="rate-add-btn">
                  Add Rate
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    
    </div>
    </Layout>
  );
}

export default AddRate;
