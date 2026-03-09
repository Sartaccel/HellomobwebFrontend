import { FaEllipsisV, FaArrowUp, FaArrowDown } from "react-icons/fa";
import "./DashboardKpis.css";

const kpiData = [
  {
    id: 1,
    title: "Total Sales",
    period: "Last 7 days",
    value: "₹350K",
    growthText: "Sales",
    growth: "10.4%",
    previous: "$235"
  },
  {
    id: 2,
    title: "Total Orders",
    period: "Last 7 days",
    value: "10.7K",
    growthText: "Order",
    growth: "14.4%",
    previous: "7.6K"
  }
];

function DashboardKpis() {
  return (
    <div className="kpi-container">

      {kpiData.map((item) => (
        <div className="kpi-card" key={item.id}>
          
          <div className="kpi-header">
            <div>
              <h4>{item.title}</h4>
              <span>{item.period}</span>
            </div>
            <FaEllipsisV className="menu-icon" />
          </div>

          <div className="kpi-body">
            <h2>{item.value}</h2>
            <span className="growth up">
              {item.growthText} <FaArrowUp /> {item.growth}
            </span>
          </div>

          <p className="previous">
            Previous 7days <span>({item.previous})</span>
          </p>

          <button className="details-btn">Details</button>

        </div>
      ))}

      {/* Pending & Cancel Card */}
      <div className="kpi-card">

        <div className="kpi-header">
          <div>
            <h4>Pending & Canceled</h4>
            <span>Last 7 days</span>
          </div>
          <FaEllipsisV className="menu-icon" />
        </div>

        <div className="pending-row">
          <div>
            <p>Pending</p>

            <div className="pending-info">
              <h3 className="pendingkpi">509</h3>
              <span>user 204</span>
            </div>
          </div>

          <div className="divider"></div>

          <div>
            <p>Canceled</p>

            <div className="cancel-info">
              <h3 className="cancel">94</h3>
              <span className="down">
                <FaArrowDown /> 14.4%
              </span>
            </div>
          </div>
        </div>

        <button className="details-btn">Details</button>

      </div>

    </div>
  );
};

export default DashboardKpis;