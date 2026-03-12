import { useState, useEffect } from "react";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import "./ProductListing.css";
import API from "../../../api";

function ProductListing() {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 10;

  // Toast auto close
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const showToast = (type, message) => {
    setToast({ type, message });
  };

  // Fetch products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await API.get("/products/all");
      setProducts(res.data.data || []);
    } catch (error) {
      showToast("error", "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    try {
      await API.delete(`/products/delete/${id}`);

      setProducts((prev) => prev.filter((p) => p.id !== id));

      showToast("success", "Product deleted successfully");
    } catch (error) {
      showToast("error", "Failed to delete product");
    } finally {
      setConfirmDelete(null);
    }
  };

  // Edit product - fetch fresh data by ID using GET /products/{id}
  const handleEdit = async (product) => {
    try {
      const res = await API.get(`/products/${product.id}`);
      const freshProduct = res.data.data;
      sessionStorage.setItem("editProduct", JSON.stringify(freshProduct));
      navigate(`/addproduct?edit=${product.id}`);
    } catch (error) {
      showToast("error", "Failed to load product details");
    }
  };

  // Publish product
  const handlePublish = async (id) => {
    try {
      await API.put(`/products/publish/${id}`);

      setProducts((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, status: "PUBLISHED" } : p
        )
      );

      showToast("success", "Product published successfully");
    } catch (error) {
      showToast("error", "Failed to publish product");
    }
  };

  // Search filter
  const filteredProducts = products.filter((p) => {
    const q = search.toLowerCase();

    return (
      (p.productName || "").toLowerCase().includes(q) ||
      (p.productId || "").toLowerCase().includes(q) ||
      (p.category || "").toLowerCase().includes(q)
    );
  });

  // Pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const currentRows = filteredProducts.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredProducts.length / rowsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  return (
    <section className="product-page">

      {/* Toast Notification */}
      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.message}
        </div>
      )}

      {/* Delete Confirmation */}
      {confirmDelete && (
        <div className="confirm-overlay">

          <div className="confirm-box">

            <h4>Delete Product</h4>

            <p>
              Are you sure you want to delete
              <strong> {confirmDelete.productName} </strong>?
            </p>

            <div className="confirm-buttons">

              <button
                className="cancel-btn"
                onClick={() => setConfirmDelete(null)}
              >
                Cancel
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDelete(confirmDelete.id)}
              >
                Delete
              </button>

            </div>

          </div>

        </div>
      )}

      {/* HEADER */}
      <div className="table-header">

        <h3>Product Details</h3>

        <button
          className="add-btn"
          onClick={() => navigate("/addproduct")}
        >
          <FaPlus /> Add New Product
        </button>

      </div>

      {/* SEARCH */}
      <div className="search-bar">

        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)} 
        />

      </div>

      {/* TABLE */}
      <div className="table-card">

        {loading ? (
          <div className="loading">Loading products...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="empty">No products found</div>
        ) : (

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
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {currentRows.map((product, index) => (

                <tr key={product.id}>

                  <td>{indexOfFirstRow + index + 1}</td>

                  <td>
                    <img
                      src={
                        product.imageUrl ||
                        `https://picsum.photos/40?random=${product.id}`
                      }
                      alt={product.productName}
                      className="product-img"
                    />
                  </td>

                  <td>{product.productId}</td>

                  <td>{product.productName}</td>

                  <td>₹{product.productPrice}</td>

                  <td>
                    <span
                      className={
                        product.stockStatus === "INSTOCK"
                          ? "stock instock"
                          : "stock out"
                      }
                    >
                      {product.stockStatus === "INSTOCK"
                        ? "In Stock"
                        : "Out of Stock"}
                    </span>
                  </td>

                  <td>{product.category}</td>

                  <td>
                    <span
                      className={
                        product.status === "PUBLISHED"
                          ? "status published"
                          : "status draft"
                      }
                    >
                      {product.status}
                    </span>
                  </td>

                  <td className="actions">

                    <FaEdit
                      className="edit"
                      onClick={() => handleEdit(product)}
                    />

                    <FaTrash
                      className="delete"
                      onClick={() => setConfirmDelete(product)}
                    />

                    {product.status === "DRAFT" && (
                      <button
                        className="publish-btn"
                        onClick={() => handlePublish(product.id)}
                      >
                        Publish
                      </button>
                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

      {/* PAGINATION */}

      {totalPages > 1 && (

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

      )}

    </section>
  );
}

export default ProductListing;