import { useEffect, useState } from "react"; // React hooks
import "./Products.css";
import clock from "../../assets/images/clock.png";

import { useNavigate } from "react-router-dom"; // for page navigation

import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"; // chart library

import {
  FaEdit,
  FaEllipsisV,
  FaPlus,
  FaTrash,
  FaClock,
  FaBox,
  FaPalette,
  FaCalendarAlt,
  FaDollarSign,
} from "react-icons/fa"; // icons

// chart data (for small chart in dashboard)
const data = [
  { value: 10 },
  { value: 30 },
  { value: 20 },
  { value: 35 },
  { value: 28 },
];
const Revdata = [
  { day: "16", value: 1300 },
  { day: "18", value: 1100 },
  { day: "20", value: 1000 },
  { day: "22", value: 2000 },
  { day: "24", value: 1500 },
  { day: "26", value: 1700 },
  { day: "28", value: 1400 },
  { day: "30", value: 1500 },
  { day: "02", value: 2000 },
];
function Products() {
  // used to navigate to another page
  const navigate = useNavigate();

  // state to store all products
  const [products, setProducts] = useState([]);

  // LOAD PRODUCTS FROM LOCAL STORAGE
  // runs when page loads
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];

    setProducts(storedProducts);
  }, []);

  // EDIT PRODUCT
  // when user clicks edit icon
  const handleEdit = (index) => {
    // get products from localStorage
    const products = JSON.parse(localStorage.getItem("products")) || [];

    // select the product user clicked
    const product = products[index];

    // store selected product for editing
    localStorage.setItem("editProduct", JSON.stringify(product));

    // redirect to AddProduct page
    navigate("/addproduct");
  };

  // DELETE PRODUCT
  const handleDelete = (index) => {
    // get products from localStorage
    const products = JSON.parse(localStorage.getItem("products")) || [];

    // remove the selected product
    const updatedProducts = products.filter((_, i) => i !== index);

    // update localStorage
    localStorage.setItem("products", JSON.stringify(updatedProducts));

    // update state so table refreshes immediately
    setProducts(updatedProducts);
  };

  return (
    <>
      <section className="stats-section container-fluid">
        <div className="d-flex flex-wrap gap-4">
          {/* Revenue */}
          <div className="stat-wrapper">
            <div className="stat-card">
              <div className="stat-top d-flex justify-content-between">
                <span className="title">Revenue</span>
                <span className="growth positive">+22%</span>
              </div>

              <div className="stat-bottom">
                <h3 className="value">₹875,620</h3>

                <ResponsiveContainer width={100} height={40}>
                  <LineChart data={data}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#ff8c00"
                      strokeWidth={3}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Orders */}
          <div className="stat-wrapper">
            <div className="stat-card">
              <div className="stat-top d-flex justify-content-between">
                <span className="title">Orders Paid</span>
                <span className="growth positive">+5.7%</span>
              </div>

              <div className="stat-bottom">
                <h3 className="value">520</h3>

                <ResponsiveContainer width={100} height={40}>
                  <LineChart data={data}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#28a745"
                      strokeWidth={3}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Refunds */}
          <div className="stat-wrapper">
            <div className="stat-card">
              <div className="stat-top d-flex justify-content-between">
                <span className="title">Refunds</span>
                <span className="growth negative">18%</span>
              </div>

              <div className="stat-bottom">
                <h3 className="value">7,283</h3>

                <ResponsiveContainer width={100} height={40}>
                  <LineChart data={data}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#ff3b30"
                      strokeWidth={3}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Profit */}
          <div className="stat-wrapper">
            <div className="stat-card">
              <div className="stat-top d-flex justify-content-between">
                <span className="title">Net Profit</span>
                <span className="growth positive">+12%</span>
              </div>

              <div className="stat-bottom">
                <h3 className="value">28%</h3>

                <ResponsiveContainer width={100} height={40}>
                  <LineChart data={data}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#ff9800"
                      strokeWidth={3}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* *****************************************************************
                 CLOCK PRODUCT INFO + REVENUE CHART
***************************************************************** */}

      <div className="product-wrapper">
        {/* LEFT CARD */}
        <div className="info-card">
          <div className="clock-icon">
            <img src={clock} alt="clock" />
          </div>

          <h4>Analog Table Clock</h4>
          <p className="sub">General</p>

          <hr />

          <div className="info-row">
            <FaBox />
            <div>
              <span>In Stock</span>
              <p>9,520</p>
            </div>
          </div>

          <div className="info-row">
            <FaPalette />
            <div>
              <span>Colors</span>
              <p>Black, White, Blue, Yellow</p>
            </div>
          </div>

          <div className="info-row">
            <FaCalendarAlt />
            <div>
              <span>Start Time</span>
              <p>September 30, 2018</p>
            </div>
          </div>

          <div className="info-row">
            <FaDollarSign />
            <div>
              <span>Life Time Sells</span>
              <p>40,02,030</p>
            </div>
          </div>
        </div>

        {/* RIGHT CHART CARD */}
        <div className="chart-card">
          <div className="chart-header">
            <div className="chart-left">
              <span className="dot"></span>
              <h4>Revenue</h4>
            </div>

            <div className="chart-right">
              <span className="view">View Details →</span>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={Revdata}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              
              <Tooltip
                cursor={false}
                formatter={(value) => [value, null]} // removes label text
                contentStyle={{
                  background: "#ff8c00",
                  border: "none",
                  borderRadius: "10px",
                  color: "#fff",
                  fontWeight: "600",
                }}
                itemStyle={{ color: "#fff" }}
                labelStyle={{ display: "none" }}
              />
              <XAxis
                dataKey="day"
                axisLine={false} // remove horizontal axis line
                tickLine={false} // remove tick marks
              />

              <YAxis
                axisLine={false} // remove vertical axis line
                tickLine={false} // remove tick marks
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#ff8c00"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* *****************************************************************
                 PRODUCT LISTING TABLE
***************************************************************** */}

      <section className="product-page">
        {/* Header */}
        <div className="table-header">
          <h4>Product Details</h4>

          <button className="add-btn" onClick={() => navigate("/addproduct")}>
            <FaPlus /> Add New
          </button>
        </div>

        {/* Table */}
        <div className="table-card">
          <div className="table-scroll">
            <table className="product-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Stock Status</th>
                  <th>Category</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>

                    <td>📱</td>

                    <td>{product.name}</td>

                    <td>₹{product.price}</td>

                    <td className="stock">{product.stockStatus}</td>

                    <td>{product.category}</td>

                    <td className="actions">
                      <FaEdit
                        className="edit"
                        onClick={() => handleEdit(index)}
                      />

                      <FaTrash
                        className="delete"
                        onClick={() => handleDelete(index)}
                      />

                      <FaEllipsisV className="more" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

export default Products;
