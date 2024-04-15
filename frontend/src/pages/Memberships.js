import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";

const Memberships = () => {
  const [auth, setAuth] = useAuth();

  // Function to handle the click event on the "Join Now" button
  const handleJoinNow = (membershipType) => {
    // Here you can perform any necessary actions before redirecting
    // For simplicity, I'm just setting the membership type in local storage
    localStorage.setItem("membershipType", membershipType);
  };

  return (
    <Layout title={"Memberships - Leisure Hub"}>
      <div className="container">
        {/* <h1>Memberships we offer:</h1> */}
        <br />
        <br />
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <img
                src="https://www.trilogyactive.co.uk/_webedit/cached-images/1796-0-0-164-10000-9672-768.jpg"
                className="card-img-top"
                alt="Individual Membership"
              />
              <div className="card-body">
                <h2 className="card-title">Individual Membership</h2>
                <p className="card-text">
                  Perfect for solo adventurers and fitness enthusiasts. Access
                  to all individual facilities.
                </p>
                <Link
                  to={{
                    pathname: "/register",
                    state: { membershipType: "individual" },
                  }}
                >
                  <button
                    className="btn btn-primary"
                    onClick={() => handleJoinNow("individual")}
                  >
                    Join Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <img
                src="https://www.trilogyactive.co.uk/_webedit/cached-images/83-0-0-0-10000-10000-768.jpg"
                className="card-img-top"
                alt="Family Membership"
              />
              <div className="card-body">
                <h2 className="card-title">Family Membership</h2>
                <p className="card-text">
                  Great for families looking for quality time together. Includes
                  access for all family members.
                </p>
                <Link
                  to={{
                    pathname: "/register",
                    state: { membershipType: "family" },
                  }}
                >
                  <button
                    className="btn btn-primary"
                    onClick={() => handleJoinNow("family")}
                  >
                    Join Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <img
                src="https://www.trilogyactive.co.uk/_webedit/cached-images/24-0-0-0-10000-10000-768.jpg"
                className="card-img-top"
                alt="Corporate Membership"
              />
              <div className="card-body">
                <h2 className="card-title">Corporate Membership</h2>
                <p className="card-text">
                  Designed for companies to promote employee well-being. Group
                  discounts and additional perks available.
                </p>
                <Link
                  to={{
                    pathname: "/register",
                    state: { membershipType: "corporate standared" },
                  }}
                >
                  <button
                    className="btn btn-primary"
                    onClick={() => handleJoinNow("corporate standared")}
                  >
                    Join Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
    </Layout>
  );
};

export default Memberships;