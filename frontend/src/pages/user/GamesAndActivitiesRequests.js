import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";

const Gamesandactivitiesrequests = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState("");
  const [MemberName, setMemberName] = useState("");
  const [noParticipation, setNoParticipation] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [scheduledDate, setScheduledDate] = useState(new Date());
  const [Time, setTime] = useState(new Date());

  useEffect(() => {
    if (location.state?.name) {
      setName(location.state.name); // set the name from the location state
    }
  }, [location.state]);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const gameandactivityRequestData = new FormData();
      gameandactivityRequestData.append("name", name);
      gameandactivityRequestData.append("MemberName", MemberName);
      gameandactivityRequestData.append("noParticipation", noParticipation);
      gameandactivityRequestData.append("contactNo", contactNo);
      gameandactivityRequestData.append("scheduledDate", scheduledDate);
      gameandactivityRequestData.append("Time", Time);
      const { data } = await axios.post(
        "/api/v1/gameandactivityRequest/create-gameandactivityRequest",
        gameandactivityRequestData
      );
      if (data?.success) {
        setTimeout(() => {
          toast.success("Successfully added a Request");
        }, 1000);
        navigate("/gamesandactivities");
      } else {
        toast.error("Somthing went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-9">
            <h1>Request Game or Activity</h1>
            <div className="m-1 w-75"></div>
            <div className="mb-3">
              <input
                type="text"
                value={name}
                placeholder="Game or Activity name"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={MemberName}
                placeholder="Mention contact person name"
                className="form-control"
                onChange={(e) => setMemberName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={noParticipation}
                placeholder="Mention number of participants"
                className="form-control"
                onChange={(e) => setNoParticipation(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={contactNo}
                placeholder="Add contact number"
                className="form-control"
                onChange={(e) => setContactNo(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <DatePicker
                selected={scheduledDate}
                onChange={(date) => setScheduledDate(date)}
                className="form-control"
                dateFormat="MM/dd/yyyy"
              />
            </div>
            <div className="mb-3">
              <DatePicker
                selected={Time}
                onChange={(time) => setTime(time)}
                showTimeSelect
                showTimeSelectOnly
                dateFormat="h:mm aa"
                className="form-control"
                timeIntervals={60}
                timeCaption="Time"
                minTime={new Date().setHours(8, 0)} // 8:00 AM
                maxTime={new Date().setHours(22, 0)} // 10:00 PM
              />
            </div>

            <div className="mb-3">
              <button className="btn btn-primary" onClick={handleCreate}>
                SUBMIT REQUEST
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Gamesandactivitiesrequests;
