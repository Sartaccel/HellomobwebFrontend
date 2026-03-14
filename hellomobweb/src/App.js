import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar/Sidebar";
import Topbar from "./Components/Topbar/Topbar";
import "./App.css";

import Dashboard from "./Pages/Dashboard/Dashboard";
import Products from "./Pages/Products/Products";
import AddProduct from "./Components/Productmanagement/AddProduct/AddProduct";
import Orders from "./Pages/Orders/Orders";
import SuperAdmin from "./Pages/SuperAdmin/superadminlogin";
import Category from "./Pages/Category/Category";
import Admin from "./Pages/Admin/Admin";
import OtpVerification from "./Components/Auth/OtpVerification/OtpVerification";
import User from "./Pages/User/User";
import ViewUser from "./Components/UserManagement/ViewUser/ViewUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login Page */}
        <Route path="/" element={<SuperAdmin />} />
       

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <div className="app-container">
              <Sidebar />
              <div className="main-content">
                <Topbar />
                <div className="page-content">
          <Dashboard />
        </div>
              </div>
            </div>
          }
        />

        {/* Products */}
        <Route
          path="/products"
          element={
            <div className="app-container">
              <Sidebar />
              <div className="main-content">
                <Topbar />
                <div className="page-content">
                  <Products />
                </div>
              </div>
            </div>
          }
        />

        {/* Add Product */}
        <Route
          path="/addproduct"
          element={
            <div className="app-container">
              <Sidebar />
              <div className="main-content">
                <Topbar />
                <div className="page-content">
                  <AddProduct />
                </div>
              </div>
            </div>
          }
        />

        {/* Orders */}
        <Route
          path="/orders"
          element={
            <div className="app-container">
              <Sidebar />
              <div className="main-content">
                <Topbar />
                <div className="page-content">
                  <Orders />
                </div>
              </div>
            </div>
          }
        />

        {/* Category */}
        <Route
          path="/category"
          element={
            <div className="app-container">
              <Sidebar />
              <div className="main-content">
                <Topbar />
                <div className="page-content">
                  <Category />
                </div>
              </div>
            </div>
          }
        />

        {/* User */}
        <Route
          path="/user"
          element={
            <div className="app-container">
              <Sidebar />
              <div className="main-content">
                <Topbar />
                <div className="page-content">
                  <User />
                </div>
              </div>
            </div>
          }
        />
        {/* ViewUser */}
        <Route
          path="/viewuser"
          element={
            <div className="app-container">
              <Sidebar />
              <div className="main-content">
                <Topbar />
                <div className="page-content">
                  <ViewUser />
                </div>
              </div>
            </div>
          }
        />
        {/* Admin */}
        <Route
          path="/admin"
          element={
            <div className="app-container">
              <Sidebar />
              <div className="main-content">
                <Topbar />
                <div className="page-content">
                  <Admin />
                </div>
              </div>
            </div>
          }
        />

        <Route path="/OtpVerification" element={<div className="app-container">
              <Sidebar />
              <div className="main-content">
                <Topbar />
                <div className="page-content">
                  <OtpVerification/>
                </div>
              </div>
            </div>
      }/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;