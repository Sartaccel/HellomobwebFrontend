import { useState } from "react";
import { FaEllipsisH, FaPen, FaTrash } from "react-icons/fa";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";

import "./Ordermanagement.css";

const orderData = [
  { id:"#5302002", product:"Basket with handles", category:"Grocery", qty:2, date:"Jan 10, 2020", revenue:"₹6253.82", profit:"₹760.76", status:"Completed"},
  { id:"#5302003", product:"Basket with handles", category:"Grocery", qty:1, date:"Sep 4, 2020", revenue:"₹6556.24", profit:"₹266.41", status:"Completed"},
  { id:"#5302004", product:"Basket with handles", category:"Grocery", qty:3, date:"Aug 30, 2020", revenue:"₹9115.26", profit:"₹595.66", status:"Completed"},
  { id:"#5302005", product:"Basket with handles", category:"Grocery", qty:3, date:"Aug 29, 2020", revenue:"₹3675.51", profit:"₹584.80", status:"Completed"},
  { id:"#5302006", product:"Basket with handles", category:"Grocery", qty:4, date:"Dec 26, 2020", revenue:"₹5910.71", profit:"₹346.52", status:"Completed"},
  { id:"#5302007", product:"Basket with handles", category:"Grocery", qty:2, date:"Apr 27, 2020", revenue:"₹8897.90", profit:"₹381.54", status:"Completed"},
  { id:"#5302008", product:"Basket with handles", category:"Grocery", qty:1, date:"May 5, 2020", revenue:"₹6563.43", profit:"₹917.46", status:"Pending"},
  { id:"#5302009", product:"Basket with handles", category:"Grocery", qty:4, date:"Oct 15, 2020", revenue:"₹9883.96", profit:"₹643.08", status:"Refund"},
  { id:"#5302010", product:"Basket with handles", category:"Grocery", qty:3, date:"Jul 12, 2020", revenue:"₹3162.15", profit:"₹586.65", status:"Pending"},
  { id:"#5302012", product:"Basket with handles", category:"Grocery", qty:2, date:"Jun 28, 2020", revenue:"₹7378.34", profit:"₹249.08", status:"Completed"}
];

 

function Ordermanagement() {
// Pagination
const [currentPage, setCurrentPage] = useState(1);
const rowsPerPage = 10;

const indexOfLastRow = currentPage * rowsPerPage;
const indexOfFirstRow = indexOfLastRow - rowsPerPage;

const currentRows = orderData.slice(
  indexOfFirstRow,
  indexOfLastRow
);

const totalPages = Math.ceil(orderData.length / rowsPerPage);

  return (
    <div className="orders-card">

      <div className="orders-header">
        <h4>Orders</h4>
        <span className="more">More →</span>
      </div>

      <div className="orders-scroll">

        <div className="orders-table">

          <div className="orders-head">
            <span>Order ID</span>
            <span>Products</span>
            <span>Qty</span>
            <span>Date</span>
            <span>Revenue</span>
            <span>Net Profit</span>
            <span>Status</span>
            <span>Actions</span>
          </div>

          {orderData.map((item,i)=>(
            <div className="orders-row" key={i}>

              <span className="order-id">{item.id}</span>

              <div className="product">
                <span>{item.product}</span>
                <small>{item.category}</small>
              </div>

              <span>{item.qty}</span>
              <span>{item.date}</span>
              <span>{item.revenue}</span>
              <span>{item.profit}</span>

              <span className={`orderstatus ${item.status.toLowerCase()}`}>
                {item.status}
              </span>

              <div className="actions">
                <FaPen/>
                <FaTrash/>
                <FaEllipsisH/>
              </div>

            </div>
          ))}

        </div>

      </div>
        {/* Pagination */}
       <div className="pagination">
      
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <MdKeyboardDoubleArrowLeft />
      
        </button>
      
        {[...Array(totalPages)].map((_, i) => (
      
          <button
            key={i}
            className={currentPage === i + 1 ? "active" : ""}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
      
        ))}
      
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <MdKeyboardDoubleArrowRight />
        </button>
      
      </div>

    </div>
  );
}


export default Ordermanagement



