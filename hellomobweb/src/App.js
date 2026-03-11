import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar/Sidebar";
import Topbar from "./Components/Topbar/Topbar";
import "./App.css";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Products from "./Pages/Products/Products";
import AddProduct from "./Components/Productmanagement/AddProduct/AddProduct";
import Orders from "./Pages/Orders/Orders";
import Category from "./Pages/Category/Category";
import Admin from "./Pages/Admin/Admin";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />

        <div className="main-content">
          <Topbar />

          <div className="page-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/addproduct" element={<AddProduct/>}/>
              <Route path="/orders" element={<Orders />} />
              <Route path="/category" element={<Category />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;