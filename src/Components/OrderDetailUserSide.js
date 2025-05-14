import axios from "axios";
import "../Css-Code/OrderDetailsUserSideCSS.css";
import toast from "react-hot-toast";
import HomePageNavbar from "../Navbar-Sections/HomePageNavbar";
import { useEffect, useState } from "react";

function OrderDetailsUserSide() {
  const [orderDetails, setOrderDetails] = useState([]);   // Save Order Details
  const LoginUserId = localStorage.getItem("userLoginUserId");   // Get userId After User Login
  const SignupUserId = localStorage.getItem("userSignupUserid");   // Get userId After User Signup
  const OrderDetailsUserId = LoginUserId || SignupUserId;  // Get One UserId After Login or Signup

  const getAllOrderDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/getAllorderData/getAllorderData`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const orderData = response.data.data;
      const userOrders = orderData.filter(
        (item) => item.userId === OrderDetailsUserId
      );
      setOrderDetails(userOrders);
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to fetch order details");
    }
  };

  useEffect(() => {
    getAllOrderDetails();
  }, []);

  return (
    <div>
      <HomePageNavbar />
      <div className="order-summary-container">
        <h2 className="YourOrder">Your Orders</h2>
        {orderDetails.length === 0 ? (
          <p className="NoOrderFound">No orders found.</p>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="table-container desktop-only">
              <table className="order-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Address</th>
                    <th>Items</th>
                    <th>Payment</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails.map((order, index) => (
                    <tr key={index}>
                      <td>{order._id}</td>
                      <td>{new Date(order.orderAt).toLocaleDateString()}</td>
                      <td>
                        <span className={`status-badge ${order.status.toLowerCase()}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>{order.address}</td>
                      <td>
                        <ul className="items-list">
                          {order.cartItems.map((item, idx) => (
                            <li key={idx}>
                              {item.productName} (x{item.quantity}) – ₹{item.productPrice}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td>{order.payment.method}</td>
                      <td><strong>₹{order.totalAmount}</strong></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="mobile-order-cards">
              {orderDetails.map((order, index) => (
                <div className="order-card" key={index}>
                  <p><strong>Order ID:</strong> {order._id}</p>
                  <p><strong>Date:</strong> {new Date(order.orderAt).toLocaleDateString()}</p>
                  <p><strong>Status:</strong>{" "}
                    <span className={`status-badge ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </p>
                  <p><strong>Address:</strong> {order.address}</p>
                  <p><strong>Items:</strong></p>
                  <ul className="items-list">
                    {order.cartItems.map((item, idx) => (
                      <li key={idx}>
                        {item.productName} (x{item.quantity}) – ₹{item.productPrice}
                      </li>
                    ))}
                  </ul>
                  <p><strong>Payment:</strong> {order.payment.method}</p>
                  <p><strong>Total:</strong> ₹{order.totalAmount}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default OrderDetailsUserSide;
