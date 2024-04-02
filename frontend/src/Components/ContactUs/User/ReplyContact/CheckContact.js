import React, { useState } from "react";
import axios from "axios";
import "../../contact.css";
import Header from "../../../Header/Header";
import Footer from "../../../Footer/Footer";

function CheckContact() {
  const [gmail, setGmail] = useState("");
  const [contact, setContact] = useState(null);

  const handleChange = (e) => {
    setGmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:8080/contacts?gmail=${gmail}`
      );
      console.log("Response:", response.data); // Log the response for debugging
      const relevantContact = response.data.contact.find(
        (contact) => contact.gmail === gmail
      );
      if (relevantContact) {
        setContact(relevantContact);
      } else {
        setContact(null); // Reset contact state if no relevant contact found
        alert("No contact found for the entered Gmail address");
      }
    } catch (error) {
      console.error("Error fetching contact:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="reply_full_box">
        <div>
          <div>
            <h1 className="con_topic">
              View Reply <span className="clo_us"> Messages</span>{" "}
            </h1>
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
          </div>
          <br></br>
          <div className="box_row_con">
            {contact && (
              <div className="card_con">
                <div className="reply-sub-card-but">
                  <h2 className="hmtopi-but">Name</h2>
                  <p className="sub_par_dis">{contact.name}</p>
                  <h2 className="hmtopi-but">Gmail</h2>
                  <p className="sub_par_dis">{contact.gmail}</p>
                  <h2 className="hmtopi-but">Phone Number</h2>
                  <p className="sub_par_dis">{contact.phone}</p>
                  <h2 className="hmtopi-but">Message</h2>
                  <p className="sub_par_dis">{contact.message}</p>
                  <h2 className="hmtopi-but">Reply</h2>
                  <p className="sub_par_dis">
                    {contact.reply || "No reply yet"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CheckContact;
