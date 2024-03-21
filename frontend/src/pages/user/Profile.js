import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";

const Profile = () => {
  //context
  const [auth, setAuth] = useAuth();

  //state
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [dob, setDOB] = useState("");
  const [password, setPassword] = useState("");
  const [membership, setMembership] = useState("");

  //get user data
  useEffect(() => {
    const { fname, lname, email, phone, address1, address2, dob, membership } =
      auth?.user;
    setFname(fname);
    setLname(lname);
    setEmail(email);
    setPhone(phone);
    setAddress1(address1);
    setAddress2(address2);
    setDOB(dob);
    setMembership(membership);
  }, [auth?.user]);

  //form function
  // const handleMembershipChange = (event) => {
  //   setMembership(event.target.value); // Update state with the value of the selected radio button
  // };

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
        dob,
        password,
        membership,
      });
      if (data?.errro) {
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

  return (
    <Layout title={"Your Profile"}>
      <div className="container-fluid m-3 p-3 ">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>

          <div className="col-md-8">
            <div className="form-container" style={{ marginTop: "-40px" }}>
              <form onSubmit={handleSubmit}>
                <h4 className="title">User Profile</h4>
                <div className="mb-3">
                  <input
                    type="text"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                    className="form-control"
                    id="Inputfname"
                    placeholder="Enter Your First name "
                    //required
                    //disabled
                    autoFocus
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
                    //required
                    //disabled
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
                    //required
                    disabled
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

                {/* <div className="mb-3">
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDOB(e.target.value)}
                    className="form-control"
                    id="Inputdob"
                    //placeholder="Enter Your Address line 2 "
                    //required
                  />
                </div> */}

                <div className="mb-3">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    id="InputPassword1"
                    placeholder="Enter Your Password "
                    //required
                  />
                </div>

                {/* <div>
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
                </div> */}

                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
