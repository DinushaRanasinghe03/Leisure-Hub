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
  const [scheduledDate, setScheduledDate] = useState(null); // Initialize with null
  const [Time, setTime] = useState(null); // Initialize with null

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
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-6">
            <div className="card p-4">
              <h1 className="mb-4">Request Game or Activity</h1>
              <form onSubmit={handleCreate}>
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
                    placeholder="Contact person name"
                    className="form-control"
                    onChange={(e) => setMemberName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={noParticipation}
                    placeholder="Number of participants"
                    className="form-control"
                    onChange={(e) => setNoParticipation(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={contactNo}
                    placeholder="Contact number"
                    className="form-control"
                    onChange={(e) => setContactNo(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <DatePicker
                    selected={scheduledDate}
                    placeholderText="Select preferred date"
                    onChange={(date) => setScheduledDate(date)}
                    className="form-control"
                    dateFormat="MM/dd/yyyy"
                  />
                </div>
                <div className="mb-3">
                  <DatePicker
                    selected={Time}
                    placeholderText="Select preferred time"
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
                  <button type="submit" className="btn btn-primary">
                    SUBMIT REQUEST
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Gamesandactivitiesrequests;
