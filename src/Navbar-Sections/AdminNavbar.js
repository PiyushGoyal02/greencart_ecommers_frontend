import { useNavigate } from "react-router-dom";
import "../AdminSectionCSS/AdminNavbarCSS.css";
import ECommersImage from "../Assets/E-CommersShooping.png";

function AdminNavbar() {
    const Navigator = useNavigate();
    return (
        <div className="AdminNavbar-Section">
            {/* Logo */}
            <div>
                <img onClick={() => Navigator("/adminhomepage")} src={ECommersImage} className="AdminNavbar-logo" alt="GreenCart Logo" />
            </div>

            <div className="HeyAdmintext-Logoutbutton">
                <p>Hi! Admin</p>
                <button className="LogoutButton">Logout</button>
            </div>
        </div>
    );
}

export default AdminNavbar;
