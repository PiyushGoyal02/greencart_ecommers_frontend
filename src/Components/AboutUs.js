import "../Css-Code/AboutUsCSS.css";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineLocalShipping } from "react-icons/md";
import HomePageNavbar from "../Navbar-Sections/HomePageNavbar";
import { RiExchangeLine } from "react-icons/ri";
import { IoIosLock } from "react-icons/io";
import Footer from "./Footer";

function AboutUs() {
  return (
    <div>
        <HomePageNavbar />

        <div className="about-container">
            <h2 className="about-heading">ABOUT US</h2>
            <p className="about-text">
                Welcome to <strong>FreshBasket</strong> – Your Daily Dose of
                Freshness!
                <br />
                <br />
                At FreshBasket, we believe that quality groceries are the heart of
                every happy home. Our mission is to bring you the freshest fruits,
                vegetables, and everyday essentials – straight from trusted farms and
                brands to your doorstep.
                <br />
                <br />
                From juicy mangoes and crisp spinach to daily staples like basmati
                rice, Amul milk, Maggi noodles, and sweet treats like chocolates – we
                have something for everyone. Our handpicked selection is curated to
                ensure health, taste, and convenience in every order.
                <br />
                <br />
                We’re more than just an online grocery store – we’re your reliable
                partner for everyday needs. With a smooth shopping experience, secure
                payments, and on-time delivery, we ensure your kitchen stays stocked
                and your meals stay joyful.
                <br />
                <br />
                Our team is passionate about freshness, quality, and customer
                satisfaction. Whether you're preparing a healthy salad or a cozy
                comfort meal, FreshBasket is here to serve you with the best.
                <br />
                <br />
                Thank you for choosing FreshBasket. Eat fresh, live better – happy
                shopping!
            </p>

            <div className="features-section">
                <div className="feature-item">
                    <FaRegHeart className="fas fa-heart feature-icon" />
                    <p>
                        Indian Website<br />With Love
                    </p>
                </div>
                <div className="feature-item">
                    <MdOutlineLocalShipping className="fas fa-shipping-fast feature-icon" />
                    <p>
                        Free<br />Shipping
                    </p>
                </div>
                <div className="feature-item">
                    <RiExchangeLine className="fas fa-sync-alt feature-icon" />
                    <p>
                        Easy Exchange<br />& Returns
                    </p>
                </div>
                <div className="feature-item">
                    <IoIosLock className="fas fa-lock feature-icon" />
                    <p>
                        Safe & Secure<br />Details
                    </p>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
  );
}

export default AboutUs;
