import { useState } from "react";
import "../Css-Code/ProfileDetailsCSS.css";
import toast from "react-hot-toast";
import HomePageNavbar from "../Navbar-Sections/HomePageNavbar";
import axios from "axios";

function ProfileDetails() {

  // Get All User Details and save in this useState
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    address: "",
    landmark: "",
    pincode: "",
    number: "",
    houseNum: "",
    state: "",
    country: "",
    type: "Home"
  });

  // Target each form value and save in useState
  function changeFormHandler(event) {
    const { name, value } = event.target;
    setFormData((prevValue) => ({
      ...prevValue,
      [name]: value
    }));
  }

  // After Submit Funtion and with also API call.
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get userId After User Login and Signup
    const userId = localStorage.getItem("userLoginUserId") || localStorage.getItem("userSignupUserid");
    console.log(userId)

    // Check if userId is available
    if (!userId) {
      toast.error("User not logged in. Please login first.");
      return;
    }

    // Combine form data with userId and pass it to the API
    const combinedData = {
      ...formData,
      userId,
    };

    try {
      const profileDetailsResponce = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/profileDetails/profileDetails`,
        combinedData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const final = profileDetailsResponce.data;
      console.log(final);
      toast.success("Your Data Softly Updated!");
    } catch (error) {
      console.log(error.message);
      toast.error("Your Profile Didn't Update");
    }
  };

  return (
    <div className="pd-page-wrapper">
      <HomePageNavbar />
      <div className="pd-form-wrapper">
        <form className="pd-form" onSubmit={handleSubmit}>
          <h2 className="pd-title">Profile Details</h2>

          <div className="pd-row">
            <div className="pd-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Type here..."
                required
                value={formData.name}
                onChange={changeFormHandler}
              />
            </div>
            <div className="pd-group">
              <label htmlFor="surname">Surname</label>
              <input
                type="text"
                name="surname"
                id="surname"
                placeholder="Type here..."
                required
                value={formData.surname}
                onChange={changeFormHandler}
              />
            </div>
          </div>

          <div className="pd-row">
            <div className="pd-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Type here..."
                required
                value={formData.email}
                onChange={changeFormHandler}
              />
            </div>
            <div className="pd-group">
              <label htmlFor="number">Phone No.</label>
              <input
                type="text"
                name="number"
                id="number"
                placeholder="Type here..."
                required
                value={formData.number}
                onChange={changeFormHandler}
              />
            </div>
          </div>

          <div className="pd-row">
            <div className="pd-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Type here..."
                required
                value={formData.address}
                onChange={changeFormHandler}
              />
            </div>
            <div className="pd-group">
              <label htmlFor="pin">Pin Code</label>
              <input
                type="text"
                name="pincode"
                id="pin"
                placeholder="Type here..."
                required
                value={formData.pincode}
                onChange={changeFormHandler}
              />
            </div>
          </div>

          <div className="pd-row">
            <div className="pd-group">
              <label htmlFor="landmark">Landmark</label>
              <input
                type="text"
                name="landmark"
                id="landmark"
                placeholder="Type here..."
                required
                value={formData.landmark}
                onChange={changeFormHandler}
              />
            </div>
            <div className="pd-group">
              <label htmlFor="houseNum">House No.</label>
              <input
                type="text"
                name="houseNum"
                id="houseNum"
                placeholder="Type here..."
                required
                value={formData.houseNum}
                onChange={changeFormHandler}
              />
            </div>
          </div>

          <div className="pd-row">
            <div className="pd-group">
              <label htmlFor="state">State</label>
              <input
                type="text"
                name="state"
                id="state"
                placeholder="Type here..."
                required
                value={formData.state}
                onChange={changeFormHandler}
              />
            </div>
            <div className="pd-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                name="country"
                id="country"
                placeholder="Type here..."
                required
                value={formData.country}
                onChange={changeFormHandler}
              />
            </div>
          </div>

          <div className="pd-radio-options">
            <label>
              <input
                type="radio"
                name="type"
                value="Home"
                checked={formData.type === "Home"}
                onChange={changeFormHandler}
              />
              Home
            </label>
            <label>
              <input
                type="radio"
                name="type"
                value="Office"
                checked={formData.type === "Office"}
                onChange={changeFormHandler}
              />
              Office
            </label>
          </div>

          <button type="submit" className="pd-submit-btn">
            Save Details
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfileDetails;
