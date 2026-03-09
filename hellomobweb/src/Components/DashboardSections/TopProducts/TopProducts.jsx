import React from "react";
import { FaSearch } from "react-icons/fa";
import "./TopProducts.css";

const products = [
  {
    id: 1,
    name: "Apple iPhone 13",
    item: "FXZ-4567",
    price: "$999.00",
    image: "https://dummyimage.com/60x60/ddd/000&text=Phone"
  },
  {
    id: 2,
    name: "Nike Air Jordan",
    item: "FXZ-4567",
    price: "$72.40",
    image: "https://dummyimage.com/60x60/ddd/000&text=Shoes"
  },
  {
    id: 3,
    name: "T-shirt",
    item: "FXZ-4567",
    price: "$35.40",
    image: "https://dummyimage.com/60x60/ddd/000&text=Tshirt"
  },
  {
    id: 4,
    name: "Assorted Cross Bag",
    item: "FXZ-4567",
    price: "$80.00",
    image: "https://dummyimage.com/60x60/ddd/000&text=Bag"
  }
];

function TopProducts() {
  return (
    <div className="top-products-card">

      {/* Header */}
      <div className="products-header">
        <h4>Top Products</h4>
        <a href="#">All product</a>
      </div>

      {/* Search */}
      <div className="search-box">
        <FaSearch />
        <input type="text" placeholder="Search" />
      </div>

      {/* Product List */}
      <div className="product-list">

        {products.map((product) => (
          <div className="product-item" key={product.id}>

            <img src={product.image} alt={product.name} />

            <div className="product-info">
              <h5>{product.name}</h5>
              <span>Item: #{product.item}</span>
            </div>

            <div className="product-price">
              {product.price}
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default TopProducts;