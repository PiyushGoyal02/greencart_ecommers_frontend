import { useState } from "react";
import "../AdminSectionCSS/AdminSidebarCSS.css";
import { PiListHeartBold } from "react-icons/pi";
import "../AdminSectionCSS/AdminHomePageCSS.css";
import AdminOrderDetails from "./AdminOrderDetails";
import AdminProductsList from "./AdminProductsList";
import AdminSideAllUsers from "./AdminSideAllUsers";
import AdminNavbar from "../Navbar-Sections/AdminNavbar";
import { MdOutlineLibraryAddCheck } from "react-icons/md";
import { TbCheckbox, TbUsersGroup } from "react-icons/tb";
import AdminSideAddproducts from "./AdminSideAddproducts";

function AdminHomePage() {

    // It's Sidebar Action, which Page is Active
    const [active, setActive] = useState("add");

    return (
        <div>
            <AdminNavbar />
            <div className="Sidebar-DifferentSections">

                {/* Only for Website */}
                <div className="AdminNavbarForWebsite">
                    <div className="AdminSidebardiv">
                        <div
                            className={`DivSection ${active === "add" ? "active" : ""}`}
                            onClick={() => setActive("add")}
                        >
                            <MdOutlineLibraryAddCheck className="Icons" />
                            <p className="Ptag-text">Add Products</p>
                        </div>

                        <div
                            className={`DivSection ${active === "list" ? "active" : ""}`}
                            onClick={() => setActive("list")}
                        >
                            <PiListHeartBold className="Icons" />
                            <p className="Ptag-text">Product List</p>
                        </div>

                        <div
                            className={`DivSection ${active === "order" ? "active" : ""}`}
                            onClick={() => setActive("order")}
                        >
                            <TbCheckbox className="Icons" />
                            <p className="Ptag-text">Orders</p>
                        </div>

                        <div
                            className={`DivSection ${active === "users" ? "active" : ""}`}
                            onClick={() => setActive("users")}
                        >
                            <TbUsersGroup className="Icons" />
                            <p className="Ptag-text">All Users</p>
                        </div>
                    </div>
                </div>

                {/* Only for Modile Phone */}
                <div className="AdminNavbarForMobilePhone">
                    <div className="AdminSidebardiv">
                        <div
                            className={`DivSection ${active === "add" ? "active" : ""}`}
                            onClick={() => setActive("add")}
                        >
                            <MdOutlineLibraryAddCheck className="Icons" />
                        </div>

                        <div
                            className={`DivSection ${active === "list" ? "active" : ""}`}
                            onClick={() => setActive("list")}
                        >
                            <PiListHeartBold className="Icons" />
                        </div>

                        <div
                            className={`DivSection ${active === "order" ? "active" : ""}`}
                            onClick={() => setActive("order")}
                        >
                            <TbCheckbox className="Icons" />
                        </div>

                        <div
                            className={`DivSection ${active === "users" ? "active" : ""}`}
                            onClick={() => setActive("users")}
                        >
                            <TbUsersGroup className="Icons" />
                        </div>
                    </div>
                </div>

                {/* It's Condistion for left side and right side */}
                <div className="AdminMainContent">
                    {active === "add" && <AdminSideAddproducts/>}
                    {active === "users" && <AdminSideAllUsers />}
                    {active === "order" && <AdminOrderDetails />}
                    {active === "list" && <AdminProductsList />}
                </div>
            </div>
        </div>
    );
}

export default AdminHomePage;
