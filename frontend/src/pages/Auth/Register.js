import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";

const Register = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [dob, setDOB] = useState("");
  const [password, setPassword] = useState("");
  const [membership, setMembership] = useState("");
  const navigate = useNavigate();

  //form function
  const handleMembershipChange = (event) => {
    setMembership(event.target.value); // Update state with the value of the selected radio button
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", {
        fname,
        lname,
        email,
        phone,
        address1,
        address2,
        dob,
        password,
        membership,
      });
      if (res && res.data.success) {
        navigate("/login");
        toast.success(res.data && res.data.message);
        // navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      console.log("Something went wrong");
    }
  };

  //console.log(process.env.REACT_APP_API);

  return (
    <Layout title="Register-Leisure Hub">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title">REGISTER FORM</h4>
          <div className="mb-3">
            <input
              type="text"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              className="form-control"
              id="Inputfname"
              placeholder="Enter Your First name "
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              className="form-control"
              id="Inputlname"
              placeholder="Enter Your Last name "
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="InputEmail1"
              placeholder="Enter Your Email "
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="Inputphone"
              placeholder="Enter Your Phone"
              //required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              className="form-control"
              id="Inputaddress1"
              placeholder="Enter Your Address line 1 "
              //required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              className="form-control"
              id="Inputaddress2"
              placeholder="Enter Your Address line 2 "
              //required
            />
          </div>

          <div className="mb-3">
            <input
              type="date"
              value={dob}
              onChange={(e) => setDOB(e.target.value)}
              className="form-control"
              id="Inputdob"
              //placeholder="Enter Your Address line 2 "
              //required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="InputPassword1"
              placeholder="Enter Your Password "
              required
            />
          </div>

          <div>
            <input
              type="radio"
              //id="individual"
              //name="membership"
              value="individual"
              checked={membership === "individual"}
              onChange={handleMembershipChange}
            />
            <label htmlFor="individual">Individual Membership</label>
            <br />
          </div>

          <div>
            <input
              type="radio"
              //id="family"
              //name="membership"
              value="family"
              checked={membership === "family"}
              onChange={handleMembershipChange}
            />
            <label htmlFor="family">Family Membership</label>
            <br />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
