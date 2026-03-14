import { FaBell } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import "./Topbar.css";

const Topbar = () => {
  const location = useLocation();

  // get page name from url
  const pageName = location.pathname.split("/")[1] || "dashboard";

  // example username (later you can get from login data)
  const userName = "Dharani";

  // first letter for profile
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div className="topbar">

      {/* Left */}
      <div className="topbar-left">
        <h2>{pageName.charAt(0).toUpperCase() + pageName.slice(1)}</h2>
      </div>

      {/* Right */}
      <div className="topbar-right">

        <div className="notification">
          <FaBell />
          <span className="notification-dot"></span>
        </div>

        {/* Profile */}
        <div className="profile-circle">
          {userInitial}
        </div>

      </div>

    </div>
  );
};

export default Topbar;