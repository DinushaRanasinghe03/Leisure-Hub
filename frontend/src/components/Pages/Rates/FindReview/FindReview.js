import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../RateDetails/rate.css";
import Layout from "../../../Layout/Layout";


function FindReview() {
  const [gmail, setGmail] = useState("");
  const [rates, setRates] = useState([]);
  const history = useNavigate();
  const handleChange = (e) => {
    setGmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:8080/rates?gmail=${gmail}`
      );
      console.log("Response:", response.data); // Log the response for debugging

      // Filter and set only the relevant rates for the provided Gmail address
      const relevantRates = response.data.rate.filter(
        (rate) => rate.gmail === gmail
      );

      // Set the filtered rates
      setRates(relevantRates);

      // If no relevant rates found, show an alert
      if (relevantRates.length === 0) {
        alert("No ratings found for the entered Gmail address");
      }
    } catch (error) {
      console.error("Error fetching ratings:", error);
    }
  };
  const deleteHandler = async (rateId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Details?"
    );

    if (confirmed) {
      try {
        await axios.delete(`http://localhost:8080/rates/${rateId}`);
        window.alert("rates details deleted successfully!");
        window.location.reload();
      } catch (error) {
        // Handle deletion error if needed
        console.error("Error deleting Message details:", error);
      }
    }
  };

  return (
    <Layout>
    <div>
    
      <div className="rateee_full_box">
        <div>
          <h1 className="con_topic">
            View Your <span className="clo_us"> Review</span>{" "}
          </h1>
          <br></br>
          <form onSubmit={handleSubmit} className="Contact_full_box_form">
            <label htmlFor="gmail" className="Contact_full_box_label">
              Enter Your Gmail:
            </label>
            <input
              className="Contact_full_box_input"
              type="email"
              id="gmail"
              name="gmail"
              value={gmail}
              onChange={handleChange}
              required
            />
            <button type="submit" className="send_btn_con">
              Check
            </button>
          </form>
          <br></br>
          <div className="box_row_con_rate">
            {rates.map((rate, index) => (
              <div key={index} className="card_con">
                <div className="rate-box_card">
                  <h2 className="hmtopi-but">Film Name</h2>
                  <p className="sub_par_dis">{rate.filmname}</p>
                  <h2 className="hmtopi-but">User Name</h2>
                  <p className="sub_par_dis">{rate.name}</p>
                  <h2 className="hmtopi-but">User Gmail</h2>
                  <p className="sub_par_dis">{rate.gmail}</p>
                  <p className="topidetil">Rate:</p>
                  <div className="rate_display">
                    <input
                      readOnly
                      className="starinput_display"
                      type="radio"
                      id="star1"
                      value="1"
                      checked={rate.ratestar === "1"}
                      onChange={() => {}}
                    />
                    <label
                      className="starlabl_display"
                      htmlFor="star1"
                      title="text"
                    >
                      1 stars
                    </label>
                    <input
                      readOnly
                      className="starinput_display"
                      type="radio"
                      value="2"
                      checked={rate.ratestar === "2"}
                      onChange={() => {}}
                      id="star2"
                    />
                    <label
                      className="starlabl_display"
                      htmlFor="star2"
                      title="text"
                    >
                      2 stars
                    </label>
                    <input
                      readOnly
                      className="starinput_display"
                      type="radio"
                      id="star3"
                      value="3"
                      checked={rate.ratestar === "3"}
                      onChange={() => {}}
                    />
                    <label
                      className="starlabl_display"
                      htmlFor="star3"
                      title="text"
                    >
                      3 stars
                    </label>
                    <input
                      readOnly
                      className="starinput_display"
                      type="radio"
                      value="4"
                      checked={rate.ratestar === "4"}
                      onChange={() => {}}
                      id="star4"
                    />
                    <label
                      className="starlabl_display"
                      htmlFor="star4"
                      title="text"
                    >
                      4 stars
                    </label>
                    <input
                      readOnly
                      className="starinput_display"
                      type="radio"
                      id="star5"
                      value="5"
                      checked={rate.ratestar === "5"}
                      onChange={() => {}}
                    />
                    <label
                      className="starlabl_display"
                      htmlFor="star5"
                      title="text"
                    >
                      5 star
                    </label>
                    <br></br>
                  </div>
                  <br></br> <br></br> <br></br>
                  <p className="topidetil">Review:</p>
                  <p className="sub_par_dis">{rate.comment}</p>
                  <Link to={`/updatereview/${rate._id}`} className="updtbtn">
                    Update
                  </Link>
                  <button
                    className="dltbtn"
                    onClick={() => deleteHandler(rate._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
    </div>
    </Layout>
  );
}

export default FindReview;
