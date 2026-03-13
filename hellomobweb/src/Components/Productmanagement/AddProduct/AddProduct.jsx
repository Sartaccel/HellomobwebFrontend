import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaCalendarAlt, FaImage, FaPen, FaPlus, FaTimes, FaSave } from "react-icons/fa";
import "./AddProduct.css";
import API from "../../../api";

const INITIAL_STATE = {
  name: "", productId: "", description: "", price: "", discountPrice: "",
  tax: "yes", startDate: "", endDate: "", stockQty: "", stockStatus: "INSTOCK",
  featured: true, category: "", tag: "", color: "",
};

const COLORS = ["#b9c8ac", "#d7bcbc", "#b9c3c7", "#e3d9b9", "#4b5154"];

// Helper: convert "2024-06-01T10:30:00" → "2024-06-01T10:30" (for datetime-local input)
const toDatetimeLocal = (val) => {
  if (!val) return "";
  return val.length > 16 ? val.slice(0, 16) : val;
};

function AddProduct() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("edit"); // null if adding, number string if editing
  const textRef = useRef(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const [unlimited, setUnlimited] = useState(true);
  const [images, setImages] = useState([]);         // preview URLs
  const [imageFiles, setImageFiles] = useState([]); // new File objects
  const [existingImages, setExistingImages] = useState([]); // URLs from backend
  const [savingDraft, setSavingDraft] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [product, setProduct] = useState(INITIAL_STATE);
  const [savedDraftId, setSavedDraftId] = useState(null);

  // ─── Load product data when editing ──────────────────────────────────────
  useEffect(() => {
    if (!editId) return;

    const loadProduct = async () => {
      setIsEditMode(true);
      setLoadingProduct(true);
      try {
        // Try sessionStorage first (already fetched in ProductListing)
        const cached = sessionStorage.getItem("editProduct");
        let data = cached ? JSON.parse(cached) : null;

        // Fallback: fetch from backend if not in sessionStorage
        if (!data || String(data.id) !== String(editId)) {
          const res = await API.get(`/products/${editId}`);
          data = res.data.data;
        }

        // Map backend fields → form state
        setProduct({
          name:          data.productName    || "",
          productId:     data.productId      || "",
          description:   data.description    || "",
          price:         data.productPrice   ?? "",
          discountPrice: data.discountPrice  ?? "",
          tax:           data.taxIncluded    ? "yes" : "no",
          startDate:     toDatetimeLocal(data.expirationStartDate),
          endDate:       toDatetimeLocal(data.expirationEndDate),
          stockQty:      data.stockQuantity  ?? "",
          stockStatus:   data.stockStatus    || "INSTOCK",
          featured:      data.featured       ?? true,
          category:      data.category       || "",
          tag:           data.tag            || "",
          color:         data.color          || "",
        });

        setUnlimited(data.unlimitedStock ?? true);

        // Load existing images for preview
        if (data.imageUrls?.length) {
          setExistingImages(data.imageUrls);
        } else if (data.imageUrl) {
          setExistingImages([data.imageUrl]);
        }

        sessionStorage.removeItem("editProduct");
      } catch (err) {
        showToast("error", "Failed to load product for editing");
      } finally {
        setLoadingProduct(false);
      }
    };

    loadProduct();
  }, [editId]);

  useEffect(() => {
    return () => images.forEach((url) => URL.revokeObjectURL(url));
  }, [images]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const showToast = (type, message) => setToast({ type, message });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
    setImageFiles((prev) => [...prev, ...files]);
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(images[index]);
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const validate = () => {
    const e = {};
    if (!product.name.trim()) e.name = "Product name is required";
    if (!product.productId.trim()) e.productId = "Product ID is required";
    if (!product.price || Number(product.price) <= 0) e.price = "Valid price is required";
    if (!product.category) e.category = "Category is required";
    if (!product.stockStatus) e.stockStatus = "Stock status is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const buildFormData = () => {
    const formData = new FormData();
    formData.append("product", JSON.stringify({
      productId:           product.productId,
      name:                product.name,
      description:         product.description,
      price:               Number(product.price),
      discountPrice:       Number(product.discountPrice) || 0,
      taxIncluded:         product.tax === "yes",
      expirationStartDate: product.startDate ? product.startDate + ":00" : null,
      expirationEndDate:   product.endDate   ? product.endDate   + ":00" : null,
      stockQuantity:       unlimited ? null : Number(product.stockQty),
      unlimitedStock:      unlimited,
      stockStatus:         product.stockStatus,
      category:            product.category,
      tag:                 product.tag,
      color:               product.color,
      featured:            product.featured,
    }));
    imageFiles.forEach((file) => formData.append("images", file));
    return formData;
  };

  // ─── Save as Draft ────────────────────────────────────────────────────────
  const handleSaveDraft = async (e) => {
    e.preventDefault();
    setSavingDraft(true);
    try {
      const res = await API.post("/products/draft", buildFormData(), {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const draftId = res.data?.data?.id;
      if (draftId) setSavedDraftId(draftId);
      showToast("success", "Product saved as draft successfully");
    } catch (err) {
      showToast("error", err.response?.data?.message || "Failed to save draft");
    } finally {
      setSavingDraft(false);
    }
  };

  // ─── Update existing product ──────────────────────────────────────────────
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validate()) {
      showToast("error", "Please fix the errors before updating");
      return;
    }
    setPublishing(true);
    try {
      await API.put(`/products/update/${editId}`, buildFormData(), {
        headers: { "Content-Type": "multipart/form-data" },
      });
      showToast("success", "Product updated successfully");
      setTimeout(() => navigate("/products"), 1500);
    } catch (err) {
      showToast("error", err.response?.data?.message || "Failed to update product");
    } finally {
      setPublishing(false);
    }
  };

  // ─── Publish Product ──────────────────────────────────────────────────────
  const handlePublish = async (e) => {
    e.preventDefault();
    if (!validate()) {
      showToast("error", "Please fix the errors before publishing");
      return;
    }
    setPublishing(true);
    try {
      if (savedDraftId) {
        await API.put(`/products/publish/${savedDraftId}`);
      } else {
        await API.post("/products/publish", buildFormData(), {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      showToast("success", "Product published successfully");
      setTimeout(() => navigate("/products"), 1500);
    } catch (err) {
      showToast("error", err.response?.data?.message || "Failed to publish product");
    } finally {
      setPublishing(false);
    }
  };

  const isLoading = savingDraft || publishing || loadingProduct;

  // All images to preview (existing from backend + newly added)
  const allPreviewImages = [
    ...existingImages.map((url) => ({ url, isExisting: true })),
    ...images.map((url) => ({ url, isExisting: false })),
  ];

  return (
    <div className="container-fluid add-product-page">

      {/* Toast Notification */}
      {toast && <div className={`toast-notification ${toast.type}`}>{toast.message}</div>}

      {/* Page Title */}
      <h3 className="page-heading">
        {isEditMode ? "Edit Product" : "Add New Product"}
      </h3>

      {loadingProduct ? (
        <div className="loading-product">Loading product data...</div>
      ) : (

        <div className="row g-3">

          {/* LEFT */}
          <div className="col-lg-6 col-md-12">
            <form className="product-form">
              <h4 className="section-title">Basic Details</h4>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Product Name *</label>
                  <input type="text" className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    name="name" value={product.name} onChange={handleChange}
                    disabled={isLoading} placeholder="Enter Product Name" />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Product ID *</label>
                  <input type="text" className={`form-control ${errors.productId ? "is-invalid" : ""}`}
                    name="productId" value={product.productId} onChange={handleChange}
                    placeholder="Enter Product Id (PRD-001)" disabled={isLoading} />
                  {errors.productId && <div className="invalid-feedback">{errors.productId}</div>}
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label">Product Description</label>
                <div className="textarea-wrapper">
                  <textarea ref={textRef} className="form-control" rows="4"
                    name="description" value={product.description}
                    onChange={handleChange} disabled={isLoading}
                    placeholder="Enter Product Description" />
                  <div className="textarea-icons" onClick={() => textRef.current?.focus()}><FaPen /></div>
                </div>
              </div>

              <h4 className="section-title">Pricing</h4>
              <div className="mb-3">
                <label className="form-label">Product Price *</label>
                <input type="number" className={`form-control ${errors.price ? "is-invalid" : ""}`}
                  name="price" value={product.price} onChange={handleChange}
                  min="0" disabled={isLoading} />
                {errors.price && <div className="invalid-feedback">{errors.price}</div>}
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Discounted Price</label>
                  <input type="number" className="form-control" name="discountPrice"
                    value={product.discountPrice} onChange={handleChange} min="0" disabled={isLoading} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Tax Included</label>
                  <div className="d-flex gap-3 mt-2">
                    <label><input type="radio" name="tax" value="yes" checked={product.tax === "yes"}
                      onChange={handleChange} disabled={isLoading} /> Yes</label>
                    <label><input type="radio" name="tax" value="no" checked={product.tax === "no"}
                      onChange={handleChange} disabled={isLoading} /> No</label>
                  </div>
                </div>
              </div>

              <h5 className="expiration-heading">Expiration</h5>
              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <div className="input-icon"><FaCalendarAlt />
                    <input type="datetime-local" className="form-control" name="startDate"
                      value={product.startDate} onChange={handleChange} disabled={isLoading} />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-icon"><FaCalendarAlt />
                    <input type="datetime-local" className="form-control" name="endDate"
                      value={product.endDate} onChange={handleChange} disabled={isLoading} />
                  </div>
                </div>
              </div>

              <h4 className="section-title">Inventory</h4>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Stock Quantity</label>
                  <input type="number" className="form-control" name="stockQty"
                    disabled={unlimited || isLoading} value={product.stockQty}
                    onChange={handleChange} min="0" />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Stock Status *</label>
                  <select className={`form-select ${errors.stockStatus ? "is-invalid" : ""}`}
                    name="stockStatus" value={product.stockStatus}
                    onChange={handleChange} disabled={isLoading}>
                    <option value="INSTOCK">In Stock</option>
                    <option value="OUTOFSTOCK">Out of Stock</option>
                  </select>
                  {errors.stockStatus && <div className="invalid-feedback">{errors.stockStatus}</div>}
                </div>
              </div>

              <div className="toggle-section">
                <label className="toggle-switch">
                  <input type="checkbox" checked={unlimited}
                    onChange={() => setUnlimited((p) => !p)} disabled={isLoading} />
                  <span className="slider"></span>
                </label>
                <span className="toggle-text">Unlimited Stock</span>
              </div>

              <div className="featured-checkbox">
                <input type="checkbox" checked={product.featured} disabled={isLoading}
                  onChange={() => setProduct((p) => ({ ...p, featured: !p.featured }))} />
                <label>Highlight this product in a featured section.</label>
              </div>

              {savedDraftId && (
                <div className="draft-saved-indicator">
                  ✅ Draft saved — click Publish to make it live
                </div>
              )}

              <div className="form-buttons">
                {isEditMode ? (
                  // Edit mode: show Update button only
                  <button type="button" className="btn btn-success"
                    disabled={isLoading} onClick={handleUpdate}>
                    {publishing ? "Updating..." : "Update Product"}
                  </button>
                ) : (
                  // Add mode: show Save Draft + Publish
                  <>
                    <button type="button" className="btn btn-outline-secondary"
                      disabled={isLoading} onClick={handleSaveDraft}>
                      <FaSave /> {savingDraft ? "Saving..." : "Save to Draft"}
                    </button>
                    <button type="button" className="btn btn-success"
                      disabled={isLoading} onClick={handlePublish}>
                      {publishing ? "Publishing..." : "Publish Product"}
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>

          {/* RIGHT */}
          <div className="col-lg-6 col-md-12">
            <div className="right-panel">
              <h4 className="panel-title">Upload Product Image</h4>
              <label className="label">Product Image</label>
              <div className="preview-box">
                {allPreviewImages.length > 0
                  ? <img src={allPreviewImages[0].url} alt="preview" />
                  : <div className="empty-preview"><FaImage /></div>}
                <div className="preview-buttons">
                  <label className="btn-browse">
                    <FaImage /> Browse
                    <input type="file" hidden multiple accept="image/*"
                      onChange={handleUpload} disabled={isLoading} />
                  </label>
                </div>
              </div>

              <div className="thumb-row">
                {allPreviewImages.map((img, i) => (
                  <div className="thumb" key={i}>
                    <img src={img.url} alt={`thumb-${i}`} />
                    <button type="button" className="remove"
                      onClick={() => img.isExisting ? removeExistingImage(i) : removeImage(i - existingImages.length)}
                      disabled={isLoading}>
                      <FaTimes />
                    </button>
                  </div>
                ))}
                <label className="add-box">
                  <FaPlus /><span>Add Image</span>
                  <input type="file" hidden multiple accept="image/*"
                    onChange={handleUpload} disabled={isLoading} />
                </label>
              </div>

              <h4 className="panel-subtitle">Categories</h4>
              <label className="label">Product Category *</label>
              <select className={`form-select ${errors.category ? "is-invalid" : ""}`}
                name="category" value={product.category}
                onChange={handleChange} disabled={isLoading}>
                <option value="">Select category</option>
                <option value="MOBILES">Mobiles</option>
                <option value="GIFT">Gift</option>
                <option value="ACCESSORIES">Accessories</option>
                <option value="SPEAKER">Speaker</option>
                <option value="WATCHES">Watches</option>
                <option value="PERFUME">Perfume</option>
                <option value="CLOCK">Clock</option>
                <option value="SWEET_NUTS">Sweet Nuts</option>
                <option value="CAMERA">Camera</option>
              </select>
              {errors.category && <div className="invalid-feedback d-block">{errors.category}</div>}

              <label className="label mt-3">Product Tag</label>
              <select className="form-select" name="tag" value={product.tag}
                onChange={handleChange} disabled={isLoading}>
                <option value="">Select tag</option>
                <option value="NEW">New</option>
                <option value="TRENDING">Trending</option>
                <option value="SALES">Sales</option>
              </select>

              <label className="label mt-3">Select Color</label>
              <div className="color-row">
                {COLORS.map((c, i) => (
                  <div key={i}
                    className={`color-box ${product.color === c ? "active" : ""}`}
                    style={{ background: c }}
                    onClick={() => !isLoading && setProduct((p) => ({ ...p, color: c }))}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

export default AddProduct;