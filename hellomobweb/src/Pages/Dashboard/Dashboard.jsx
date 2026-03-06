import { useState } from "react";
import { FaArrowRight, FaEdit, FaEllipsisH, FaTrash } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";


import "bootstrap/dist/css/bootstrap.min.css";
import {
  Area,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./Dashboard.css";
const sparkData = [
  { value: 10 },
  { value: 30 },
  { value: 20 },
  { value: 40 },
  { value: 25 },
];

const cartData = [
  { name: "Completed", value: 62 },
  { name: "Abandoned", value: 38 },
];
const monthlyData = [
  { day: "20", value: 3000 },
  { day: "22", value: 7000 },
  { day: "24", value: 4500 },
  { day: "26", value: 4800 },
  { day: "28", value: 3200 },
  { day: "30", value: 4200 },
  { day: "02", value: 2800 },
  { day: "04", value: 6000 }, // Highlight
  { day: "06", value: 3800 },
  { day: "08", value: 2200 },
  { day: "10", value: 8200 },
  { day: "12", value: 4300 },
  { day: "14", value: 3500 },
  { day: "16", value: 4700 },
];
const COLORS = ["var(--donut-bg)", "var(--donut-main)"];
const revenueData = [
  { name: "Desktop", value: 830, percent: "64.2%", color: "#ff8a00" },
  { name: "Tablet", value: 550, percent: "15.3%", color: "#3b82f6" },
  { name: "Mobile", value: 755, percent: "48.6%", color: "#06b6d4" },
  { name: "Unknown", value: 150, percent: "8.6%", color: "#ef4444" }
];

const trafficData = [
  { day: 16, value: 1200 },
  { day: 18, value: 900 },
  { day: 20, value: 2200 },
  { day: 24, value: 1500 },
  { day: 26, value: 2000 },
  { day: 28, value: 1400 },
  { day: 30, value: 2500 }
];


const revenue = [
  { v: 10 }, { v: 20 }, { v: 18 }, { v: 30 }, { v: 25 }, { v: 40 }
];

const profitData = [
  { v: 40 }, { v: 50 }, { v: 60 }, { v: 55 }, { v: 45 }, { v: 43 }
];

const ordersData = [
  { v: 10 }, { v: 18 }, { v: 15 }, { v: 22 }, { v: 20 }, { v: 32 }
];

const visitorsData = [
  { v: 20 }, { v: 35 }, { v: 30 }, { v: 25 }, { v: 40 }, { v: 38 }
];

const orders = [
  {
    product: "Power Bank 10,000 mAh",
    qty: "x2",
    date: "Feb 5, 2020",
    revenue: "₹4253.82",
    profit: "$60.76",
    status: "Pending",
    img: "https://cdn-icons-png.flaticon.com/512/1041/1041916.png",
  },
  {
    product: "Watch",
    qty: "x3",
    date: "Sep 8, 2020",
    revenue: "₹6556.24",
    profit: "$66.41",
    status: "Shipping",
    img: "https://cdn-icons-png.flaticon.com/512/892/892458.png",
  },
  {
    product: "Clock",
    qty: "x3",
    date: "Dec 21, 2020",
    revenue: "₹6115.26",
    profit: "$95.66",
    status: "Refund",
    img: "https://cdn-icons-png.flaticon.com/512/2972/2972531.png",
  },
  {
    product: "iPhone 17 Pro Max",
    qty: "x2",
    date: "Aug 13, 2020",
    revenue: "₹7675.51",
    profit: "$84.80",
    status: "Completed",
    img: "https://cdn-icons-png.flaticon.com/512/731/731985.png",
  },
  {
    product: "Boat Airdopes 141 ANC",
    qty: "x2",
    date: "May 8, 2020",
    revenue: "₹9910.71",
    profit: "$46.52",
    status: "Shipping",
    img: "https://cdn-icons-png.flaticon.com/512/727/727245.png",
  },
];

const statusColor = (status) => {
  switch (status) {
    case "Pending":
      return "status pending";
    case "Shipping":
      return "status shipping";
    case "Refund":
      return "status refund";
    case "Completed":
      return "status completed";
    default:
      return "status";
  }
};
const Dashboard = () => {
const [barIndex, setBarIndex] = useState(null);
const [pieIndex, setPieIndex] = useState(null);
  return (
    <div className="container-fluid dashboard">
{/* ********************************************************************************
                                TOP KPI'S
********************************************************************************** */}

      {/* ================= TOP KPI ================= */}
      <div className="row g-3 mb-4">

        {/* Revenue */}
      <div className="col-12 col-sm-6 col-lg-4 col-xl-3">
  <div className="card kpi-card shadow-sm border-0">
    
    <div className="d-flex justify-content-between align-items-start">
      
      {/* LEFT SIDE */}
      <div>
        <small className="text-muted">Revenue</small>
        <h5 className="fw-bold mb-0">₹7,45,825</h5>
      </div>

      {/* RIGHT SIDE */}
      <div className="text-end">
        <div
          className="kpi-percentage"
          style={{ color: "var(--revenue-color)" }}
        >
          +22%
        </div>

        <ResponsiveContainer width={80} height={50}>
          <LineChart data={sparkData}>
            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--revenue-color)"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>

  </div>
</div>
        {/* Orders */}
<div className="col-12 col-sm-6 col-lg-4 col-xl-3">
  <div className="card kpi-card shadow-sm border-0">

    <div className="d-flex justify-content-between align-items-start">

      {/* LEFT SIDE */}
      <div>
        <small className="text-muted">Orders</small>
        <h5 className="fw-bold mb-0">920</h5>
      </div>

      {/* RIGHT SIDE */}
      <div className="text-end">
        <div
          className="kpi-percentage"
          style={{ color: "var(--orders-color)" }}
        >
          -25%
        </div>

        <ResponsiveContainer width={80} height={50}>
          <LineChart data={sparkData}>
            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--orders-color)"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>

  </div>
</div>
        {/* Visitors */}
        <div className="col-12 col-sm-6 col-lg-4 col-xl-3">
  <div className="card kpi-card shadow-sm border-0">

    <div className="d-flex justify-content-between align-items-start">

      {/* LEFT SIDE */}
      <div>
        <small className="text-muted">Visitors</small>
        <h5 className="fw-bold mb-0">15.5K</h5>
      </div>

      {/* RIGHT SIDE */}
      <div className="text-end">
        <div
          className="kpi-percentage"
          style={{ color: "var(--visitors-color)" }}
        >
          +49%
        </div>

        <ResponsiveContainer width={80} height={50}>
          <LineChart data={sparkData}>
            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--visitors-color)"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>

  </div>
</div>
      {/* ================= BOTTOM SECTION ================= */}
      <div className="col-12 col-sm-6 col-lg-4 col-xl-3">
  <div className="card kpi-card shadow-sm border-0">

    <div className="d-flex justify-content-between align-items-start">

      {/* LEFT SIDE */}
      <div>
        <small className="text-muted">Conversion</small>
        <h5 className="fw-bold mb-0">28%</h5>
      </div>

      {/* RIGHT SIDE */}
      <div className="text-end">
        <div
          className="kpi-percentage"
          style={{ color: "var(--conversion-color)" }}
        >
          +1.9%
        </div>

        <ResponsiveContainer width={80} height={50}>
          <LineChart data={sparkData}>
            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--conversion-color)"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>

  </div>
</div>

        {/* Cart */}
        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="card cart-card shadow-sm border-0">

            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="mb-0">Cart</h6>
              <span className="info-icon">i</span>
            </div>

            <div className="donut-wrapper">
              <ResponsiveContainer width={180} height={180}>
                <PieChart>
                  <Pie
                    data={cartData}
                    dataKey="value"
                    innerRadius={55}
                    outerRadius={70}
                    startAngle={210}
                    endAngle={-30}
                    stroke="none"
                  >
                    {cartData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              <div className="donut-center">
                <h5>38%</h5>
              </div>
            </div>

            <div className="mt-3 small">
              <div className="d-flex justify-content-between">
                <span>Abandoned Cart</span>
                <strong>720</strong>
              </div>
              <div className="d-flex justify-content-between text-muted">
                <span>Abandoned Revenue</span>
                <strong>$5,900</strong>
              </div>
            </div>

          </div>
        </div>
        </div>
{/* ********************************************************************************
                                Dashboard Analytics
********************************************************************************** */}<div className="row mt-4">
  <div className="col-12">
    <div className="card analytics-card shadow-sm border-0 p-3 p-md-4">
      
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <h5 className="mb-2 mb-md-0">Dashboard</h5>
        <span className="advanced-link">
          Advanced Report →
        </span>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={monthlyData}  barCategoryGap="10%" >
           

          <XAxis dataKey="day" axisLine={false} tickLine={false} 
          tick={{ fill: "var(--axis-text)" }}
/>
          <YAxis
            axisLine={false}
            tickLine={false}
            ticks={[0, 350, 4000, 8500]}
            tick={{ fill: "var(--axis-text)" }}
          />
          <Tooltip
  cursor={{
    fill: "var(--hover-bg)",
    radius: 40
  }}
  contentStyle={{
    background: "white",
    border: "none",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
  }}
/>

          <Bar 
          dataKey="value" 
          barSize={6}
          radius={[5, 5, 5, 5]}
          
           onMouseMove={(_, index) => setBarIndex(index)}
onMouseLeave={() => setBarIndex(null)}

  >
            {monthlyData.map((entry, index) => (
              <Cell
                key={index}
                fill={
  entry.day === "04"
    ? "var(--bar-highlight)"
    : "var(--bar-default)"
}
                
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

    </div>
  </div>
</div>

{/* ********************************************************************************
                          REVENUE BY DEVICE & TRAFFIC
********************************************************************************** */}
 <div className="row g-4 device-rev-traffic">

  {/* ***********************Revenue*************************** */}
  <div className="col-lg-6 col-md-12">
    <div className="dashboard-card">

      <div className="card-header-custom">
        <h5>Revenue by device</h5>
<span className="more-btn">
  More <FaArrowRight />
</span>      </div>

      <div className="chart-container">

        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
           <Pie
  data={revenueData}
  dataKey="value"
  innerRadius={70}
  outerRadius={100}
  paddingAngle={4}
  activeIndex={pieIndex}
  activeShape={(props) => (
    <Sector
      {...props}
      outerRadius={props.outerRadius + 10}
    />
  )}
  onMouseEnter={(_, index) => setPieIndex(index)}
  onMouseLeave={() => setPieIndex(null)}
>
  {revenueData.map((entry, index) => (
    <Cell key={index} fill={entry.color} />
  ))}
</Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="chart-center">64%</div>

      </div>

<div className="device-stats">

  <div className="device-col left">

    <div className="device-row">
      <span className="dot" style={{background:"#ff8a00"}}></span>
      <span className="device-name">Desktop</span>
      <span className="device-amount">₹830.03</span>
      <span className="device-percent">64.2%</span>
    </div>

    <div className="device-row">
      <span className="dot" style={{background:"#06b6d4"}}></span>
      <span className="device-name">Mobile</span>
      <span className="device-amount">₹755.75</span>
      <span className="device-percent">48.6%</span>
    </div>

  </div>


  <div className="divider"></div>


  <div className="device-col right">

    <div className="device-row">
      <span className="dot" style={{background:"#3b82f6"}}></span>
      <span className="device-name">Tablet</span>
      <span className="device-amount">₹550.81</span>
      <span className="device-percent">15.3%</span>
    </div>

    <div className="device-row">
      <span className="dot" style={{background:"#ef4444"}}></span>
      <span className="device-name">Unknown</span>
      <span className="device-amount">₹150.84</span>
      <span className="device-percent">8.6%</span>
    </div>

  </div>

</div>
    </div>
  </div>

  {/* ************************Traffic************************ */}
  <div className="col-lg-6 col-md-12">

    <div className="dashboard-card">

      <div className="card-header-custom">
        <h5>Traffic</h5>
<span className="more-btn">
  More <FaArrowRight />
</span>      </div>

      <div className="traffic-stats">

        <div className="traffic-box">
          <p>Store Visits</p>
          <h3>8950</h3>
          <span className="green">+22%</span>
        </div>

        <div className="traffic-box">
          <p>Visitors</p>
          <h3>1520</h3>
          <span className="red">-24%</span>
        </div>

      </div>

      <div className="line-chart">
         <p className="traffic-subtitle">
    Jan 16 - Jan 30 store visits chart
  </p>

        <ResponsiveContainer width="100%" height={260}>
  <LineChart data={trafficData}>

    <defs>
      <linearGradient id="trafficGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ff8a00" stopOpacity={0.25}/>
        <stop offset="100%" stopColor="#ff8a00" stopOpacity={0}/>
      </linearGradient>
    </defs>

    <CartesianGrid
      strokeDasharray="3 6"
      vertical={false}
      stroke="#d3d4d5"
    />

    <XAxis
      dataKey="day"
      axisLine={false}
      tickLine={false}
      tick={{ fill:"#7b8794" }}
    />

    <Tooltip
  cursor={false}
  formatter={(value) => [value, null]}
  labelFormatter={() => null}
  wrapperClassName="traffic-tooltip"
/>

    {/* Gradient area */}
    <Area
      type="monotone"
      dataKey="value"
      stroke="none"
      fill="url(#trafficGradient)"
        tooltipType="none"

    />

    {/* Main line */}
    <Line
      type="monotone"
      dataKey="value"
      stroke="#ff8a00"
      strokeWidth={4}
      dot={false}
      activeDot={{
        r:8,
        stroke:"#ff8a00",
        strokeWidth:3,
        fill:"#fff"
      }}
    />

    

  </LineChart>
</ResponsiveContainer>

      </div>

    </div>

  </div>

</div>

{/* ********************************************************************************
                          BEST SELLERS & SALES FORCAST
********************************************************************************** */}
<div className="row">

 <div className="col-xl-6 col-lg-12">
      <div className="sales-card">

        <div className="card-header-custom">
          <h5>Bestsellers</h5>
<span className="more-btn">
  More <FaArrowRight />
</span>        </div>

        <div className="table-responsive">
          <table className="best-table">

          <thead>
  <tr>
    <th>Product</th>
    <th>
      Price <MdKeyboardArrowDown />
    </th>
    <th>
      Sold <MdKeyboardArrowDown />
    </th>
    <th>
      Profit <MdKeyboardArrowDown />
    </th>
  </tr>
</thead>

            <tbody>

              <tr>
                <td>
                  <div className="product-info">
                    <img src="https://cdn-icons-png.flaticon.com/512/0/191.png" alt="" />
                    <span>iPhone 17 Pro Max</span>
                  </div>
                </td>
                <td>$21.19</td>
                <td>409</td>
                <td>$1822.87</td>
              </tr>

              <tr>
                <td>
                  <div className="product-info">
                    <img src="https://cdn-icons-png.flaticon.com/512/633/633611.png" alt="" />
                    <span>USB-C to Lightning Cable</span>
                  </div>
                </td>
                <td>$14.18</td>
                <td>396</td>
                <td>$8545.25</td>
              </tr>

              <tr>
                <td>
                  <div className="product-info">
                    <img src="https://cdn-icons-png.flaticon.com/512/545/545705.png" alt="" />
                    <span>Nothing Phone Pro 5G</span>
                  </div>
                </td>
                <td>$18.15</td>
                <td>243</td>
                <td>$7287.01</td>
              </tr>

              <tr>
                <td>
                  <div className="product-info">
                    <img src="https://cdn-icons-png.flaticon.com/512/892/892458.png" alt="" />
                    <span>Boat Airdopes 141 ANC</span>
                  </div>
                </td>
                <td>$74.16</td>
                <td>636</td>
                <td>$9325.47</td>
              </tr>

            </tbody>

          </table>
        </div>

      </div>
    </div>

    <div className="col-xl-6 col-lg-12">
  <div className="sales-card">

    <div className="card-header-custom">
      <h5>Sales Forecast</h5>
<span className="more-btn">
  More <FaArrowRight />
</span>    </div>

    <div className="forecast-grid">

      {/* Revenue */}
      <div className="forecast-box">
        <div>
          <p>Revenue</p>
          <h3>+24.2%</h3>
        </div>

         <ResponsiveContainer width={80} height={50}>
          <LineChart data={revenue}>
            <Line
              type="monotone"
              dataKey="v"
              stroke="#ffa500"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Net Profit */}
      <div className="forecast-box">
        <div>
          <p>Net Profit</p>
          <h3>-2.5%</h3>
        </div>

        <ResponsiveContainer width={80} height={50}>
          <LineChart data={profitData}>
            <Line
              type="monotone"
              dataKey="v"
              stroke="#ff3b30"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Orders */}
      <div className="forecast-box">
        <div>
          <p>Orders</p>
          <h3>+32.8%</h3>
        </div>

        <ResponsiveContainer width={80} height={50}>
          <LineChart data={ordersData}>
            <Line
              type="monotone"
              dataKey="v"
              stroke="#28a745"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Visitors */}
      <div className="forecast-box">
        <div>
          <p>Visitors</p>
          <h3>+60%</h3>
        </div>

        <ResponsiveContainer width={80} height={50}>
          <LineChart data={visitorsData}>
            <Line
              type="monotone"
              dataKey="v"
              stroke="#ffa500"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>

  </div>
</div>
    </div>
    {/* ********************************************************************************
                          PRODUCTS-TABLE 
********************************************************************************** */}
 <div className="orders-card">

  {/* Header */}
  <div className="orders-header">
    <h5>Latest Orders</h5>
<span className="more-btn">
  More <FaArrowRight />
</span>  </div>

  {/* Table */}
  <div className="table-responsive orders-table-wrapper">

    <table className="table orders-table">

      <thead>
        <tr>
          <th>Products</th>
          <th>QTY</th>
          <th>Date</th>
          <th>Revenue</th>
          <th>Net Profit</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {orders.map((item, index) => (
          <tr key={index}>

            <td className="product-cell">
              <img src={item.img} alt={item.product} />
              <span>{item.product}</span>
            </td>

            <td>{item.qty}</td>
            <td>{item.date}</td>
            <td>{item.revenue}</td>
            <td>{item.profit}</td>

            <td>
              <span className={statusColor(item.status)}>
                {item.status}
              </span>
            </td>

            <td>
              <div className="action-icons">
                <FaEdit />
                <FaTrash />
                <FaEllipsisH />
              </div>
            </td>

          </tr>
        ))}
      </tbody>

    </table>

  </div>
</div>
  </div>

  );
};

export default Dashboard;