import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import "../FeedBack.css";
import Feeds from "./Feeds";
import SideBar from "../../SideBar/Sidebar";
import LayoutAdmin from "../../../Layout/LayoutAdmin"; 

const URL = "http://localhost:8080/feedback";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function FeedBackDetails() {
  const [feedback, setFeedback] = useState();
  useEffect(() => {
    fetchHandler().then((data) => setFeedback(data.feedback));
  }, []);

  /*pdf Function */
  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    DocumentTitle: "FeedBack Details Report",
    onafterprint: () =>
      alert("FeedBack Details Report Successfully Download !"),
  });

  /*Search Function */
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filtered = data.feedback.filter((feedback) =>
        Object.values(feedback).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setFeedback(filtered);
      setNoResults(filtered.length === 0);
    });
  };
  return (
    <LayoutAdmin>
    <div>
      
      <SideBar />
      <div className="full_box_feedback">
        <div className="action_bar">
          <div>
            <td className="">
              <input
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                name="search"
                className="serch_inpt"
                placeholder="Search Here..."
              ></input>
            </td>

            <td>
              <button onClick={handleSearch} className="seachbtn">
                Search
              </button>
            </td>
          </div>
          <div>
            <button onClick={handlePrint} className="dwon_report">
              Download Report
            </button>
          </div>
        </div>

        <div ref={ComponentsRef}>
          <h1 className="con_topic">
            Users FeedBack<span className="clo_us"> Details</span>{" "}
          </h1>
          <br></br>
          {noResults ? (
            <div>
              <br></br>
              <h1 className="con_topic">
                No Message<span className="clo_us"> Found</span>{" "}
              </h1>
            </div>
          ) : (
            <div>
              <table className="feed_tbl">
                <thead>
                  <tr>
                    <th className="details_admin_tble_col">Name</th>
                    <th className="details_admin_tble_col">Email</th>
                    <th className="details_admin_tble_col">Category</th>
                    <th className="details_admin_tble_col">Message</th>
                    <th className="details_admin_tble_col">Solution</th>
                  </tr>
                </thead>
                <tbody>
                  {feedback &&
                    feedback.map((feedback, i) => (
                      <Feeds key={i} feedback={feedback} />
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
    </LayoutAdmin>
  );
}

export default FeedBackDetails;
