import { AiOutlinePlusCircle } from "react-icons/ai";

import "./AddnewProd.css";
import { useState } from "react";

const categories = [
  { name: "Electronic", img: "https://dummyimage.com/40x40/ddd/000&text=E" },
  { name: "Fashion", img: "https://dummyimage.com/40x40/ddd/000&text=F" },
  { name: "Home", img: "https://dummyimage.com/40x40/ddd/000&text=H" },
  { name: "Sports", img: "https://dummyimage.com/40x40/ddd/000&text=S" },
  { name: "Beauty", img: "https://dummyimage.com/40x40/ddd/000&text=B" },
  { name: "Books", img: "https://dummyimage.com/40x40/ddd/000&text=BK" }
];


const products = [
  {
    name: "Smart Fitness Tracker",
    price: "$39.99",
    img: "https://dummyimage.com/40x40/ddd/000&text=F"
  },
  {
    name: "Leather Wallet",
    price: "$19.99",
    img: "https://dummyimage.com/40x40/ddd/000&text=W"
  },
  {
    name: "Electric Hair Trimmer",
    price: "$34.99",
    img: "https://dummyimage.com/40x40/ddd/000&text=T"
  },
  {
    name: "Bluetooth Speaker",
    price: "$49.99",
    img: "https://dummyimage.com/40x40/ddd/000&text=S"
  },
  {
    name: "Wireless Mouse",
    price: "$15.99",
    img: "https://dummyimage.com/40x40/ddd/000&text=M"
  },
  {
    name: "Gaming Headset",
    price: "$59.99",
    img: "https://dummyimage.com/40x40/ddd/000&text=H"
  }
];

function AddnewProd() {
 const [showAll, setShowAll] = useState(false);

  const visibleCategories = showAll ? categories : categories.slice(0,3);

  const [showAllProducts, setShowAllProducts] = useState(false);

  const visibleProducts = showAllProducts
    ? products
    : products.slice(0, 3);

  return (
    <div className="add-card">
      <div className="add-header">
        <h4>Add New Product</h4>
        <span className="add-link">
          <AiOutlinePlusCircle />
          Add New
        </span>
      </div>

      <p className="section-title">Categories</p>

      {visibleCategories.map((item, i) => (
        <div className="cat-row" key={i}>
          <img src={item.img} alt="" />
          <span>{item.name}</span>
          <span className="arrow">›</span>
        </div>
      ))}

      <p
        className="see-more"
        onClick={() => setShowAll(!showAll)}
      >
        {showAll ? "See less" : "See more"}
      </p>

      <p className="section-title">Product</p>

      {visibleProducts.map((item, i) => (
        <div className="prod-row" key={i}>
          <div>
            <span>{item.name}</span>
            <p>{item.price}</p>
          </div>
          <button className="add-btn">
            <AiOutlinePlusCircle />
            Add
          </button>
        </div>
      ))}

      <p className="see-more" onClick={()=>setShowAllProducts(!showAllProducts)}>{showAllProducts?"See less":"See more"}</p>
    </div>
  );
}

export default AddnewProd;
