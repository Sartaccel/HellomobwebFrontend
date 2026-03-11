import { useState } from "react";
import {
  FaEdit,
  FaEllipsisH,
  FaEllipsisV,
  FaRegTrashAlt,
  FaSearch,
  FaAngleDoubleRight,
FaAngleDoubleDown 
} from "react-icons/fa";
import { FiPlus, FiPlusCircle } from "react-icons/fi";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

import "./Categories.css";

const categories = [
  { name: "Mobiles", img: "https://picsum.photos/40?random=1" },
  { name: "Gifts", img: "https://picsum.photos/40?random=2" },
  { name: "Accessories", img: "https://picsum.photos/40?random=3" },
  { name: "Speakers", img: "https://picsum.photos/40?random=4" },
  { name: "Watches", img: "https://picsum.photos/40?random=5" },
  { name: "Perfumes", img: "https://picsum.photos/40?random=6" },
  { name: "Clocks", img: "https://picsum.photos/40?random=7" },
  { name: "Sweets nuts", img: "https://picsum.photos/40?random=8" },
  { name: "Shoes", img: "https://picsum.photos/40?random=9" },
  { name: "Bags", img: "https://picsum.photos/40?random=10" },
];

const categoryData = [
  { product: "Wireless Bluetooth Headphones", date: "01-01-2025", order: 25 },
  { product: "Men's T-Shirt", date: "01-01-2025", order: 20 },
  { product: "Men's Leather Wallet", date: "01-01-2025", order: 35 },
  { product: "Memory Foam Pillow", date: "01-01-2025", order: 40 },
  { product: "Coffee Maker", date: "01-01-2025", order: 45 },
  { product: "Casual Baseball Cap", date: "01-01-2025", order: 55 },
  { product: "Full HD Webcam", date: "01-01-2025", order: 20 },
  { product: "Smart LED Color Bulb", date: "01-01-2025", order: 16 },
];
function Categories() {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCategories = categories.slice(startIndex, startIndex + 8);
  const totalProducts = categoryData.length;

  const [activeFilter, setActiveFilter] = useState("all");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const currentRows = categoryData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(categoryData.length / rowsPerPage);
  return (
    <div className="categories-page">
      {/* HEADER */}
      <div className="page-header">
        <h2>Discover</h2>

        <div className="header-actions">
          <button className="add-btn">
            {" "}
            <FiPlusCircle />
            Add Category
          </button>
          <button className="edit-btn">
            Edit <FaEllipsisV />
          </button>
        </div>
      </div>

      {/* CATEGORY GRID */}
      <div className="category-wrapper">
        <div className="category-grid">
          {visibleCategories.map((cat, index) => (
            <div key={index} className="category-card">
              <img src={cat.img} alt={cat.name} />
              <p>{cat.name}</p>
            </div>
          ))}
        </div>

       

        <button className="next-arrow" onClick={() =>
            setStartIndex((prev) =>
              prev + 8 < categories.length ? prev + 8 : 0,
            )
          }>
  <FaAngleDoubleRight className="arrow-right" />
  <FaAngleDoubleDown className="arrow-down" />
</button>
      </div>

      {/* FILTER BAR */}
      <div className="category-table">
        <div className="filter-bar">
          <div className="filters">
            <button
              className={activeFilter === "all" ? "active" : ""}
              onClick={() => setActiveFilter("all")}
            >
              All Product ({categoryData.length})
            </button>

            <button
              className={activeFilter === "featured" ? "active" : ""}
              onClick={() => setActiveFilter("featured")}
            >
              Featured Products ({categoryData.filter((p) => p.featured).length}
              )
            </button>

            <button
              className={activeFilter === "sale" ? "active" : ""}
              onClick={() => setActiveFilter("sale")}
            >
              On Sale ({categoryData.filter((p) => p.sale).length})
            </button>

            <button
              className={activeFilter === "stock" ? "active" : ""}
              onClick={() => setActiveFilter("stock")}
            >
              Out of Stock ({categoryData.filter((p) => !p.stock).length})
            </button>
          </div>

          <div className="right-actions">
            <div className="search-box">
              <FaSearch />
              <input placeholder="Search your product" />
            </div>

            <div className="action-buttons">
              <button>
                <HiOutlineAdjustmentsHorizontal />
              </button>
              <button>
                <FiPlus />
              </button>
              <button>
                <FaEllipsisH />
              </button>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Product</th>
                <th>Created Date</th>
                <th>Order</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {categoryData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.product}</td>
                  <td>{item.date}</td>
                  <td>{item.order}</td>

                  <td className="action-icons">
                    <FaEdit />
                    <FaRegTrashAlt />
                  </td>
                </tr>
              ))}
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
    </div>
  );
}

export default Categories;
