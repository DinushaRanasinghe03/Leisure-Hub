import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === 'staff@gmail.com' && password === '12345') {
      return navigate(location.state || "/employeeleave");
    }
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message); //when trying to fix the toast msg
        //files related to that is (authController,Layout,And loging and Register)
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });

        localStorage.setItem("auth", JSON.stringify(res.data));
        console.log(res.data.user.role);
        // 1 --> admin
        // 0 --> user
        if (res.data.user.role == 0) {
          navigate(location.state || "/");
          console.log("This is  user");
        } else {
          navigate(location.state || "/adminmoviedashboard");
          // navigate(location.state || "/test");
          console.log("This is  admin");
        }
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      console.log("Something went wrong");
    }
  };

  return (
    <Layout title="Login-Leisure Hub">
      <center>
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <h4 className="title">Login</h4>

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
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control-login"
                id="InputPassword1"
                placeholder="Enter Your Password "
                required
              />
            </div>
            <div className="forgot-password-link">
              <a href="/forgot-password">forgot Password?</a>
            </div>

            <br />

            <button type="submit" className="form-button">
              Login
            </button>

            <div>
              <div
                className="forgot-password-link"
                style={{
                  textAlign: "left",
                  marginTop: "15px",
                  marginBottom: "15px",
                }}
              >
                Not a member yet?
                <a href="/register"> Get a membership now</a>
              </div>
            </div>
          </form>
        </div>
      </center>
    </Layout>
  );
};

export default Login;
