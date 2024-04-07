import React from "react";

function Rates(props) {
  const { _id, filmname, name, ratestar, comment } = props.rate;

  return (
    <div>
      <div className="discard_rate">
        <div className="card_dis_details">
          <p className="topidetil">Film Name:</p>
          <p className="para_rate"> {filmname}</p>
          <p className="topidetil">User Name:</p>
          <p className="para_rate"> {name}</p>
          <p className="topidetil">Rate:</p>
          <div className="rate_display">
            <input
              readOnly
              className="starinput_display"
              type="radio"
              id="star1"
              value="1"
              checked={ratestar === "1"}
              onChange={() => {}}
            />
            <label className="starlabl_display" htmlFor="star1" title="text">
              1 stars
            </label>
            <input
              readOnly
              className="starinput_display"
              type="radio"
              value="2"
              checked={ratestar === "2"}
              onChange={() => {}}
              id="star2"
            />
            <label className="starlabl_display" htmlFor="star2" title="text">
              2 stars
            </label>
            <input
              readOnly
              className="starinput_display"
              type="radio"
              id="star3"
              value="3"
              checked={ratestar === "3"}
              onChange={() => {}}
            />
            <label className="starlabl_display" htmlFor="star3" title="text">
              3 stars
            </label>
            <input
              readOnly
              className="starinput_display"
              type="radio"
              value="4"
              checked={ratestar === "4"}
              onChange={() => {}}
              id="star4"
            />
            <label className="starlabl_display" htmlFor="star4" title="text">
              4 stars
            </label>
            <input
              readOnly
              className="starinput_display"
              type="radio"
              id="star5"
              value="5"
              checked={ratestar === "5"}
              onChange={() => {}}
            />
            <label className="starlabl_display" htmlFor="star5" title="text">
              5 star
            </label>{" "}
            <br></br>
          </div>
          <br></br><br></br><br></br>
          <p className="topidetil">Review:</p>
          <p className="para_rate"> {comment}</p>
        </div>
      </div>
    </div>
  );
}

export default Rates;
