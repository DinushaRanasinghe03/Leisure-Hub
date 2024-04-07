import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Rateing from "./Rates";
import { useReactToPrint } from "react-to-print";
import "./rate.css";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";

const URL = "http://localhost:8080/rates";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};
function RateDetails() {
  const [rate, setRate] = useState();
  useEffect(() => {
    fetchHandler().then((data) => setRate(data.rate));
  }, []);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filteredRate = data.rate.filter((rate) =>
        Object.values(rate).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setRate(filteredRate);
      setNoResults(filteredRate.length === 0);
    });
  };
  return (
    <div>
      <Header />
      <div className="bk_img_rate">
        <h1 className="img_rate_topic">Film Review & Ratings</h1>
      </div>
      <div className="main_container_reiew">
        <h1 className="topic_sub">Review & Ratings</h1>
        <br></br>
        <div className="main_btn_topic">
          <button
            type="button"
            className="button_ad_review"
            onClick={() => (window.location.href = "/addrate")}
          >
            Add Review
          </button>
          <button
            type="button"
            className="button_ad_review"
            onClick={() => (window.location.href = "/findrate")}
          >
            Your Review
          </button>
        </div>
        <div className="sen_serch">
          <div className="sen_serch">
            <td className="">
              <input
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                name="search"
                className="serch_inpt"
                placeholder="Search Rate Details"
              ></input>
            </td>

            <td>
              <button onClick={handleSearch} className="seachbtn">
                Search
              </button>
            </td>
          </div>
        </div>
        {noResults ? (
          <div>
            <br></br>
            <h1 className="con_topic">
              Not<span className="clo_us"> Found</span>{" "}
            </h1>
          </div>
        ) : (
          <div>
            {rate &&
              rate.map((rate, i) => (
                <div key={i}>
                  <Rateing rate={rate} />
                </div>
              ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default RateDetails;
