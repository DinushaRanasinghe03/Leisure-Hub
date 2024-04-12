import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Contact from "./Contacts";
import { useReactToPrint } from "react-to-print";
import SideBar from "../../../SideBar/Sidebar";
import LayoutAdmin from "../../../../Layout/LayoutAdmin";

const URL = "http://localhost:8080/contacts";

const fetchContacts = async () => {
  try {
    const response = await axios.get(URL);
    return response.data.contacts; // Assuming the API response has a "contacts" array
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return []; // Return an empty array if there's an error
  }
};

function ContactDetails() {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchContacts().then((data) => setContacts(data));
  }, []);

  const ComponentsRef = useRef();

  const handleSearch = () => {
    fetchContacts().then((data) => {
      const filteredContacts = data.filter((contact) =>
        Object.values(contact).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setContacts(filteredContacts);
      setNoResults(filteredContacts.length === 0);
    });
  };

  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "Contact Details Report",
    onAfterPrint: () => alert("Contact Details Report Successfully Downloaded!"),
  });

  return (
    <LayoutAdmin>
    <div>
      <div style={{ position: "fixed", left: 0, top: 0, height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <SideBar />
      </div>
      <div className="contact_main" style={{ marginLeft: "200px" }}>
        <div className="cen_box">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            name="search"
            style={{ padding: "8px", marginRight: "10px" }}
            placeholder="Search Contact Details"
          />
          <button onClick={handleSearch} style={{ padding: "8px", backgroundColor: "#007bff", color: "#fff", border: "none", cursor: "pointer" }}>
            Search
          </button>
        </div>
        <div>
          <button onClick={handlePrint} style={{ padding: "8px", backgroundColor: "#28a745", color: "#fff", border: "none", cursor: "pointer" }}>
            Download Report
          </button>
        </div>
        <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>
          Users Messages<span style={{ color: "#777" }}> List</span>
        </h1>
        {noResults ? (
          <div>
            <br />
            <h1 style={{ fontSize: "20px" }}>
              No Messages<span style={{ color: "#777" }}> Found</span>
            </h1>
          </div>
        ) : (
          <div ref={ComponentsRef} className="box_row_con">
            {contacts.map((contact, index) => (
              <div key={index} style={{ marginBottom: "20px" }}>
                <Contact contact={contact} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </LayoutAdmin>
  );
}

export default ContactDetails;
