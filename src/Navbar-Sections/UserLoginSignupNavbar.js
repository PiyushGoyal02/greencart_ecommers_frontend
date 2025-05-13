import React from 'react';
import "../Css-Code/UserLoginSignupNavbarCSS.css"
import ECommersShooping from "../Assets/E-CommersShooping.png"
import { FaHome, FaInfoCircle, FaPhone } from 'react-icons/fa';

const UserLoginSignupNavbar = () => {
  return (
    <nav className="navbar">
      {/* <div className="navbar-logo">MySite</div> */}
      <img
        src={ECommersShooping}
        className="navbar-logo"
      />
      <ul className="navbar-links">
        <li><a href="#"><FaInfoCircle /> About</a></li>
        <li><a href="#"><FaPhone /> Contact</a></li>
      </ul>
    </nav>
  );
};

export default UserLoginSignupNavbar;
