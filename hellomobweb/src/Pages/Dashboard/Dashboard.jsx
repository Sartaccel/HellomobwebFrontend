import React from "react";
import DashboardKpis from "../../Components/DashboardSections/DashboardKpis/DashboardKpis";
import WeekReport from "../../Components/DashboardSections/WeekReport/WeekReport";
import TopProducts from "../../Components/DashboardSections/TopProducts/TopProducts";
import Transaction from "../../Components/DashboardSections/Transaction/Transaction";
import BestSellProd from "../../Components/DashboardSections/BestSellProd/BestSellProd";
import AddnewProd from "../../Components/DashboardSections/AddnewProd/AddnewProd";

function Dashboard() {
  return (
    <>

      {/* KPI Cards */}
      <DashboardKpis />

      {/* Chart + Top Products */}
      <div className="row g-4 mt-3">

        <div className="col-xl-8 col-lg-7 col-md-12">
          <WeekReport />
        </div>

        <div className="col-xl-4 col-lg-5 col-md-12">
          <TopProducts />
        </div>

      </div>

      {/* Transaction Table */}
      <Transaction />
     <div className="row g-4 my-3">

  <div className="col-xl-8 col-lg-7 col-md-12">
    <BestSellProd/>
  </div>

  <div className="col-xl-4 col-lg-5 col-md-12">
    <AddnewProd/>
  </div>

</div>
    </>
  );
}

export default Dashboard;