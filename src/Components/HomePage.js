import "../Css-Code/HomePageCSS.css";
import Milk from "../Assets/MilkAndDairy.jpg";
import Vegetables from "../Assets/vegetables.jpg";
import Fruits from "../Assets/MixFruits.jpg";
import Bread from "../Assets/bakery.jpg";
import Colddrink from "../Assets/JuiceBottels.jpeg";
import Maggie from "../Assets/Maggie.webp";
import Pluces from "../Assets/PlucesAndGrain.webp";
import HomePageNavbar from "../Navbar-Sections/HomePageNavbar";
import HomepageSlideImages from "./HomepageSlideImages";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import HappyFamilyImage from "../Assets/HappyFresh_ecommerce_TEM1332_theedgemarkets.webp";
import toast from "react-hot-toast";

function HomePage() {

  // This Images for Categories UI
  const Images = [Vegetables, Fruits, Colddrink, Maggie, Bread, Milk, Pluces];

  const [products, setProducts] = useState([]);  // Save products data from API

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/getAllProductsDetails/getAllProducts`,
          { withCredentials: true }
        );
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Function to add product to cart
  const addToCartItem = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];  // Get cart from localStorage
    const isExist = cart.find(item => item._id === product._id);  // Check if product already exists in cart

    if (isExist) {       // If product exists, increase its quantity
      isExist.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));    // Update cart in localStorage
    toast.success(`${product.productName} added to cart!`);  // Show success message
  }

  return (
    <div className="HomePageMainDiv">
      <HomePageNavbar />
      <div>
        <HomepageSlideImages />

        <div className="Categories-text-wrapper">
          <h1 className="Categories-text">CATEGORIES</h1>
        </div>

        <div className="Images-SectionDiv">
          {Images.map((image, index) => (
            <img className="Images" key={index} src={image} alt="ImagesForCategouries"/>
          ))}
        </div>

        <div className="productsForWebsite">
          <div className="veggie-section">
              <h2 className="OrganicVeggies">ORGANIC VEGGIES</h2>
              <div className="veggie-grid">
                {products.slice(0, 5).map((veg) => (
                  <div className="veggie-card" key={veg.id}>
                    <img src={veg.productImages} alt={veg.productName} />
                    <p className="category">{veg.category}</p>
                    <h3>{veg.productName}</h3>
                    <div className="stars">
                      {"★".repeat(4)}
                      {"☆".repeat(1)}
                      <span className="count">(4)</span>
                    </div>
                    <div className="price">
                      <span className="new">${veg.productprice}</span>
                      <span className="old">${parseInt(veg.productprice) + 20}</span>
                    </div>
                    <button onClick={() => addToCartItem(veg)} className="add-btn">🛒 Add</button>
                  </div>
                ))}
              </div>
            </div>
          </div>


          {/* Only for Mobile Phone UI  */}
          <div className="productsForMobilePhone">
            <div className="veggie-section">
              <h2 className="OrganicVeggies">ORGANIC VEGGIES</h2>
              <div className="veggie-grid">
                {products.slice(0, 4).map((veg) => (
                  <div className="veggie-card" key={veg.id}>
                    <img src={veg.productImages} alt={veg.productName} />
                    <p className="category">{veg.category}</p>
                    <h3>{veg.productName}</h3>
                    <div className="stars">
                      {"★".repeat(4)}
                      {"☆".repeat(1)}
                      <span className="count">(4)</span>
                    </div>
                    <div className="price">
                      <span className="new">${veg.productprice}</span>
                      <span className="old">${parseInt(veg.productprice) + 20}</span>
                    </div>
                    <button onClick={() => addToCartItem(veg)} className="add-btn">🛒 Add</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      <div className="happyFamilyImageDiv">
        <img src={HappyFamilyImage} className="HappyFamilyImage" alt="HappyFamily"/>
      </div>

      <div className="newsletter-container">
        <h2 className="newsletter-title">Never Miss a Deal!</h2>
        <p className="newsletter-subtitle">
          Subscribe to get the latest offers, new arrivals, and exclusive
          discounts
        </p>
        <div className="newsletter-input-group">
          <input
            type="email"
            placeholder="Enter your email id"
            className="newsletter-input"
          />
          <button className="newsletter-button">Subscribe</button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default HomePage;
