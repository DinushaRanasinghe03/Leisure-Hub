import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../contact.css";
function Contacts(props) {
  const { _id, name, gmail, phone, message, reply } = props.contact;

  const history = useNavigate();

  const deleteHandler = async () => {
    const Confirmed = window.confirm(
      "Are you sure you want to delete this Message Details?"
    );

    if (Confirmed) {
      try {
        await axios.delete(`http://localhost:8080/contacts/${_id}`);
        window.alert("Message details deleted successfully!");
        history("/contactdetails");
        window.location.reload(); // Reload the page
      } catch (error) {
        // Handle deletion error if needed
        console.error("Error deleting Message details:", error);
      }
    }
  };
  return (
    <div>
      <div className="card_con">
        <div className="reply-sub-card-but">
          <p className="sub_par_dis" style={{ display: "none" }}>
            {_id}
          </p>
          <h2 className="hmtopi-but">Name</h2>
          <p className="sub_par_dis">{name}</p>
          <h2 className="hmtopi-but">Gmail</h2>
          <p className="sub_par_dis">{gmail}</p>
          <h2 className="hmtopi-but">Phone Number</h2>
          <p className="sub_par_dis">{phone}</p>
          <h2 className="hmtopi-but">Message</h2>
          <p className="sub_par_dis">{message}</p>
          <h2 className="hmtopi-but">Reply</h2>
          {reply ? (
            <p className="sub_par_dis">{reply}</p>
          ) : (
            <p className="sub_par_dis">No reply yet</p>
          )}
          <Link to={`/addreply/${_id}`} className="updtbtn">
            Reply
          </Link>

          <button className="dltbtn" onClick={deleteHandler}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Contacts;
