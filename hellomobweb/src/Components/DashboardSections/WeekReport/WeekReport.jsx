import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { FaEllipsisV } from "react-icons/fa";
import "./WeekReport.css";

const statsData = [
  {
    id: 1,
    value: "52k",
    label: "Customers",
    color: "green",
  },
  {
    id: 2,
    value: "3.5k",
    label: "Total Products",
    color: "purple",
  },
  {
    id: 3,
    value: "2.5k",
    label: "Stock Products",
    color: "purple",
  },
  {
    id: 4,
    value: "0.5k",
    label: "Out of Stock",
    color: "purple",
  },
  {
    id: 5,
    value: "250k",
    label: "Revenue",
    color: "purple",
  },
];

// Your main component
const data = [
  { day: "Sun", value: 15000 },
  { day: "Mon", value: 27000 },
  { day: "Tue", value: 27000 },
  { day: "Wed", value: 20000 },
  { day: "Thu", value: 35000 },
  { day: "Fri", value: 22000 },
  { day: "Sat", value: 30000 },
];

// Custom Tooltip goes here
function CustomTooltip({ active, payload, label }) {
  const dayMap = {
    Sun: "Sunday",
    Mon: "Monday",
    Tue: "Tuesday",
    Wed: "Wednesday",
    Thu: "Thursday",
    Fri: "Friday",
    Sat: "Saturday",
  };

  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <div>{dayMap[label]}</div>
        <div>{payload[0].value / 1000}k</div>
      </div>
    );
  }

  return null;
}

function WeekReport() {
  const [active, setActive] = useState("week"); //toggle button
  return (
    <div className="week-report-card">
      {/* Header */}
      <div className="report-header">
        <h4>Report for this week</h4>

        <div className="report-actions">
          <div className="week-switch">
            <button
              className={active === "week" ? "active" : ""}
              onClick={() => setActive("week")}
            >
              This week
            </button>

            <button
              className={active === "last" ? "active" : ""}
              onClick={() => setActive("last")}
            >
              Last week
            </button>
          </div>

          <FaEllipsisV className="menu-icon" />
        </div>
      </div>

      {/* Stats */}
      <div className="report-stats">
        {statsData.map((item) => (
          <div className="stat" key={item.id}>
            <h3>{item.value}</h3>
            <p>{item.label}</p>
            <div className={`line ${item.color}`}></div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="report-chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            {/* Gradient */}
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3aa06c" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3aa06c" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid horizontal={false} vertical={false} />

            <XAxis dataKey="day" axisLine={false} tickLine={false} />

            <YAxis
              width={30}
              tickFormatter={(v) => `${v / 1000}k`}
              axisLine={{ stroke: "#000", strokeOpacity: 0.2 }}
              tickLine={false}
            />
            {/* Tooltip */}
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "#6bbf73", strokeDasharray: "4 4" }}
            />

            <Area
              type="monotoneX"
              dataKey="value"
              stroke="#3aa06c"
              fill="url(#colorSales)"
              strokeWidth={2.5}
              dot={false}
              activeDot={{
                r: 6,
                fill: "#fff",
                stroke: "#3aa06c",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default WeekReport;
