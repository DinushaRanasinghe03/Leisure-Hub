import React, { useState, useEffect } from "react";
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
  const [answer, setAnswer] = useState("");
  const [profilePic, setProfilePic] = useState();
  const [fnameError, setFnameError] = useState("");
  const [lnameError, setLnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();
 
  const location = window.location.pathname;
 
  // Use useEffect to set membership state based on URL parameter
  useEffect(() => {
    if (location.state && location.state.membershipType) {
      setMembership(location.state.membershipType);
    }
  }, [location.state]);
 
  const handleMembershipChange = (event) => {
    setMembership(event.target.value);
  };
  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };
 
  // const handleProfilePicChange = (event) => {
  //   setProfilePic(event.target.files[0]); // Update state with selected file
  // };
 
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
        answer,
        profilePic,
      });
 
      if (res && res.data.success) {
        navigate("/membership");
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      console.log("Something went wrong");
    }
  };
  // Handle email change and validate format
  const handleEmailChange = (e) => {
    const input = e.target.value;
    setEmail(input);
 
    // Check if the email is valid and update emailError state
    if (!validateEmail(input)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };
 
  // Function to handle first name change and validation
  const handleFnameChange = (e) => {
    const input = e.target.value;
    setFname(input);
 
    // Regular expression to check if input contains only letters
    const isValid = /^[A-Za-z]+$/.test(input);
 
    // Update error state based on validation result
    setFnameError(isValid ? "" : "Please enter a valid first name");
  };
 
  // Function to handle last name change and validation
  const handleLnameChange = (e) => {
    const input = e.target.value;
    setLname(input);
 
    // Regular expression to check if input contains only letters
    const isValid = /^[A-Za-z]+$/.test(input);
 
    // Update error state based on validation result
    setLnameError(isValid ? "" : "Please enter a valid last name");
  };
 
  return (
    <Layout title="Register-Leisure Hub">
      <div className="register">
        <table>
          <tr>
            <td>
              <div>
                <div className="membership-details">
                  <form onSubmit={handleSubmit}>
                    <h4 className="title">REGISTER FORM</h4>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <input
                          type="text"
                          value={fname}
                          // onChange={(e) => setFname(e.target.value)}
                          onChange={handleFnameChange}
                          className="form-control"
                          placeholder="First name"
                          aria-label="First name"
                          required
                        />
                        {fnameError && (
                          <p style={{ color: "red" }}>{fnameError}</p>
                        )}{" "}
                        {/* Display error message */}
                      </div>
                      <div className="col-md-6">
                        <input
                          type="text"
                          value={lname}
                          //onChange={(e) => setLname(e.target.value)}
                          onChange={handleLnameChange}
                          className="form-control"
                          placeholder="Last name"
                          aria-label="Last name"
                          required
                        />
                        {lnameError && (
                          <p style={{ color: "red" }}>{lnameError}</p>
                        )}{" "}
                        {/* Display error message */}
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <input
                          type="email"
                          value={email}
                          // onChange={(e) => setEmail(e.target.value)}
                          onChange={handleEmailChange}
                          className="form-control"
                          placeholder="Email"
                          aria-label="Email"
                          required
                        />
                        {/* Display error message for email */}
                        {emailError && (
                          <p style={{ color: "red" }}>{emailError}</p>
                        )}
                      </div>
                      <div className="col-md-6">
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="form-control"
                          placeholder="Phone number"
                          aria-label="Phone number"
                          pattern="[0-9]{10}"
                          title="Please enter a valid 10-digit phone number"
                          required
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <input
                          type="text"
                          value={address1}
                          onChange={(e) => setAddress1(e.target.value)}
                          className="form-control"
                          placeholder="Address line 1"
                          aria-label="Address line 1"
                        />
                      </div>
                      <div className="col-md-6">
                        <input
                          type="text"
                          value={address2}
                          onChange={(e) => setAddress2(e.target.value)}
                          className="form-control"
                          placeholder="Address line 2"
                          aria-label="Address line 2"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <input
                          type="date"
                          value={dob}
                          onChange={(e) => setDOB(e.target.value)}
                          className="form-control"
                          placeholder="Date of Birth"
                          aria-label="Date of Birth"
                          required
                        />
                        <small className="ml-2"> Date of Birth</small>
                      </div>
 
                      <div className="col-md-6">
                        <input
                          type="text"
                          value={answer}
                          onChange={(e) => setAnswer(e.target.value)}
                          className="form-control"
                          id="InputPassword1"
                          placeholder="What is your favorite sport? "
                          required
                        />
                        <small className="ml-2">
                          This will be used for password reset.
                        </small>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col">
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="form-control"
                          placeholder="Password"
                          aria-label="Password"
                          pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"
                          title="Password must be at least 6 characters and include at least one letter and one number"
                          required
                        />
                      </div>
                    </div>
                    {/* <div className="row mb-3">
                      <div className="col-md-6">
                        <input
                          type="file"
                          onChange={handleProfilePicChange} // Handle profile picture change
                          className="form-control"
                          accept="image/*" // Accept only image files
                          aria-label="Profile Picture"
                        />
                      </div>
                    </div> */}
 
                    <div className="additional-content">
                      <h5>Membership Types</h5>
                      <div>
                        <input
                          type="radio"
                          value="individual"
                          checked={membership === "individual"}
                          onChange={handleMembershipChange}
                        />
                        <label htmlFor="individual">
                          <b>Individual Membership</b>
                        </label>
                        <br />
                      </div>
                      <div>
                        <input
                          type="radio"
                          value="family"
                          checked={membership === "family"}
                          onChange={handleMembershipChange}
                        />
                        <label htmlFor="family">
                          <b>Family Membership</b>
                        </label>
                        <br />
                      </div>
                      Corporate memberships
                      <div>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input
                          type="radio"
                          value="corporate standard"
                          checked={membership === "corporate standard"}
                          onChange={handleMembershipChange}
                        />
                        <label htmlFor="Corporate standard">
                          <b>Corporate Standard</b>
                        </label>
                        <br />
                      </div>
                      <div>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input
                          type="radio"
                          value="corporate max"
                          checked={membership === "corporate max"}
                          onChange={handleMembershipChange}
                        />
                        <label htmlFor="Corporate max">
                          <b>Corporate Max</b>
                        </label>
                        <br />
                      </div>
                    </div>
                    <br />
 
                    <button type="submit" className="form-button">
                      Submit
                    </button>
                  </form>
                  <br />
                </div>
              </div>
            </td>
            <td>
              <div>
                <div className="membership-details">
                  <div class="col">
                    <div class="row">
                      <br />
                      <center>
                        <b>Individual membership</b>
                        <br />
                        Unlimited access to in-complex swimming pool and Gym.
                        <br />
                        Unlimited Movies and Activities.
                        <br />
                        <div class="membership-prices">LKR.5000 monthly</div>
                        <br />
                        <br />
                      </center>
                    </div>
                    <div class="row">
                      <center>
                        <b>Family membership</b>
                        <br />
                        Equivalent to 4 Individual Memberships. <br />
                        Unlimited access to in-complex swimming pool and Gym.
                        <br />
                        Unlimited Movies and Activities
                        <br />
                        <div class="membership-prices">LKR.15,000 monthly</div>
                        <br />
                        <br />
                      </center>
                    </div>
                    <div class="row">
                      <center>
                        <b>Corporate membership</b>
                        <br />
                        Get a corporate membership for your organisation.
                        <br />
                        Unlimited access to in-complex swimming pool and Gym.
                        <br />
                        Unlimited Movies and Activities.
                        <br />
                        <br />
                        <table>
                          <tr>
                            <td class="membership-prices">
                              Standard
                              package&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </td>
                            <td class="membership-prices">staff&lt;=20</td>
                            <td class="membership-prices">LKR.40,000</td>
                          </tr>
                          <tr>
                            <td class="membership-prices">Max package</td>
                            <td class="membership-prices">
                              20&lt;staff&lt;50&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </td>
                            <td class="membership-prices">LKR.80,000</td>
                          </tr>
                        </table>
                        <br />
                      </center>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </Layout>
  );
};
 
export default Register;