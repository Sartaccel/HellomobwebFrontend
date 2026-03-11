import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import "./AdminManagement.css";

function AdminManagement() {
  const [admin, setAdmin] = useState({
    adminId: "",
    role: "",
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    sendSetupLink: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setAdmin({
      ...admin,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleCancel = () => {
    setAdmin({
      adminId: "",
      role: "",
      name: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
      sendSetupLink: false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(admin);
  };

  return (
    <>
      {/* Heading outside container */}
      <div className="admin-header">
        <h2>Create Admin Account</h2>
        <p className="sub-text">
          Fill in the details to create an admin account
        </p>
      </div>

      <div className="admin-container">
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Admin ID</label>
              <input
                type="text"
                name="adminId"
                placeholder="Enter Admin ID"
                value={admin.adminId}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Role</label>
              <input
                type="text"
                name="role"
                placeholder="Enter Admin Role"
                value={admin.role}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter Admin Name"
                value={admin.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Admin Email"
                value={admin.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Mobile Number</label>
              <input
                type="tel"
                name="mobile"
                placeholder="Enter Mobile Number"
                value={admin.mobile}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-group full">
            <label>Password</label>

            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter a secure password"
                value={admin.password}
                onChange={handleChange}
              />

              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
               {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="form-group full">
            <label>Confirm Password</label>

            <div className="password-input">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Re-enter password"
                value={admin.confirmPassword}
                onChange={handleChange}
              />

              <span
                className="eye-icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ?<FaEye /> : <FaEyeSlash /> }
              </span>
            </div>
          </div>

          <div className="checkbox-row">
            <input
              type="checkbox"
              name="sendSetupLink"
              checked={admin.sendSetupLink}
              onChange={handleChange}
            />
            <span>
              Sends a setup link to the admin immediately after the account is
              created
            </span>
          </div>

          <div className="button-row">
            <button type="button" className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>

            <button type="submit" className="create-btn">
              Create Admin
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AdminManagement;
