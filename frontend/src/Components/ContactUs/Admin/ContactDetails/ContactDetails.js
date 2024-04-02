import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Contact from "./Contacts";
import { useReactToPrint } from "react-to-print";
import "../../contact.css";
import SideBar from "../../../SideBar/Sidebar";
import AdminNav from "../../../AdminMenu/AdminMovieMenu"


const URL = "http://localhost:8080/contacts";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};
function ContactDetails() {
  const [contact, setContact] = useState();
  useEffect(() => {
    fetchHandler().then((data) => setContact(data.contact));
  }, []);

  /*pdf Function */
  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    DocumentTitle: "Contact Details Report",
    onafterprint: () => alert("Contact Details Report Successfully Download !"),
  });

  /*Search Function */
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filteredContact = data.contact.filter((contact) =>
        Object.values(contact).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setContact(filteredContact);
      setNoResults(filteredContact.length === 0);
    });
  };
  return (
    <div>
      <AdminNav/>
      <SideBar />
      <div className="contact_main">
        <div className="cen_box">
          <div>
            <td className="">
              <input
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                name="search"
                className="serch_inpt"
                placeholder="Search Contact Details"
              ></input>
            </td>

            <td>
              <button onClick={handleSearch} className="seachbtn">
                Search
              </button>
            </td>
          </div>
        </div>
        <div>
          <button onClick={handlePrint} className="dwonrept">
            Download Report
          </button>
        </div>
        <h1 className="con_topic">
          Users Message<span className="clo_us"> List</span>
        </h1>
        <br />
        {noResults ? (
          <div>
            <br></br>
            <h1 className="con_topic">
              No Message<span className="clo_us"> Found</span>
            </h1>
          </div>
        ) : (
          <div>
            <div ref={ComponentsRef} className="box_row_con">
              {contact &&
                contact.map((contact, i) => (
                  <div key={i}>
                    <Contact contact={contact} />
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactDetails;
