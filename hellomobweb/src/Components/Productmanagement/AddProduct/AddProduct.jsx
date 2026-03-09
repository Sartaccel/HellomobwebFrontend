import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaCalendarAlt,
  FaImage,
  FaPen,
  FaPlus,
  FaSave,
  FaSyncAlt,
  FaTimes,
} from "react-icons/fa"; // icons

import "./AddProduct.css"; // CSS file

function AddProduct() {
  // used to navigate to another page
  const navigate = useNavigate();

  // reference for textarea (used to focus when edit icon clicked)
  const textRef = useRef(null);

  // focus textarea when pen icon clicked
  const handleEdit = () => {
    textRef.current.focus();
  };

  // toggle state for unlimited stock
  const [unlimited, setUnlimited] = useState(true);

  // =========================
  // FORM SUBMIT FUNCTION
  // =========================
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page refresh

    // combine product data with images
    const finalProduct = {
      ...product,
      images,
    };

    console.log(finalProduct); // check product in console

    // get existing products from localStorage
    const existing = JSON.parse(localStorage.getItem("products")) || [];

    // save new product along with existing products
    localStorage.setItem(
      "products",
      JSON.stringify([...existing, finalProduct]),
    );

    // redirect to products page
    navigate("/products");
  };

  // =========================
  // IMAGE STATES
  // =========================

  // store uploaded images
  const [images, setImages] = useState([]);

  // store selected color
  const [selectedColor, setSelectedColor] = useState(null);

  // =========================
  // PRODUCT STATE
  // =========================

  // object to store all product details
  const [product, setProduct] = useState({
    name: "",
    productId: "",
    description: "",
    price: "",
    discountPrice: "",
    tax: "yes",
    startDate: "",
    endDate: "",
    stockQty: "",
    stockStatus: "In Stock",
    featured: true,
    category: "",
    tag: "",
    color: "",
    images: [],
  });

  // =========================
  // IMAGE UPLOAD FUNCTION
  // =========================
  const handleUpload = (e) => {
    // convert file list to array
    const files = Array.from(e.target.files);

    // create preview URLs
    const urls = files.map((file) => URL.createObjectURL(file));

    // update images state
    setImages([...images, ...urls]);

    // also store images in product object
    setProduct({
      ...product,
      images: [...images, ...urls],
    });
  };

  // =========================
  // REMOVE IMAGE FUNCTION
  // =========================
  const removeImage = (index) => {
    // remove selected image from array
    setImages(images.filter((_, i) => i !== index));
  };

  // =========================
  // HANDLE INPUT CHANGES
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    // update product state dynamically
    setProduct({
      ...product,
      [name]: value,
    });
  };

  // =========================
  // LOAD EDIT PRODUCT DATA
  // =========================
  useEffect(() => {
    // get product data stored for editing
    const editData = JSON.parse(localStorage.getItem("editProduct"));

    // if edit data exists, fill the form
    if (editData) {
      setProduct(editData);
      setImages(editData.images || []);
    }
    // clear edit data after loading
    localStorage.removeItem("editProduct");
  }, []);

  // =========================
  // AVAILABLE COLORS
  // =========================
  const colors = ["#b9c8ac", "#d7bcbc", "#b9c3c7", "#e3d9b9", "#4b5154"];

  return (
    <div className="container-fluid add-product-page">
      <div className="row g-3">
        {/* *******************************************************
                    LEFT SIDE 
********************************************************* */}
        <div className="col-lg-6 col-md-12">
          <form className="product-form" onSubmit={handleSubmit}>
            {/* BASIC DETAILS */}
            <h4 className="section-title">Basic Details</h4>

            <div className="row">
              {/* Product Name */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                />
              </div>

              {/* Product ID */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Product ID</label>
                <input
                  type="text"
                  className="form-control"
                  name="productId"
                  value={product.productId}
                  onChange={handleChange}
                  placeholder="Enter product ID"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label">Product Description</label>

              <div className="textarea-wrapper">
                <textarea
                  ref={textRef}
                  className="form-control"
                  rows="4"
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  placeholder="Enter product description"
                />

                <div className="textarea-icons" onClick={handleEdit}>
                  <FaPen />
                </div>
              </div>
            </div>

            {/* PRICING */}
            <h4 className="section-title">Pricing</h4>

            <div className="mb-3">
              <label className="form-label">Product Price</label>
              <input
                type="number"
                className="form-control"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="₹"
              />{" "}
            </div>

            <div className="row mb-3">
              <div className="col-md-6 mb-3">
                <label className="form-label">Discounted Price</label>
                <input type="number" className="form-control" placeholder="₹" />
              </div>

              <div className="col-md-6">
                <label className="form-label">Tax Included</label>

                <div className="d-flex gap-3 mt-2">
                  <label>
                    <input type="radio" name="tax" defaultChecked /> Yes
                  </label>
                  <label>
                    <input type="radio" name="tax" /> No
                  </label>
                </div>
              </div>
            </div>

            {/* EXPIRATION */}

            <h5 className="expiration-heading">Expiration</h5>

            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <div className="input-icon">
                  <FaCalendarAlt />
                  <input
                    type="text"
                    placeholder="Start"
                    className="form-control"
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="input-icon">
                  <FaCalendarAlt />
                  <input
                    type="text"
                    placeholder="End"
                    className="form-control"
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                  />
                </div>
              </div>
            </div>
            {/* INVENTORY */}

            <h4 className="section-title">Inventory</h4>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Stock Quantity</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Unlimited"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Stock Status</label>

                <select className="form-select">
                  <option>In Stock</option>
                  <option>Out of Stock</option>
                </select>
              </div>
            </div>

            {/* TOGGLE */}

            <div className="toggle-section">
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={unlimited}
                  onChange={() => setUnlimited(!unlimited)}
                />
                <span className="slider"></span>
              </label>

              <span className="toggle-text">Unlimited</span>
            </div>

            {/* FEATURED CHECKBOX */}

            <div className="featured-checkbox">
              <input type="checkbox" defaultChecked />

              <label>Highlight this product in a featured section.</label>
            </div>

            {/* BUTTONS */}

            <div className="form-buttons">
              <button type="button" className="btn btn-outline-secondary">
                <FaSave /> Save to draft
              </button>

              <button type="submit" className="btn btn-success">
                Publish Product
              </button>
            </div>
          </form>
        </div>

        {/* *********************************************************************
            RIGHT SIDE IMAGE UPLOAD AND CATEGORIES
************************************************************************/}
        <div className="col-lg-6 col-md-12">
          <div className="right-panel">
            <h4 className="panel-title">Upload Product Image</h4>

            <label className="label">Product Image</label>

            <div className="preview-box">
              {images.length > 0 ? (
                <img src={images[0]} alt="preview" />
              ) : (
                <div className="empty-preview">
                  <FaImage />
                </div>
              )}

              <div className="preview-buttons">
                <label className="btn-browse">
                  <FaImage /> Browse
                  <input type="file" hidden multiple onChange={handleUpload} />
                </label>

                <button className="btn-replace">
                  <FaSyncAlt /> Replace
                </button>
              </div>
            </div>

            {/* thumbnails */}

            <div className="thumb-row">
              {images.map((img, index) => (
                <div className="thumb" key={index}>
                  <img src={img} alt="" />
                  <button className="remove" onClick={() => removeImage(index)}>
                    <FaTimes />
                  </button>
                </div>
              ))}

              <label className="add-box">
                <FaPlus />
                <span>Add Image</span>
                <input type="file" hidden multiple onChange={handleUpload} />
              </label>
            </div>

            {/* categories */}

            <h4 className="panel-subtitle">Categories</h4>

            <label className="label">Product Categories</label>
            <select
              className="form-select"
              name="category"
              value={product.category}
              onChange={handleChange}
            >
              <option>Select your product</option>
              <option>Mobile</option>
              <option>Laptop</option>
              <option>Accessories</option>
            </select>

            <label className="label">Product Tag</label>
            <select className="form-select">
              <option>Select your product</option>
              <option>New</option>
              <option>Trending</option>
              <option>Sale</option>
            </select>

            <label className="label">Select your color</label>

            <div className="color-row">
              {colors.map((c, index) => (
                <div
                  key={index}
                  className={`color-box ${selectedColor === c ? "active" : ""}`}
                  style={{ background: c }}
                  onClick={() => {
                    setSelectedColor(c);

                    setProduct({
                      ...product,
                      color: c,
                    });
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
