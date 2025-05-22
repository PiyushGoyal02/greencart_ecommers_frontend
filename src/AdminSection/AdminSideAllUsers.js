import "../AdminSectionCSS/AdminSideAllUsersCSS.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminSideAllUsers() {
  const [users, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(true);       // Loading state
  const [error, setError] = useState(null);           // Error state

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/getAllusersData/allUserDetails`,
          {
            withCredentials: true,
          }
        );
        setUserDetails(response.data.data);  // Setting users array
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="admin-main">
      <h2 className="AllUserstext">All Users</h2>

      {loading && <p className="info-text">Loading users...</p>}
      {error && <p className="error-text">{error}</p>}

      <div className="admin-user-list">
        {users.map((user) => (
          <div className="user-card" key={user._id || user.email}>
            <div className="user-icon">👤</div>
            <div className="user-details">
              <h3>{user.name} {user.surname}</h3>
              <p>{user.address}, {user.state}, {user.pincode}</p>
              <p>{user.country}</p>
              <p>📞 {user.number}</p>
              <p>✉️ {user.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminSideAllUsers;
