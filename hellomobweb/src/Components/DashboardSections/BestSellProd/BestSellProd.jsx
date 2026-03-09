import React from "react";
import { FaFilter } from "react-icons/fa";
import "./BestSellProd.css";

const products = [
  {
    name: "Apple iPhone 13",
    img: "https://dummyimage.com/40x40/ddd/000&text=P",
    order: 104,
    status: "Stock",
    price: "₹999.00"
  },
  {
    name: "Nike Air Jordan",
    img: "https://dummyimage.com/40x40/ddd/000&text=S",
    order: 56,
    status: "Stock out",
    price: "₹999.00"
  },
  {
    name: "T-shirt",
    img: "https://dummyimage.com/40x40/ddd/000&text=T",
    order: 266,
    status: "Stock",
    price: "₹999.00"
  },
  {
    name: "Cross Bag",
    img: "https://dummyimage.com/40x40/ddd/000&text=B",
    order: 506,
    status: "Stock",
    price: "₹999.00"
  }
];

function BestSellProd() {
  return (
   <div className="best-card">

  <div className="best-header">
    <h4>Best selling product</h4>

    <button className="filter-btn">
      Filter <FaFilter/>
    </button>
  </div>

  {/* SCROLL WRAPPER */}
  <div className="best-scroll">

    <div className="best-table">

      <div className="best-table-head">
        <span>PRODUCT</span>
        <span>TOTAL ORDER</span>
        <span>STATUS</span>
        <span>PRICE</span>
      </div>

      {products.map((item,i)=>(
        <div className="best-row" key={i}>

          <div className="prod">
            <img src={item.img} alt="" />
            <span>{item.name}</span>
          </div>

          <span>{item.order}</span>

          <span className={`status ${item.status==="Stock"?"in":"out"}`}>
            <span className="dot"></span>
            {item.status}
          </span>

          <span className="price">{item.price}</span>

        </div>
      ))}

    </div>

  </div>

  <div className="best-footer">
    <button className="details-btn">Details</button>
  </div>

</div>
  );
}

export default BestSellProd;