import { FaSearch, FaBell } from "react-icons/fa";
import { useState } from "react";

import "./Topbar.css";

const Topbar = () => {

   const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    // temporary console log (later connect to backend)
    console.log("Searching:", value);
  };

  return (
    <div className="topbar">

      {/* Left */}
      <div className="topbar-left">
        <h2>Dashboard</h2>
      </div>

      {/* Right */}
      <div className="topbar-right">

        {/* Search */}
        <div className="search-box">
          <FaSearch className="search-icon" />
         <input
            type="text"
            placeholder="Search data, users, or reports"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        {/* Notification */}
        <div className="notification">
          <FaBell />
          <span className="notification-dot"></span>
        </div>

        {/* Profile */}
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="profile-pic"
        />

      </div>

    </div>
  );
};

export default Topbar;