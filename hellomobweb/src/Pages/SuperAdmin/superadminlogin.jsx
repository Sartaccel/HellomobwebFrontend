import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";
import "./superadminlogin.css";
import { FaUser, FaLock } from "react-icons/fa";
import logo from "../../assets/images/logo.png";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SuperAdminLogin() {

  const navigate = useNavigate();

  const [formData,setFormData] = useState({
    username:"",
    password:""
  });

  const [error,setError] = useState("");

  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    });

    setError("");
  };

  const handleLogin = async(e)=>{
    e.preventDefault();

    const loadingToast = toast.loading("Logging in...");

    try{

      const response = await API.post("/api/superadmin/login",formData);

      localStorage.setItem("token",response.data.token);

      toast.update(loadingToast,{
        render:"Login successful",
        type:"success",
        isLoading:false,
        autoClose:2000
      });

      setTimeout(()=>{
        navigate("/dashboard");
      },2000);

    }catch(error){

      toast.update(loadingToast,{
        render:"Invalid username or password",
        type:"error",
        isLoading:false,
        autoClose:3000
      });

      setError("Invalid username or password");

    }
  };

  return (

    <div className="login-wrapper">

      {/* LEFT SIDE */}
      <div className="login-left">

        <div className="content">
          <h1>Hello Mobiles</h1>
          <p>Take full control of your store. Manage products, track orders, and monitor performance all in one powerful dashboard.</p>
        </div>

        <div className="circle c1"></div>
        <div className="circle c2"></div>
        <div className="circle c3"></div>

      </div>

      {/* RIGHT SIDE LOGIN */}

      <div className="login-right">

        <div className="login-card">

          <img src={logo} alt="logo" className="logo"/>

          <form onSubmit={handleLogin}>

            <div className="input-box">
              <FaUser className="icon"/>
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>

            <div className="input-box">
              <FaLock className="icon"/>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
                className="superinput-field"
              />
            </div>

            {error && <p className="error-msg">{error}</p>}

            <button className="login-btn">
              LOGIN
            </button>

          </form>

        </div>

      </div>

      {/* TOAST CONTAINER */}
      <ToastContainer position="top-right"/>

    </div>
  );
}

export default SuperAdminLogin;