import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../api";
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
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!admin.adminId.trim()) newErrors.adminId = "Admin ID is required";
    if (!admin.role.trim()) newErrors.role = "Role is required";
    if (!admin.name.trim()) newErrors.name = "Name is required";
    if (!admin.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(admin.email))
      newErrors.email = "Enter a valid email";
    if (!admin.mobile.trim()) newErrors.mobile = "Mobile number is required";
    else if (!/^\d{10}$/.test(admin.mobile))
      newErrors.mobile = "Enter a valid 10-digit mobile number";
    if (!admin.password) newErrors.password = "Password is required";
    else if (admin.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (!admin.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (admin.password !== admin.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
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
    });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload = {
      employeeId: admin.adminId,
      role: admin.role,
      name: admin.name,
      email: admin.email,
      mobileNumber: admin.mobile,
      password: admin.password,
      confirmPassword: admin.confirmPassword,
    };

    setLoading(true);
    try {
      await API.post("/admin/create", payload);
      handleCancel();
      toast.success("Register Successful!", { autoClose: 2500 });
      setTimeout(() => navigate("/OtpVerification", { state: { email: admin.email } }), 2500);
    } catch (err) {
      const message = err.response?.data?.message || "Failed to create admin. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" />

      <div className="admin-header">
        <h2>Create Admin Account</h2>
        <p className="sub-text">Fill in the details to create an admin account</p>
      </div>

      <div className="admin-container">
        <form className="admin-form" onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            <div className={`form-group ${errors.adminId ? "has-error" : ""}`}>
              <label>Admin ID</label>
              <input type="text" name="adminId" placeholder="Enter Admin ID" value={admin.adminId} onChange={handleChange} />
              {errors.adminId && <span className="error-msg">{errors.adminId}</span>}
            </div>

            <div className={`form-group ${errors.role ? "has-error" : ""}`}>
              <label>Role</label>
              <input type="text" name="role" placeholder="Enter Admin Role" value={admin.role} onChange={handleChange} />
              {errors.role && <span className="error-msg">{errors.role}</span>}
            </div>

            <div className={`form-group ${errors.name ? "has-error" : ""}`}>
              <label>Name</label>
              <input type="text" name="name" placeholder="Enter Admin Name" value={admin.name} onChange={handleChange} />
              {errors.name && <span className="error-msg">{errors.name}</span>}
            </div>

            <div className={`form-group ${errors.email ? "has-error" : ""}`}>
              <label>Email</label>
              <input type="email" name="email" placeholder="Enter Admin Email" value={admin.email} onChange={handleChange} />
              {errors.email && <span className="error-msg">{errors.email}</span>}
            </div>

            <div className={`form-group ${errors.mobile ? "has-error" : ""}`}>
              <label>Mobile Number</label>
              <input type="tel" name="mobile" placeholder="Enter 10-digit Mobile Number" value={admin.mobile} onChange={handleChange} maxLength={10} />
              {errors.mobile && <span className="error-msg">{errors.mobile}</span>}
            </div>
          </div>

          <div className={`form-group full ${errors.password ? "has-error" : ""}`}>
            <label>Password</label>
            <div className="password-input">
              <input type={showPassword ? "text" : "password"} name="password" placeholder="Enter a secure password (min. 8 characters)" value={admin.password} onChange={handleChange} />
              <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            {errors.password && <span className="error-msg">{errors.password}</span>}
          </div>

          <div className={`form-group full ${errors.confirmPassword ? "has-error" : ""}`}>
            <label>Confirm Password</label>
            <div className="password-input">
              <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Re-enter password" value={admin.confirmPassword} onChange={handleChange} />
              <span className="eye-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            {errors.confirmPassword && <span className="error-msg">{errors.confirmPassword}</span>}
          </div>

          <div className="button-row">
            <button type="button" className="Admin-cancel-btn" onClick={handleCancel} disabled={loading}>Cancel</button>
            <button type="submit" className="Admin-create-btn" disabled={loading}>
              {loading ? <span className="spinner" /> : null}
              {loading ? "Creating..." : "Create Admin"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AdminManagement;