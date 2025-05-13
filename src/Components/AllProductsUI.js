import "../Css-Code/AllProductsUICSS.css";
import HomePageNavbar from "../Navbar-Sections/HomePageNavbar";
import Footer from "./Footer.js";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

function AllProductsUI() {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);   // This useState will hold all products fetched from the API
  const [filteredProducts, setFilteredProducts] = useState([]);  // This useState will hold the products that match the search query

  // location.search → gives the query part of the URL (like ?search=Laptop Bags)
  // URLSearchParams(...) → creates an object that can understand and work with that query
  // .get("search") → extracts the value of "search", which is "Laptop Bags"
  /* ?.toLowerCase() → converts that value to lowercase, making it "laptop bags" */
  const searchQuery = new URLSearchParams(location.search).get("search")?.toLowerCase();

  // 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/getAllProductsDetails/getAllProducts`,
          { withCredentials: true }
        );
        const allProducts = response.data.data;
        setProducts(allProducts);

        if (searchQuery) {
          const filtered = allProducts.filter((product) =>
            product.productName.toLowerCase().includes(searchQuery)
          );
          setFilteredProducts(filtered);
        } else {
          setFilteredProducts(allProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [searchQuery]);

  useEffect(() => {
    if (filteredProducts.length > 0) {
      const element = document.getElementById(`product-${filteredProducts[0]._id}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [filteredProducts]);

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item._id === product._id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success(`${product.productName} added to cart!`);
  };

  return (
    <div>
      <HomePageNavbar />
      <div className="veggie-section">
        <h2>ALL PRODUCTS</h2>
        <div className="veggie-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                id={`product-${product._id}`}
                onClick={() => navigate("/singleproductsui", { state: { product } })}
                className="veggie-card"
                key={product._id}
              >
                <img src={product.productImages} alt={product.productName} />
                <p className="category">{product.category}</p>
                <h3>{product.productName}</h3>
                <div className="stars">
                  {"★".repeat(4)}
                  {"☆".repeat(1)}
                  <span className="count">(4)</span>
                </div>
                <div className="price">
                  <span className="new">₹{product.productprice}</span>
                  <span className="old">₹{parseInt(product.productprice) + 10}</span>
                </div>
                <button
                  className="add-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                >
                  🛒 Add
                </button>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", marginTop: "20px" }}>
              No matching products found.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AllProductsUI;
