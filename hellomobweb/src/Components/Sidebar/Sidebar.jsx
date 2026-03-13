import { useState } from "react";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import {
  FaTimes,
  FaHome,
  FaBoxOpen,
  FaTags,
  FaShoppingCart,
  FaUsers,
  FaExternalLinkAlt,
  FaStore,
  FaUserFriends
} from "react-icons/fa";
import logo from "../../assets/images/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // User data
  const userData = {
    name: "Dealport",
    email: "mark@thedesigner.com",
    shopName: "Your Shop",
  };

  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, path: "/dashboard" },
    { name: "Product Management", icon: <FaBoxOpen />, path: "/products" },
    { name: "Categories", icon: <FaTags />, path: "/category" },
    { name: "Order Management", icon: <FaShoppingCart />, path: "/orders" },
    { name: "User Management", icon: <FaUsers />, path: "/users" },
    { name: "Admin Management", icon: <FaUserFriends />, path: "/admin" },

  ];

  return (
    <>
      {/* Mobile Toggle */}
      <div className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <GoSidebarExpand className="close-icon" />
        ) : (
          <GoSidebarCollapse />
        )}
      </div>

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        {/* Logo */}
        <div className="logo-section">
          <img src={logo} alt="Hello Future Store Logo" className="logo-img" />
        </div>
        {/* Menu */}
        <div className="sidebar-content">
          <ul className="menu">
            {menuItems.map((item) => (
              <li
                key={item.name}
                className={
                  location.pathname === item.path ||
                  (item.path !== "/" && location.pathname.startsWith(item.path))
                    ? "active"
                    : ""
                }
                onClick={() => {
                  navigate(item.path);
                  setIsOpen(false);
                }}
              >
                <span className="icon">{item.icon}</span>
                <span>{item.name}</span>
              </li>
            ))}
          </ul>

          {/* Bottom Section */}
          <div className="sidebar-bottom">
            {/* Profile Card */}
            <div className="profile-card">
              <div className="profile-left">
                
                <div className="profile-text">
                  <p className="profile-name">{userData.name}</p>
                  <span className="profile-email">{userData.email}</span>
                </div>
              </div>

              <FaExternalLinkAlt className="profile-link-icon" />
            </div>

            {/* Shop Card */}
            <div className="shop-card">
              <div className="shop-left">
                <FaStore className="shop-icon" />
                <span>{userData.shopName}</span>
              </div>

              <FaExternalLinkAlt className="shop-link-icon" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
