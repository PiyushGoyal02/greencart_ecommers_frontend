import { useLocation } from "react-router-dom"
import "../Css-Code/SingleProductUICSS.css"
import HomePageNavbar from "../Navbar-Sections/HomePageNavbar"
import Footer from "./Footer"
import toast from "react-hot-toast";

function SingleProductUI () {

    const location = useLocation() 
    const product = location.state
    const productData = product.product   // we get the product data from the location state
    console.log(productData)

    // Products Add to Cart Function
    const addToCartItem = (product) => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];  // First We get the cart from localStorage
        const isExist = cart.find(item => item._id === product._id);  // Check if the product already exists in the cart

        if (isExist) {      // If any that product is available in the cart and we want to increase the quantity
            isExist.quantity = +1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(cart));   // Update the cart in localStorage
        toast.success(`${product.productName} added to cart!`);  // Show success message
    }

    return (
        <div>

            {/* It's a Navbar Code */}
            <HomePageNavbar/>

            {/* It's for only Website UI */}
            <div className="SingleProductUiForWebsite">
                <div className="ProductContentDiv">
                    <h1 className="productNameHeading">{productData.productName}</h1>
                
                    <div className="productContentSectionDiv">
                        {/* Images Section */}
                        <div className="ProductImagesSmallandBig">
                            <div className="SmallImageDiv">
                                <img
                                    src={productData.productImages}
                                    className="productImageSmall"
                                    alt={productData.productName}
                                />
                            </div>

                            <div>
                                <img
                                    src={productData.productImages}
                                    className="productImageBig"
                                    alt={productData.productName}
                                />
                            </div>
                        </div>

                        <div className="productTextDetails">
                            <p className="ProductDescription">{productData.descriptionText}</p>
                            <div className="stars productStars">
                                {"★".repeat(4)}
                                {"☆".repeat(1)}
                                <span className="count">(4)</span>
                            </div>
                            <p className="oldAmount">MRP:₹{parseInt(productData.productprice) + 20}</p>
                            <p className="LatestPrice">MRP: ₹{productData.productprice}</p>
                            <p className="InclusiveOfAllTaxes">(inclusive of all taxes)</p>

                            <p className="Abouttext">About Product</p>
                            <div className="BulletPointSection">
                                <p className="BulletPoint">• Fresh and quality-tested to ensure the best for you</p>
                                <p className="BulletPoint">• Neatly packed to maintain hygiene and taste</p>
                                <p className="BulletPoint">• Great for everyday cooking, snacking, or recipes</p>
                            </div>

                            <div className="TwoButtonsDiv">
                                <button onClick={() => addToCartItem(productData)} className="ButtonAddtoCart">Add to cart</button>
                                <button className="ButNowButton">Buy now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* It's for only MobilePhone UI */}
            <div className="SingleProductUiForMobilePhone">
                <div className="ProductContentDiv">
                    <h1 className="productNameHeading">{productData.productName}</h1>
                
                    <div className="productContentSectionDiv">
                        {/* Images Section */}
                        <div className="ProductImagesSmallandBig">
                            <div className="SmallImageDiv">
                                <img
                                    src={productData.productImages}
                                    className="productImageSmall"
                                    alt={productData.productName}
                                />
                            </div>

                            <div className="BigImageDiv">
                                <img
                                    src={productData.productImages}
                                    className="productImageBig"
                                    alt={productData.productName}
                                />
                            </div>
                        </div>

                        <div className="productTextDetails">
                            <p className="ProductDescription">{productData.descriptionText}</p>
                            <div className="stars productStars">
                                {"★".repeat(4)}
                                {"☆".repeat(1)}
                                <span className="count">(4)</span>
                            </div>
                            <p className="oldAmount">MRP:₹{parseInt(productData.productprice) + 20}</p>
                            <p className="LatestPrice">MRP: ₹{productData.productprice}</p>
                            <p className="InclusiveOfAllTaxes">(inclusive of all taxes)</p>

                            <p className="Abouttext">About Product</p>
                            <div className="BulletPointSection">
                                <p className="BulletPoint">• Fresh and quality-tested to ensure the best for you</p>
                                <p className="BulletPoint">• Neatly packed to maintain hygiene and taste</p>
                                <p className="BulletPoint">• Great for everyday cooking, snacking, or recipes</p>
                            </div>

                            <div className="TwoButtonsDiv">
                                <button onClick={() => addToCartItem(productData)} className="ButtonAddtoCart">Add to cart</button>
                                <button className="ButNowButton">Buy now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* It's a Footer Code */}
            <Footer/>
        </div>
    )
}

export default SingleProductUI