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
                <Dashboard />
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
                <Products />
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
                <AddProduct />
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
                <Orders />
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
                <Category />
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
                <Admin />
              </div>
            </div>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;