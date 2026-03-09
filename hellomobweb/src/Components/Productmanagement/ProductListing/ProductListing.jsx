import { useState } from "react";
import { MdKeyboardDoubleArrowLeft,MdKeyboardDoubleArrowRight } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaEllipsisV, FaPlus, FaSearch } from "react-icons/fa";
import "./ProductListing.css";

function ProductListing() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [products, setProducts] = useState([
    {
      id: 1,
      productId: "#8874",
      name: "Apple iPhone 13",
      price: 999,
      stockStatus: "In Stock",
      category: "Mobile",
      image: "https://picsum.photos/40?random=1",
    },
    {
      id: 2,
      productId: "#8875",
      name: "Nike Air Jordan",
      price: 299,
      stockStatus: "In Stock",
      category: "Fashion",
      image: "https://picsum.photos/40?random=2",
    },
    {
      id: 3,
      productId: "#8876",
      name: "Smart Watch",
      price: 199,
      stockStatus: "Out of Stock",
      category: "Electronics",
      image: "https://picsum.photos/40?random=3",
    },
    {
      id: 4,
      productId: "#8877",
      name: "Bluetooth Speaker",
      price: 89,
      stockStatus: "In Stock",
      category: "Electronics",
      image: "https://picsum.photos/40?random=4",
    },
    {
      id: 5,
      productId: "#8874",
      name: "Gaming Mouse",
      price: 49,
      stockStatus: "In Stock",
      category: "Accessories",
      image: "https://picsum.photos/40?random=5",
    },
    {
      id: 6,
      productId: "#8874",
      name: "Laptop Backpack",
      price: 59,
      stockStatus: "In Stock",
      category: "Bags",
      image: "https://picsum.photos/40?random=6",
    },
    {
      id: 7,
      productId: "#8874",
      name: "Leather Wallet",
      price: 39,
      stockStatus: "In Stock",
      category: "Fashion",
      image: "https://picsum.photos/40?random=7",
    },
    {
      id: 8,
      productId: "#8874",
      name: "Wireless Earbuds",
      price: 129,
      stockStatus: "Out of Stock",
      category: "Electronics",
      image: "https://picsum.photos/40?random=8",
    },
    {
      id: 9,
      productId: "#8874",
      name: "Fitness Tracker",
      price: 79,
      stockStatus: "In Stock",
      category: "Wearables",
      image: "https://picsum.photos/40?random=9",
    },
    {
      id: 10,
      productId: "#8874",
      name: "Portable Power Bank",
      price: 45,
      stockStatus: "In Stock",
      category: "Accessories",
      image: "https://picsum.photos/40?random=10",
    },
    {
      id: 11,
      productId: "#8874",
      name: "Apple iPhone 13",
      price: 999,
      stockStatus: "In Stock",
      category: "Mobile",
      image: "https://picsum.photos/40?random=1",
    },
    {
      id: 12,
      productId: "#8875",
      name: "Nike Air Jordan",
      price: 299,
      stockStatus: "In Stock",
      category: "Fashion",
      image: "https://picsum.photos/40?random=2",
    },
    {
      id: 13,
      productId: "#8876",
      name: "Smart Watch",
      price: 199,
      stockStatus: "Out of Stock",
      category: "Electronics",
      image: "https://picsum.photos/40?random=3",
    },
    {
      id: 14,
      productId: "#8877",
      name: "Bluetooth Speaker",
      price: 89,
      stockStatus: "In Stock",
      category: "Electronics",
      image: "https://picsum.photos/40?random=4",
    },
    {
      id: 15,
      productId: "#8874",
      name: "Gaming Mouse",
      price: 49,
      stockStatus: "In Stock",
      category: "Accessories",
      image: "https://picsum.photos/40?random=5",
    },
    {
      id: 16,
      productId: "#8874",
      name: "Laptop Backpack",
      price: 59,
      stockStatus: "In Stock",
      category: "Bags",
      image: "https://picsum.photos/40?random=6",
    },
    {
      id: 17,
      productId: "#8874",
      name: "Leather Wallet",
      price: 39,
      stockStatus: "In Stock",
      category: "Fashion",
      image: "https://picsum.photos/40?random=7",
    },
    {
      id: 18,
      productId: "#8874",
      name: "Wireless Earbuds",
      price: 129,
      stockStatus: "Out of Stock",
      category: "Electronics",
      image: "https://picsum.photos/40?random=8",
    },
    {
      id: 19,
      productId: "#8874",
      name: "Fitness Tracker",
      price: 79,
      stockStatus: "In Stock",
      category: "Wearables",
      image: "https://picsum.photos/40?random=9",
    },
    {
      id: 20,
      productId: "#8874",
      name: "Portable Power Bank",
      price: 45,
      stockStatus: "In Stock",
      category: "Accessories",
      image: "https://picsum.photos/40?random=10",
    }
  ]);

  // Delete product
  const handleDelete = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);

    setProducts(updatedProducts);
  };

  // Edit product

    const handleEdit = (product) => {
        localStorage.setItem("editProduct", JSON.stringify(product));
        navigate("/addproduct");
    };
  // Search filter
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.productId.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase()),
  );


  // Pagination
const [currentPage, setCurrentPage] = useState(1);
const rowsPerPage = 10;

const indexOfLastRow = currentPage * rowsPerPage;
const indexOfFirstRow = indexOfLastRow - rowsPerPage;

const currentRows = filteredProducts.slice(
  indexOfFirstRow,
  indexOfLastRow
);

const totalPages = Math.ceil(filteredProducts.length / rowsPerPage);

  return (
    <section className="product-page">
      {/* HEADER */}
      <div className="table-header">
        <h4>Product Details</h4>

        <button className="add-btn" onClick={() => navigate("/addproduct")}>
          <FaPlus /> Add New Product
        </button>
      </div>

      {/* SEARCH BAR */}

      <div className="search-bar">
        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search by product name or ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}

      <div className="table-card">
        <div className="table-scroll">
          <table className="product-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Stock Status</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {currentRows.map((product, index) => (
                <tr key={index}>
                  <td>{ indexOfFirstRow+index + 1}</td>

                  <td>
                    <img src={product.image} alt="" className="product-img" />
                  </td>

                  <td className="product-id">{product.productId}</td>

                  <td>{product.name}</td>

                  <td>₹{product.price}</td>

                  <td className="stock">{product.stockStatus}</td>

                  <td>{product.category}</td>

                  <td className="actions">
                    <FaEdit
                      className="edit"
                      onClick={() => handleEdit(product)}
                    />

                    <FaTrash
                      className="delete"
                      onClick={() => handleDelete(indexOfFirstRow+index)}
                    />

                    <FaEllipsisV className="more" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
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
    </section>
  );
}

export default ProductListing;
