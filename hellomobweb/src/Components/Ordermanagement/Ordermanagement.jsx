import { useState } from "react";
import { FaArrowRight, FaEllipsisH, FaSearch } from "react-icons/fa";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

import "./Ordermanagement.css";

const orderData = [
  {
    id: "#5302002",
    product: "iPhone 15 Pro",
    category: "Mobile",
    qty: 1,
    date: "Jan 10, 2024",
    amount: "₹1,29,900",
    payment: "UPI",
    status: "new",
  },
  {
    id: "#5302003",
    product: "Samsung Galaxy S23",
    category: "Mobile",
    qty: 2,
    date: "Sep 4, 2024",
    amount: "₹1,19,998",
    payment: "Credit Card",
    status: "new",
  },
  {
    id: "#5302004",
    product: "OnePlus 11",
    category: "Mobile",
    qty: 1,
    date: "Aug 30, 2024",
    amount: "₹61,999",
    payment: "COD",
    status: "new",
  },
  {
    id: "#5302005",
    product: "Realme Narzo 60",
    category: "Mobile",
    qty: 3,
    date: "Aug 29, 2024",
    amount: "₹53,997",
    payment: "Net Banking",
    status: "new",
  },
  {
    id: "#5302006",
    product: "Redmi Note 13",
    category: "Mobile",
    qty: 2,
    date: "Dec 26, 2024",
    amount: "₹39,998",
    payment: "EMI",
    status: "new",
  },
  {
    id: "#5302007",
    product: "Boat Airdopes 441",
    category: "Accessories",
    qty: 4,
    date: "Apr 27, 2024",
    amount: "₹7,996",
    payment: "UPI",
    status: "new",
  },
  {
    id: "#5302008",
    product: "Samsung Buds 2",
    category: "Accessories",
    qty: 1,
    date: "May 5, 2024",
    amount: "₹9,999",
    payment: "Credit Card",
    status: "new",
  },
];

function Ordermanagement() {
  const [orders, setOrders] = useState(orderData);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("new");
  const [menuOpen, setMenuOpen] = useState(null);

  // update order status
  const updateStatus = (id, newStatus) => {
    const updated = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updated);
    setMenuOpen(null);
  };

  // search + status filter
  const filteredOrders = orders
    .filter((order) => order.status === filterStatus)
    .filter((order) => {
      const term = search.toLowerCase();
      return (
        order.id.toLowerCase().includes(term) ||
        order.product.toLowerCase().includes(term) ||
        order.category.toLowerCase().includes(term)
      );
    });

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const currentRows = filteredOrders.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);

  return (
    <>
      {/* HEADER */}
      <div className="orders-page-header">
        <h2>Orders</h2>

        <div className="orders-search-bar">
          <FaSearch />
          <input
            type="text"
            placeholder="Search order..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* TOGGLE BUTTONS */}
      <div className="orders-toggle">
        <button
          className={filterStatus === "new" ? "active" : ""}
          onClick={() => {
            setFilterStatus("new");
            setCurrentPage(1);
          }}
        >
          New Orders
        </button>

        <button
          className={filterStatus === "shipped" ? "active" : ""}
          onClick={() => {
            setFilterStatus("shipped");
            setCurrentPage(1);
          }}
        >
          Shipped
        </button>

        <button
          className={filterStatus === "delivered" ? "active" : ""}
          onClick={() => {
            setFilterStatus("delivered");
            setCurrentPage(1);
          }}
        >
          Delivered
        </button>
      </div>

      {/* CARD */}
      <div className="orders-card">
        <div className="orders-header">
          <h4>Orders</h4>
          <span className="more">
            More <FaArrowRight />
          </span>
        </div>

        <div className="orders-scroll">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Products</th>
                <th>Qty</th>
                <th>Date</th>
                <th>Total Amount</th>
                <th>Payment Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentRows.length > 0 ? (
                currentRows.map((item, i) => (
                  <tr key={i}>
                    <td className="order-id">{item.id}</td>

                    <td>
                      <div className="product">
                        <span>{item.product}</span>
                        <small>{item.category}</small>
                      </div>
                    </td>

                    <td>{item.qty}</td>
                    <td>{item.date}</td>
                    <td>{item.amount}</td>
                    <td>{item.payment}</td>

                    <td>
                      <span className={`orderstatus ${item.status}`}>
                        {item.status}
                      </span>
                    </td>

                    {/* ACTION MENU */}
                    <td className="actions">
                      <div className="action-menu">
                        <FaEllipsisH
                          onClick={() =>
                            setMenuOpen(menuOpen === item.id ? null : item.id)
                          }
                        />

                        {menuOpen === item.id && (
                          <div className="dropdown">
                            <button
                              onClick={() => updateStatus(item.id, "shipped")}
                            >
                              Mark as Shipped
                            </button>

                            <button
                              onClick={() =>
                                updateStatus(item.id, "delivered")
                              }
                            >
                              Mark as Delivered
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center", padding: 20 }}>
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
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
    </>
  );
}

export default Ordermanagement;