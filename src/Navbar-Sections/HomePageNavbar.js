import "../Css-Code/HomePageNavbarCSS.css";
import ECommersImage from "../Assets/E-CommersShooping.png";
import { FaSearch } from 'react-icons/fa';
import { AiOutlineShoppingCart } from "react-icons/ai";
import PersonImage from "../Assets/1724930.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { CgMenuRightAlt } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";

function HomePageNavbar() {

    const Navigator = useNavigate();

    const [open, setOpen] = useState(false);  // When we click on profile icon, then open the dropdown
    const dropdownRef = useRef(null);  // Connect with HTML elememt
    const [menuOpen, setMenuOpen] = useState(false);  // State to manage the side menu open/close
    const [searchTerm, setSearchTerm] = useState("");  // State to manage the search term

    const cartData = JSON.parse(localStorage.getItem("cart")) || [];  // Get cart data from local storage
    const cartCount = cartData.length;   // Count the number of items in the cart

    const handleSearch = () => {
        if (searchTerm.trim()) {    //  .trim It meanes remove extra spaces (start to end)
        Navigator(`/allproductsui?search=${encodeURIComponent(searchTerm.trim())}`);
        }                               // encodeURIComponent() is used to convert safely URl like ( @, $, #)
    };

    // Toggle menu open/close
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div>

            <div className="homeNavbarForWebsite">
                <div className="Navbar-Section">
                    {/* Logo */}
                    <div onClick={() => Navigator('/homepage')}>
                        <img src={ECommersImage} className="navbar-logo" alt="GreenCart Logo" />
                    </div>

                    <div className="OptionBar-SearchBar-Icons">
                        {/* Center Navigation + Search */}
                        <div className="Options-SearchBar">
                            <div className="options-bar">
                                <button onClick={() => Navigator('/adminloginsignup')} className="SellerButton">Seller Side</button>
                                <p onClick={() => Navigator('/homepage')}>Home</p>
                                <p onClick={() => Navigator('/allproductsui')}>All Product</p>
                                <p onClick={() => Navigator('/aboutUs')}>About Us</p>
                            </div>

                            <div className="search-bar">
                                <input
                                    type="text"
                                    placeholder="Search products"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSearch();
                                    }
                                    }}
                                />
                                <button type="button" onClick={handleSearch}>
                                    <FaSearch />
                                </button>
                            </div>
                        </div>

                        {/* Cart and Profile */}
                        <div className="icons-section">
                            <div className="cart-icon">
                                <AiOutlineShoppingCart onClick={() => Navigator("/cartsection")}/>
                                <span className="cart-count">{cartCount}</span>
                            </div>
                            <div>
                                <img onClick={() => setOpen(!open)} src={PersonImage} className="PersonImage" alt="User" />
                            </div>
                        </div>
                    </div>

                    {open && (
                        <div className="dropdown-menu">
                            <button onClick={() => Navigator('/profiledetails')}>Profile</button>
                            <button onClick={() => Navigator('/orderdetailsuserside')}>Order History</button>
                            <button onClick={() => Navigator('/')}>Logout</button>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Phone */}
            <div className="HomeNavbarForMobilephone">
                <div className="Navbar-Section">
                    {/* Logo */}
                    <div className="BrandLogoAndMenuIcon">
                        <div onClick={() => Navigator('/homepage')}>
                            <img src={ECommersImage} className="navbar-logo" alt="GreenCart Logo" />
                        </div>

                        <div className="menu-button" onClick={toggleMenu}>
                            <CgMenuRightAlt />
                        </div>
                    </div>

                    <div className={`side-menu ${menuOpen ? 'open' : ''}`}>
                        <button className="close-button" onClick={toggleMenu}>
                            <RxCross2 />
                        </button>

                        <div className="textNavigatorDiv">
                            <p className="textNavigator" onClick={() => Navigator('/homepage')}>Home</p>
                            <p className="textNavigator" onClick={() => Navigator('/profiledetails')}>Profile</p>
                            <p className="textNavigator" onClick={() => Navigator('/cartsection')}>Cart Section</p>
                            <p className="textNavigator" onClick={() => Navigator('/orderdetailsuserside')}>Order History</p>
                            <p className="textNavigator" onClick={() => Navigator('/allproductsui')}>All Product</p>
                            <p className="textNavigator" onClick={() => Navigator('/aboutUs')}>About Us</p>
                            <p className="textNavigator" onClick={() => Navigator('/')}>Logout</p>
                            <p className="textNavigator" onClick={() => Navigator('/adminloginsignup')}>Seller Side</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default HomePageNavbar;
