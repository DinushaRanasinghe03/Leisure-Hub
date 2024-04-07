import React from "react";
import "./home.css";
import ContactUs from "./img/conus.png";
import Feed from "./img/feed.png";
import Rate from "./img/rate.png";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
function Home() {
  return (
    <div>
      <Header />
      <div className="home-full-box">
        <div className="home-full-box-set">
          <div
            className="select_box"
            onClick={() => {
              window.location.href = "/addcontact";
            }}
          >
            <img src={ContactUs} className="select_img" alt="img" />
            <h1>Contact Us</h1>
          </div>
          <div
            className="select_box"
            onClick={() => {
              window.location.href = "/ratehome";
            }}
          >
            <img src={Rate} className="select_img" alt="img" />
            <h1>Review & Rating</h1>
          </div>
          <div
            className="select_box"
            onClick={() => {
              window.location.href = "/addfeed";
            }}
          >
            <img src={Feed} className="select_img" alt="img" />
            <h1>Feedback</h1>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
