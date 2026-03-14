import { useLocation } from "react-router-dom";
import "./ViewUser.css";

function ViewUser() {

  const location = useLocation();
  const user = location.state;

  return (
    <div className="view-user-page">

      <div className="view-user-header">
        <h2>User Details</h2>
        <p>Complete information about the selected user</p>
      </div>

      <div className="view-user-card">

        <div className="user-avatar">
          {user.name.charAt(0)}
        </div>

        <div className="user-info-grid">

          <div className="info-box">
            <span>User ID</span>
            <p>{user.id}</p>
          </div>

          <div className="info-box">
            <span>Name</span>
            <p>{user.name}</p>
          </div>

          <div className="info-box">
            <span>Email</span>
            <p>{user.email}</p>
          </div>

          <div className="info-box">
            <span>Phone</span>
            <p>{user.phone}</p>
          </div>

          <div className="info-box">
            <span>Registered</span>
            <p>{user.registered}</p>
          </div>

          <div className="info-box">
            <span>Last Login</span>
            <p>{user.lastLogin}</p>
          </div>

          <div className="info-box">
            <span>Total Orders</span>
            <p>{user.orders}</p>
          </div>

          <div className="info-box full">
            <span>Address</span>
            <p>{user.address}</p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default ViewUser;