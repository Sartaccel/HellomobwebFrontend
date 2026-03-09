import React from "react";
import { FaFilter } from "react-icons/fa";
import "./Transaction.css";

const transactions = [
  { id: 1, customer: "#6545", date: "01 Oct | 11:29 am", status: "Paid", amount: "₹640" },
  { id: 2, customer: "#5412", date: "01 Oct | 11:29 am", status: "Pending", amount: "₹557" },
  { id: 3, customer: "#6622", date: "01 Oct | 11:29 am", status: "Paid", amount: "₹156" },
  { id: 4, customer: "#6462", date: "01 Oct | 11:29 am", status: "Paid", amount: "₹265" },
  { id: 5, customer: "#6462", date: "01 Oct | 11:29 am", status: "Paid", amount: "₹265" }
];

function Transaction() {
  return (
    <div className="transaction-card">

      {/* Header */}
      <div className="transaction-header">
        <h4>Transaction</h4>

        <button className="filter-btn">
          Filter <FaFilter />
        </button>
      </div>

     {/* Table */}
<div className="table-scroll">

  <div className="transaction-table">

        <div className="table-head">
          <span>No</span>
          <span>Id Customer</span>
          <span>Order Date</span>
          <span>Status</span>
          <span>Amount</span>
        </div>

        {transactions.map((item) => (
          <div className="table-row" key={item.id}>

            <span>{item.id}.</span>

            <span>{item.customer}</span>

            <span>{item.date}</span>

            <span className="status">
              <span className={`dot ${item.status === "Paid" ? "paid" : "pending"}`}></span>
              {item.status}
            </span>

            <span className="amount">{item.amount}</span>

          </div>
        ))}

      </div>
</div>

      {/* Footer */}
      <div className="transaction-footer">
        <button className="details-btn">Details</button>
      </div>

    </div>
  );
}

export default Transaction;