import axios from "axios";
import toast from "react-hot-toast";
import React, { useState } from "react";
import "../Css-Code/UserLoginSignupCSS.css";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaGooglePlusG, FaLinkedinIn } from "react-icons/fa";
import UserLoginSignupNavbar from "../Navbar-Sections/UserLoginSignupNavbar";

const UserLoginSignup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  // It's Login and Signup Panel Active useState
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  // This is Login form useState
  const [LogIn, setLogIn] = useState({ email: "", password: "" });

  // This is Signup form useState
  const [SignUp, setSignUp] = useState({
    name: "",
    surname: "",
    accountType: "user",
    email: "",
    password: "",
  });

  // This is for get value Signup form and set whole value in setSignup useState
  const ValueChange = (e) =>
    setSignUp((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // This is for get value Login form and set whole value in setLogIn useState
  const LoginValueChange = (e) =>
    setLogIn((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // Sign up Section APIs
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const res = await axios.post(`http://localhost:4000/api/v1/signup/signup`, SignUp, {
        headers: { "Content-Type": "application/json" },
      });

      const SignupEmail = res.data.user.email
      console.log(SignupEmail, "email")
      const userSignupUserid = res.data.user._id;
      
      // console.log(userSignupUserid)
      localStorage.setItem("userSignupUserid", userSignupUserid);
      toast.success("Signup successful!");
      navigate("/homepage");
      setLoading(false)

      // This API for Email sendar
      try{
        const emailResponse = await axios.post(`http://localhost:4000/api/v1/mailSend/sendMail`, {email: SignupEmail}, {
          headers: { "Content-Type": "application/json" },
        })
        console.log(emailResponse, "emailResponse")
        // console.log(emailResponse)
        toast.success("Email sent successful")

      }catch(error){
        console.log(error.message)
        toast.error("Email Not Send")
      }
    } catch (error) {
      toast.error(error.message || "Signup failed!");
    }
  };

  // Login Section APIs
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const res = await axios.post(`http://localhost:4000/api/v1/login/login`, LogIn, {
        headers: { "Content-Type": "application/json" },
      });
      const userLoginUserId = res.data.user._id;
      localStorage.setItem("userLoginUserId", userLoginUserId);
      const UserLoginAddress = res.data.user.address
      // console.log(UserLoginAddress)
      localStorage.setItem("AfterLoginUserAddress", UserLoginAddress)

      toast.success("Login successful!");
      navigate("/homepage");
      setLoading(false)
    } catch (error) {
      toast.error(error.message || "Login failed!");
    }
  };

  return (
    <div className="main-wrapper">
      <UserLoginSignupNavbar />
      <div className={`container ${isRightPanelActive ? "right-panel-active" : ""}`}>
        {/* Sign Up */}
        <div className="form-container sign-up-container">
          <form onSubmit={handleSignUpSubmit}>
            <div className="heading">Create Account</div>
            <div className="social-container">
              <div className="social"><FaFacebookF /></div>
              <div className="social"><FaGooglePlusG /></div>
              <div className="social"><FaLinkedinIn /></div>
            </div>
            <div className="small-text">or use your email for registration</div>
            <input className="input-field" type="text" name="name" placeholder="Name" value={SignUp.name} onChange={ValueChange} required />
            <input className="input-field" type="text" name="surname" placeholder="Surname" value={SignUp.surname} onChange={ValueChange} required />
            <select className="input-field" name="accountType" value={SignUp.accountType} onChange={ValueChange}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <input className="input-field" type="email" name="email" placeholder="Email" value={SignUp.email} onChange={ValueChange} required />
            <input className="input-field" type="password" name="password" placeholder="Password" value={SignUp.password} onChange={ValueChange} required />
            <button className="btn" type="submit">{loading === true ? "Loading.." : "Signup"}</button>
          </form>
        </div>

        {/* Sign In */}
        <div className="form-container sign-in-container">
          <form onSubmit={handleLoginSubmit}>
            <div className="heading">Sign in</div>
            <div className="social-container">
              <div className="social"><FaFacebookF /></div>
              <div className="social"><FaGooglePlusG /></div>
              <div className="social"><FaLinkedinIn /></div>
            </div>
            <div className="small-text">or use your account</div>
            <input className="input-field" type="email" name="email" placeholder="Email" value={LogIn.email} onChange={LoginValueChange} required />
            <input className="input-field" type="password" name="password" placeholder="Password" value={LogIn.password} onChange={LoginValueChange} required />
            <div className="forgot-link">Forgot your password?</div>
            <button className="btn" type="submit">{loading === true ? "Loading..." : "Signin"}</button>
          </form>
        </div>

        {/* Overlay Panel */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <div className="heading">Welcome Back!</div>
              <div className="text">To keep connected with us please login with your personal info</div>
              <div className="btn ghost" onClick={() => setIsRightPanelActive(false)}>Sign In</div>
            </div>
            <div className="overlay-panel overlay-right">
              <div className="heading">Hello, Friend!</div>
              <div className="text">Enter your personal details and start journey with us</div>
              <div className="btn ghost" onClick={() => setIsRightPanelActive(true)}>Sign Up</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLoginSignup;
