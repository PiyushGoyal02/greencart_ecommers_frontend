import axios from "axios";
import toast from "react-hot-toast";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../AdminSectionCSS/AdminLoginSigupCSS.css";
import AdminNavbar from "../Navbar-Sections/AdminNavbar";
import { FaFacebookF, FaGooglePlusG, FaLinkedinIn } from "react-icons/fa";

function AdminLoginSigup() {

  const navigate = useNavigate();

  // For Right Panel Signup New Account
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  // Login And Signup useState
  const [LogIn, setLogIn] = useState({ email: "goyalp3542@gmail.com", password: "1212" });
  const [SignUp, setSignUp] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    accountType: "admin",
  });

  // For SignUp Input
  const ValueChange = (event) => {
    setSignUp((preValue) => ({
      ...preValue,
      [event.target.name]: event.target.value,
    }));
  };

  // For Login Input
  const LoginValueChange = (event) => {
    setLogIn((preValue) => ({
      ...preValue,
      [event.target.name]: event.target.value,
    }));
  };

  // Sign up Section
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    try {
      const responceSignup = await axios.post(
        `http://localhost:4000/api/v1/signup/signup`,
        SignUp,
        {
          headers: {"Content-Type": "application/json"},
        }
      );
      console.log(responceSignup.data);
      toast.success("Admin Signup successful!");
      navigate("/adminhomepage");
    } catch (error) {
      toast.error(error.message || "Signup failed!");
    }
  };

  // Login Section
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const responceLogin = await axios.post(
        `http://localhost:4000/api/v1/adminLogin/adminlogin`,
        LogIn,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(responceLogin.data);
      toast.success("Admin Login successful!");
      navigate("/adminhomepage");
    } catch (error) {
      toast.error(error.message || "Login failed!");
    }
  };

  return (
    <div>
      <AdminNavbar />

      <div
        className={`container AdminContainer ${
          isRightPanelActive ? "right-panel-active" : ""
        }`}
        id="container"
      >
        {/* Sign Up */}
        <div className="form-container sign-up-container">
          <form onSubmit={handleSignUpSubmit}>
            <div className="heading">Create Account</div>
            <div className="social-container">
              <div className="social">
                <FaFacebookF />
              </div>
              <div className="social">
                <FaGooglePlusG />
              </div>
              <div className="social">
                <FaLinkedinIn />
              </div>
            </div>
            <div className="small-text">or use your email for registration</div>

            <input
              required
              name="name"
              value={SignUp.name}
              onChange={ValueChange}
              className="input-field"
              type="text"
              placeholder="Name"
            />

            <input
              required
              name="surname"
              value={SignUp.surname}
              onChange={ValueChange}
              className="input-field"
              type="text"
              placeholder="Surname"
            />

            {/* Account Type Dropdown */}
            <select
              required
              name="accountType"
              value={SignUp.accountType}
              onChange={ValueChange}
              className="input-field"
            >
              <option value="Admin">Admin</option>
            </select>

            <input
              required
              name="email"
              value={SignUp.email}
              onChange={ValueChange}
              className="input-field"
              type="email"
              placeholder="Email"
            />
            <input
              required
              name="password"
              value={SignUp.password}
              onChange={ValueChange}
              className="input-field"
              type="password"
              placeholder="Password"
            />
            <button type="submit" className="btn">
              Sign Up
            </button>
          </form>
        </div>

        {/* Sign In */}
        <div className="form-container sign-in-container">
          <form onSubmit={handleLoginSubmit}>
            <div className="heading">Sign in</div>
            <div className="social-container">
              <div className="social">
                <FaFacebookF />
              </div>
              <div className="social">
                <FaGooglePlusG />
              </div>
              <div className="social">
                <FaLinkedinIn />
              </div>
            </div>
            <div className="small-text">or use your account</div>
            <input
              required
              name="email"
              value={LogIn.email}
              onChange={LoginValueChange}
              className="input-field"
              type="email"
              placeholder="Email"
            />
            <input
              required
              name="password"
              value={LogIn.password}
              onChange={LoginValueChange}
              className="input-field"
              type="password"
              placeholder="Password"
            />
            <div className="forgot-link">Forgot your password?</div>
            <button type="submit" className="btn">
              Sign In
            </button>
          </form>
        </div>

        {/* Overlay Panel */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <div className="heading">Welcome Back!</div>
              <div className="text">
                To keep connected with us please login with your personal info
              </div>
              <div
                className="btn ghost"
                onClick={() => setIsRightPanelActive(false)}
              >
                Sign In
              </div>
            </div>
            <div className="overlay-panel overlay-right">
              <div className="heading">Hello, Friend!</div>
              <div className="text">
                Enter your personal details and start journey with us
              </div>
              <div
                className="btn ghost"
                onClick={() => setIsRightPanelActive(true)}
              >
                Sign Up
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginSigup;
