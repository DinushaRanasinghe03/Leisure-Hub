import React, { useState, useEffect } from "react";
import axios from "axios";
import Rateing from "./Rates";
import { useReactToPrint } from "react-to-print";
import "./rate.css";
import Layout from "../../../Layout/Layout";

const URL = "http://localhost:8080/rates";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function RateDetails() {
  const [rate, setRate] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchHandler().then((data) => setRate(data.rate));
  }, []);

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
    <Layout>
      <div className="bk_img_rate">
        <h1 className="img_rate_topic">Film Review & Ratings</h1>
      </div>
      <div className="main_container_reiew">
        <h1 className="topic_sub">Review & Ratings</h1>
        <br />
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
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              name="search"
              className="serch_inpt"
              placeholder="Search Rate Details"
            />
            <button onClick={handleSearch} className="seachbtn">
              Search
            </button>
          </div>
        </div>
        {noResults ? (
          <div>
            <br />
            <h1 className="con_topic">
              Not<span className="clo_us"> Found</span>{" "}
            </h1>
          </div>
        ) : (
          <div>
            {rate.map((rate, i) => (
              <div key={i}>
                <Rateing rate={rate} />
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default RateDetails;
