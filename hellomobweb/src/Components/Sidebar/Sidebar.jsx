import { useState } from "react";
import {
  FaBars,
  FaBoxOpen,
  FaChartBar,
  FaCog,
  FaHome,
  FaSignOutAlt,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, path: "/" },
    { name: "Products", icon: <FaBoxOpen />, path: "/products" },
    { name: "Customer", icon: <FaUser /> },
    { name: "Analytics & Reports", icon: <FaChartBar /> },
    { name: "Settings", icon: <FaCog /> },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        {/* Logo */}
        <div className="logo-section">
          <img src={logo} alt="Logo" />
        </div>

        {/* Menu */}
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
              onClick={() => {navigate(item.path);setIsOpen(false);}}  // close sidebar after click
            >
              <span className="icon">{item.icon}</span>
              <span>{item.name}</span>
            </li>
          ))}

          <li className="logout">
            <span className="icon">
              <FaSignOutAlt />
            </span>
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
