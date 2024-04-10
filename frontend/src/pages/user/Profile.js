import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";

const Profile = () => {
  // Context
  const [auth, setAuth] = useAuth();

  // State
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  //const [dob, setDOB] = useState("");
  const [password, setPassword] = useState("");

  // Get user data
  useEffect(() => {
    const { fname, lname, email, phone, address1, address2, dob } = auth?.user;
    setFname(fname);
    setLname(lname);
    setEmail(email);
    setPhone(phone);
    setAddress1(address1);
    setAddress2(address2);
    //setDOB(dob);
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/api/v1/auth/profile", {
        fname,
        lname,
        email,
        phone,
        address1,
        address2,
        //dob,
        password,
      });
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleDeleteProfile = async () => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete your profile?"
      );
      if (confirmed) {
        const response = await axios.delete("/api/v1/auth/profile", {
          data: { userId: auth.user._id }, // Send user ID with the request
        });
        if (response.status === 200) {
          localStorage.removeItem("auth");
          toast.success("Profile Deleted Successfully");
          window.location.href = "/"; // Redirect to home page after deletion
        } else {
          console.error("Error deleting profile:", response.statusText);
          toast.error("Something went wrong while deleting the profile");
        }
      }
    } catch (error) {
      console.error("Error deleting profile:", error.message);
      toast.error("Something went wrong while deleting the profile");
    }
  };

  return (
    <Layout title={"Your Profile"}>
      <div className="container-fluid m-3 p-3 ">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-8">
            <div
              className="membership-details "
              style={{ position: "relative", borderRadius: "10px" }}
            >
              <form onSubmit={handleSubmit}>
                <h4 className="title">User Profile</h4>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <input
                      type="text"
                      value={fname}
                      onChange={(e) => setFname(e.target.value)}
                      className="form-control"
                      id="Inputfname"
                      placeholder="Enter Your First name "
                      autoFocus
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      value={lname}
                      onChange={(e) => setLname(e.target.value)}
                      className="form-control"
                      id="Inputlname"
                      placeholder="Enter Your Last name "
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                      id="InputEmail1"
                      placeholder="Enter Your Email "
                      disabled
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="form-control"
                      id="Inputphone"
                      placeholder="Enter Your Phone"
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
                      id="Inputaddress1"
                      placeholder="Enter Your Address line 1 "
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                      className="form-control"
                      id="Inputaddress2"
                      placeholder="Enter Your Address line 2 "
                    />
                  </div>
                </div>
                {/* <div className="mb-3">
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDOB(e.target.value)}
                    className="form-control"
                    id="Inputdob"
                  />
                </div> */}
                <div className="mb-3">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    id="InputPassword1"
                    placeholder="Enter your new password "
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="btn btn-primary mt-3"
                  style={{ position: "absolute", bottom: 20, right: 20 }}
                >
                  Update Details
                </button>
                <br />
                <br />
              </form>
            </div>
            <div
              className="membership-details"
              style={{ position: "relative", borderRadius: "10px" }}
            >
              <table style={{ width: "100%", display: "inline-table" }}>
                <tr>
                  <td style={{ verticalAlign: "middle" }}>
                    This action will permanently delete your profile and it’s
                    data.
                  </td>
                  <td style={{ verticalAlign: "middle" }}>
                    <button
                      onClick={handleDeleteProfile}
                      type="button"
                      style={{
                        marginTop: "10px",
                        backgroundColor: "red",
                      }}
                      className="btn btn-danger"
                    >
                      Delete Profile
                    </button>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
