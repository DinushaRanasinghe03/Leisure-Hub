import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../FeedBack.css";

function Feeds(props) {
  const { _id, name, gmail, category, message, solution } = props.feedback;

  return (
    <tr>
      <td className="details_admin_tble_col">{name}</td>
      <td className="details_admin_tble_col">{gmail}</td>
      <td className="details_admin_tble_col">{category}</td>
      <td className="details_admin_tble_col">{message}</td>
      <td className="details_admin_tble_col">{solution}</td>
    </tr>
  );
}

export default Feeds;
