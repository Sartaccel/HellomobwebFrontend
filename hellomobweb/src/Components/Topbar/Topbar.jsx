import { FaSearch, FaBell } from "react-icons/fa";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import "./Topbar.css";

const Topbar = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  // get page name from url
  const pageName = location.pathname.split("/")[1] || "dashboard";

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    console.log("Searching:", value);
  };

  return (
    <div className="topbar">

      {/* Left */}
      <div className="topbar-left">
        <h2>{pageName.charAt(0).toUpperCase() + pageName.slice(1)}</h2>
      </div>

      {/* Right */}
      <div className="topbar-right">

        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search data, users, or reports"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        <div className="notification">
          <FaBell />
          <span className="notification-dot"></span>
        </div>

        

      </div>

    </div>
  );
};

export default Topbar;