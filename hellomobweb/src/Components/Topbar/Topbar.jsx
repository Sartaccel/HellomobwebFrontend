import "./Topbar.css";

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <h2>Dashboard</h2>
      </div>

      <div className="topbar-right">
        <span className="admin-name">Admin Name</span>
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