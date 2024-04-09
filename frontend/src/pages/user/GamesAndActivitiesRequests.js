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
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (location.state?.name) {
      setName(location.state.name); // set the name from the location state
    }
  }, [location.state]);

  const validateForm = () => {
    const errors = {};
    if (!name.trim()) {
      errors.name = "Please enter a name for the game or activity";
    }
    if (!MemberName.trim()) {
      errors.MemberName = "Please enter the contact person's name";
    }
    if (!noParticipation.trim()) {
      errors.noParticipation = "Please enter the number of participants";
    } else if (!/^\d+$/.test(noParticipation.trim())) {
      errors.noParticipation = "Number of participants must be a valid number";
    }
    if (!contactNo.trim()) {
      errors.contactNo = "Please enter a contact number";
    } else if (contactNo.trim().length !== 10) {
      errors.contactNo = "Phone number must be 10 digits";
    }
    if (!scheduledDate) {
      errors.scheduledDate = "Please select a preferred date";
    }
    if (!Time) {
      errors.Time = "Please select a preferred time";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
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
                  {errors.name && (
                    <div className="text-danger">{errors.name}</div>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={MemberName}
                    placeholder="Contact person name"
                    className="form-control"
                    onChange={(e) => setMemberName(e.target.value)}
                  />
                  {errors.MemberName && (
                    <div className="text-danger">{errors.MemberName}</div>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={noParticipation}
                    placeholder="Number of participants"
                    className="form-control"
                    onChange={(e) => setNoParticipation(e.target.value)}
                  />
                  {errors.noParticipation && (
                    <div className="text-danger">{errors.noParticipation}</div>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={contactNo}
                    placeholder="Contact number"
                    className="form-control"
                    onChange={(e) => setContactNo(e.target.value)}
                  />
                  {errors.contactNo && (
                    <div className="text-danger">{errors.contactNo}</div>
                  )}
                </div>
                <div className="mb-3">
                  <DatePicker
                    selected={scheduledDate}
                    placeholderText="Select preferred date"
                    onChange={(date) => setScheduledDate(date)}
                    className="form-control"
                    dateFormat="MM/dd/yyyy"
                  />
                  {errors.scheduledDate && (
                    <div className="text-danger">{errors.scheduledDate}</div>
                  )}
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
                  {errors.Time && (
                    <div className="text-danger">{errors.Time}</div>
                  )}
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
