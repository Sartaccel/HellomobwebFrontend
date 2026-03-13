import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../../api";
import "./OtpVerification.css";

function OtpVerification() {

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email || "";

  useEffect(() => {
    if (state?.successMessage) {
      toast.success(state.successMessage, { autoClose: 3000 });
    }
  }, []);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newOtp = [...otp];
    pasted.split("").forEach((char, i) => { newOtp[i] = char; });
    setOtp(newOtp);
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleVerify = async () => {
    const otpValue = otp.join("");
    if (otpValue.length < 6) {
      toast.error("Please enter the complete 6-digit OTP.");
      return;
    }
    setLoading(true);
    try {
      const { data } = await API.post("/admin/verify-otp", { email, otp: otpValue });
      toast.success("Admin account verified! The admin can now login.", { autoClose: 3000 });
      setTimeout(() => navigate("/"), 3000);
    } catch (err) {
      const message = err.response?.data?.message || "Invalid OTP. Please try again.";
      toast.error(message);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      const { data } = await API.post("/admin/resend-otp", { email });
      toast.success(data?.message || "OTP resent to your email.");
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resend OTP.");
    } finally {
      setResending(false);
    }
  };

  const maskedEmail = email
    ? email.replace(/(.{2})(.*)(@.*)/, (_, a, b, c) => a + "*".repeat(b.length) + c)
    : "";

  return (
    <div className="otp-wrapper">
      <ToastContainer position="top-right" />

      <div className="otp-card">

        <div className="otp-icon">✉</div>

        <h2>OTP Verification</h2>

        <p className="otp-subtext">
          Enter the 6-digit verification code sent to<br />
          <strong>{maskedEmail}</strong>
        </p>

        <div className="otp-inputs" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              autoFocus={index === 0}
              className={digit ? "filled" : ""}
            />
          ))}
        </div>

        <button
          className="verify-btn"
          onClick={handleVerify}
          disabled={loading || otp.join("").length < 6}
        >
          {loading ? "Verifying..." : "Verify"}
        </button>

        <p className="resend-text">
          Didn't receive a code?{" "}
          <span onClick={handleResend} style={{ opacity: resending ? 0.5 : 1, cursor: resending ? "not-allowed" : "pointer" }}>
            {resending ? "Resending..." : "Resend"}
          </span>
        </p>

      </div>
    </div>
  );
}

export default OtpVerification;