import { useState } from "react";
import { FaEye, FaRegTrashAlt, FaSearch } from "react-icons/fa";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./UserListing.css";

function UserManagement() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const users = [
    {
      id: 1,
      name: "Rahul",
      email: "rahul@gmail.com",
      phone: "9876543210",
      registered: "10 Jun 2026",
      lastLogin: "11 Jun 3:45 PM",
      orders: 5,
      address: "12, Anna Nagar, Chennai, Tamil Nadu 600040",
    },
    {
      id: 2,
      name: "Priya",
      email: "priya@gmail.com",
      phone: "8765432109",
      registered: "9 Jun 2026",
      lastLogin: "10 Jun 8:30 PM",
      orders: 2,
      address: "45, T Nagar, Chennai, Tamil Nadu 600017",
    },
    {
      id: 3,
      name: "Arun",
      email: "arun@gmail.com",
      phone: "9123456780",
      registered: "8 Jun 2026",
      lastLogin: "11 Jun 9:20 AM",
      orders: 7,
      address: "23, Gandhipuram, Coimbatore, Tamil Nadu 641012",
    },
    {
      id: 4,
      name: "Divya",
      email: "divya@gmail.com",
      phone: "9345678123",
      registered: "7 Jun 2026",
      lastLogin: "10 Jun 7:10 PM",
      orders: 3,
      address: "18, RS Puram, Coimbatore, Tamil Nadu 641002",
    },
    {
      id: 5,
      name: "Karthik",
      email: "karthik@gmail.com",
      phone: "9786543210",
      registered: "6 Jun 2026",
      lastLogin: "11 Jun 11:05 AM",
      orders: 10,
      address: "52, Velachery, Chennai, Tamil Nadu 600042",
    },
    {
      id: 6,
      name: "Meena",
      email: "meena@gmail.com",
      phone: "9567891234",
      registered: "5 Jun 2026",
      lastLogin: "9 Jun 5:45 PM",
      orders: 4,
      address: "77, Peelamedu, Coimbatore, Tamil Nadu 641004",
    },
    {
      id: 7,
      name: "Vikram",
      email: "vikram@gmail.com",
      phone: "9871203456",
      registered: "4 Jun 2026",
      lastLogin: "11 Jun 1:30 PM",
      orders: 6,
      address: "21, KK Nagar, Madurai, Tamil Nadu 625020",
    },
    {
      id: 8,
      name: "Sneha",
      email: "sneha@gmail.com",
      phone: "9654321789",
      registered: "3 Jun 2026",
      lastLogin: "10 Jun 6:20 PM",
      orders: 1,
      address: "34, Alagapuram, Salem, Tamil Nadu 636004",
    },
    {
      id: 9,
      name: "Ajay",
      email: "ajay@gmail.com",
      phone: "9126783450",
      registered: "2 Jun 2026",
      lastLogin: "11 Jun 10:15 AM",
      orders: 8,
      address: "19, Fairlands, Salem, Tamil Nadu 636016",
    },
    {
      id: 10,
      name: "Nisha",
      email: "nisha@gmail.com",
      phone: "9345012789",
      registered: "1 Jun 2026",
      lastLogin: "10 Jun 9:00 PM",
      orders: 2,
      address: "88, Thillai Nagar, Trichy, Tamil Nadu 620018",
    },
    {
      id: 11,
      name: "Ramesh",
      email: "ramesh@gmail.com",
      phone: "9876541201",
      registered: "30 May 2026",
      lastLogin: "11 Jun 4:15 PM",
      orders: 3,
      address: "15, Adyar, Chennai, Tamil Nadu 600020",
    },
    {
      id: 12,
      name: "Lakshmi",
      email: "lakshmi@gmail.com",
      phone: "9784512365",
      registered: "29 May 2026",
      lastLogin: "10 Jun 2:10 PM",
      orders: 6,
      address: "42, Tambaram, Chennai, Tamil Nadu 600045",
    },
    {
      id: 13,
      name: "Suresh",
      email: "suresh@gmail.com",
      phone: "9658741236",
      registered: "28 May 2026",
      lastLogin: "11 Jun 8:20 AM",
      orders: 9,
      address: "9, Town Hall, Coimbatore, Tamil Nadu 641001",
    },
    {
      id: 14,
      name: "Anitha",
      email: "anitha@gmail.com",
      phone: "9347856123",
      registered: "27 May 2026",
      lastLogin: "9 Jun 6:30 PM",
      orders: 4,
      address: "31, KK Nagar, Madurai, Tamil Nadu 625020",
    },
    {
      id: 15,
      name: "Prakash",
      email: "prakash@gmail.com",
      phone: "9123678450",
      registered: "26 May 2026",
      lastLogin: "11 Jun 12:40 PM",
      orders: 7,
      address: "55, Srirangam, Trichy, Tamil Nadu 620006",
    },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.phone.includes(search),
  );

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const currentRows = filteredUsers.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  return (
    <>
      <div className="user-header">
        <h2>User Management</h2>

        <div className="user-search-bar">
          {" "}
          <FaSearch />
          <input
            type="text"
            placeholder="Search user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="user-container">
        <div className="user-table-wrapper">
          <table className="user-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Registered</th>
                <th>Last Login</th>
                <th>Orders</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.length > 0 ? (
                currentRows.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>

                    <td>{user.registered}</td>
                    <td>{user.lastLogin}</td>
                    <td>{user.orders}</td>

                    <td className="actions">
                      <FaEye
                        className="view"
                        onClick={() => navigate("/viewuser", { state: user })}
                      />

                      <FaRegTrashAlt className="delete" />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="no-users"
                    style={{ textAlign: "center", padding: "20px" }}
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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
    </>
  );
}

export default UserManagement;
