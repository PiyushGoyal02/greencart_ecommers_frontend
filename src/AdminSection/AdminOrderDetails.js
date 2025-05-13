import "../AdminSectionCSS/AdminOrderDetailsCSS.css";
import vegetableImage from "../Assets/vegetable.png";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function AdminOrderDetails() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/getAllorderData/getAllorderData`);

        const OrderData = response.data.data;
        const formattedOrders = OrderData.map(order => ({
          id: order._id,
          items: order.cartItems.map(
            item => `${item.productName} ${item.productPrice} x ${item.quantity}`
          ),
          customer: order.userId || "Guest",
          address: order.address,
          phone: "N/A",
          price: `$${order.totalAmount}`,
          method: order.payment?.method || "COD",
          date: new Date(order.orderAt).toLocaleDateString(),
          payment: order.status
        }));

        setOrders(formattedOrders);
      } catch (error) {
        console.error(error.message);
        toast.error("All Order Details Not Get");
      }
    };

    fetchOrders();
  }, []);

  const handleDropdownChange = async (orderId, value) => {
    // console.log(`Order ID: ${orderId}, Selected Value: ${value}`);
    try{

      const orderTrackingResponse = await axios.post(`http://localhost:4000/api/v1/updateTracking/updateTracking`, {
        orderId: orderId,
        status: value,
      })

      console.log(orderTrackingResponse.data);

    }catch(error){
      console.log(error.message)
      toast.error("Status Not Updated");
    }

  };

  return (
    <div className="OrdersDetailsMainDiv">
      <div className="orders-container">
        <h2>Orders List</h2>
        {orders.map((order) => (
          <div className="order-card" key={order.id}>
            <div className="order-left">
              <img src={vegetableImage} alt="icon" className="order-icon" />
              <div className="order-items">
                {order.items.map((item, idx) => (
                  <p key={idx}>{item}</p>
                ))}
              </div>
            </div>
            <div className="order-center">
              <p><strong>{order.customer}</strong></p>
              <p>{order.address}</p>
              <p>{order.phone}</p>
              
              {/* Dropdown */}
              <select
                onChange={(e) => handleDropdownChange(order.id, e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>Select Status</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div className="order-right">
              <p><strong>{order.price}</strong></p>
              <p>Method: {order.method}</p>
              <p>Date: {order.date}</p>
              <p>Payment:</p>   /* {order.payment} */
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminOrderDetails;
