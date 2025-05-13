import "../Css-Code/CartSectionCSS.css";
import HomePageNavbar from "../Navbar-Sections/HomePageNavbar";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

function CartSection() {
  const Navigator = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState({ paymentValue: "" });
  
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    toast.success("Removed from cart");
  };

  const price = cartItems.reduce((acc, item) => acc + item.productprice * item.quantity, 0);
  const tax = (price * 0.02).toFixed(2);
  const total = (price + parseFloat(tax)).toFixed(2);

  const AfterLoginUserAddress = localStorage.getItem("AfterLoginUserAddress");
  
  const cartItemsHandler = async () => {
  if (!AfterLoginUserAddress || AfterLoginUserAddress === "No address available") {
    toast.error("Please add your address before placing the order!");
    Navigator("/profiledetails");
    return;
  }

  const userId = localStorage.getItem("userLoginUserId") || localStorage.getItem("userSignupUserid");

  const combinedData = {
    userId,
    products: cartItems.map((item) => ({
      name: item.productName,
      price: item.productprice,
      quantity: item.quantity,
      image: item.productImages,
      productId: item._id,
    })),
    totalAmount: total,
  };

  try {
    const cartResponse = await axios.post("http://localhost:4000/api/v1/cartItemsAdd/cartItemAdd", combinedData, {
      headers: { "Content-Type": "application/json" },
    });
    const CartId = cartResponse.data.data._id;

    const orderPayload = {
      userId,
      cartId: CartId,
      cartItems: cartItems.map(item => ({
        productId: item._id,
        quantity: item.quantity,
        productName: item.productName,
        productPrice: item.productprice
      })),
      totalAmount: total,
      address: AfterLoginUserAddress,
      payment: {
        method: paymentMethod.paymentValue === "Cash On Delivery" ? "COD" : paymentMethod.paymentValue,
      },
    };

    console.log(process.env.REACT_APP_RAZORPAY_KEY_ID, "Rezorpay_ID")

    const orderResponse = await axios.post("http://localhost:4000/api/v1/placeOrder/placeOrder", orderPayload, {
      headers: { "Content-Type": "application/json" },
    });

    const { razorpayOrderId, amount } = orderResponse.data;
    console.log(razorpayOrderId)
    console.log(amount)

    if (paymentMethod.paymentValue === "Cash On Delivery") {
      toast.success("Order placed with COD!");
      localStorage.removeItem("cart");
      setCartItems([]);
    } else {
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,  // Replace with your actual Razorpay Key ID
        amount: amount * 100,  // Amount in paise
        currency: "INR",
        order_id: razorpayOrderId,
        name: "Green Market",
        description: "Order Payment",
        handler: function (response) {
          toast.success("Payment Successful!");
          localStorage.removeItem("cart");
          setCartItems([]);
          // Ideally, call backend to verify payment here
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9896787236"
        },
        theme: {
          color: "#3399cc"
        }
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    }

  } catch (error) {
    console.log(error.message);
    toast.error("An error occurred. Please try again!");
  }
};


  const paymentMethodHandler = (e) => {
    e.preventDefault();
    setPaymentMethod((prev) => ({
      ...prev,
      paymentValue: e.target.value,
    }));
  };

  return (
    <div>
      <HomePageNavbar />
      <div className="shopping-container">
        <div className="cart">
          <h2>
            Shopping Cart <span className="green">{cartItems.length} Items</span>
          </h2>

          <div className="Products-Subtotal-Action-text">
            <h4>Product Details</h4>
            <h4>Subtotal</h4>
            <h4>Action</h4>
          </div>

          {/* Only For Website */}
          <div className="WebsiteUi">
            <div className="cart-items">
              {cartItems.map((item) => (
                <div className="cart-item" key={item._id}>
                  <div className="item-left">
                    <img src={item.productImages} alt={item.productName} />
                    <div className="details">
                      <h5>{item.productName}</h5>
                      <p>Weight: N/A</p>
                      <select
                        className="qtySelect"
                        value={item.quantity}
                        onChange={(e) => {
                          const updatedCart = cartItems.map((prod) =>
                            prod._id === item._id
                              ? { ...prod, quantity: parseInt(e.target.value) }
                              : prod
                          );
                          localStorage.setItem("cart", JSON.stringify(updatedCart));
                          setCartItems(updatedCart);
                        }}
                      >
                        {[...Array(10).keys()].map((num) => (
                          <option key={num} value={num + 1}>
                            {num + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="subtotal">₹{item.productprice * item.quantity}</div>
                  <div onClick={() => removeFromCart(item._id)}>
                    <button className="removeIMG"><MdDeleteForever /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Only For Mobile  Left Side UI Code*/}
          <div className="MobilePhoneUi">
            <div className="cart-items">
              {cartItems.map((item) => (
                <div className="cart-item" key={item._id}>
                  <div className="item-left">
                    <div className="productImageNameDiv">
                      <img className="productImage" src={item.productImages} alt={item.productName} />
                      <h5 className="ProductName">{item.productName}</h5>
                    </div>
                    <select
                      className="qtySelect"
                      value={item.quantity}
                      onChange={(e) => {
                        const updatedCart = cartItems.map((prod) =>
                          prod._id === item._id
                            ? { ...prod, quantity: parseInt(e.target.value) }
                            : prod
                        );
                        localStorage.setItem("cart", JSON.stringify(updatedCart));
                        setCartItems(updatedCart);
                      }}
                    >
                      {[...Array(10).keys()].map((num) => (
                        <option key={num} value={num + 1}>
                          {num + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="subtotal">₹{item.productprice * item.quantity}</div>
                  <div onClick={() => removeFromCart(item._id)}>
                    <button className="removeIMG"><MdDeleteForever /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="ContinuesShoopingDiv">
            <FaLongArrowAltLeft />
            <p onClick={() => Navigator("/allproductsui")} className="continue">
              Continue Shopping
            </p>
          </div>
        </div>

        <div className="summary">
          <h3>Order Summary</h3>

          <div className="row">
            <p>DELIVERY ADDRESS</p>
            <span onClick={() => Navigator("/profiledetails")} className="change">Change</span>
          </div>

          <div className="AddressUI">
            <p>{AfterLoginUserAddress}</p>
          </div>

          <p className="bold">PAYMENT METHOD</p>
          <select
            required
            onChange={paymentMethodHandler}
            value={paymentMethod.paymentValue}
            name="paymentValue"
            className="Cash-UPI-Card-Dropdown"
          >
            <option>Cash On Delivery</option>
            <option>Credit/Debit Card</option>
            <option>UPI ID</option>
          </select>

          <div className="costs">
            <p>Price</p>
            <span>₹{price}</span>
          </div>
          <div className="costs">
            <p>Shipping Fee</p>
            <span className="green">Free</span>
          </div>
          <div className="costs">
            <p>Tax (2%)</p>
            <span>₹{tax}</span>
          </div>

          <div className="total">
            <p>Total Amount:</p>
            <span>₹{total}</span>
          </div>

          <button onClick={cartItemsHandler} className="place-order">Place Order</button>
        </div>
      </div>
    </div>
  );
}

export default CartSection;