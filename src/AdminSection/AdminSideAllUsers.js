import "../AdminSectionCSS/AdminSideAllUsersCSS.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminSideAllUsers() {

  // Set All users data in this useState
  const [users, setUserDetails] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/getAllusersData/allUserDetails`, {
          withCredentials: true, 
        });
        console.log(response.data);
        setUserDetails(response.data.data);  // ✅ Correct way
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers(); 
  }, []);

  return (
      <div>
        <h2 className="AllUserstext">All User's</h2>
        <div className="admin-main">
            <div className="admin-user-list">
                {users.map((user, index) => (
                <div className="user-card" key={index}>
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
      </div>
  );
}

export default AdminSideAllUsers;
