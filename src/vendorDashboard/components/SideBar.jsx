import React from 'react'

const SideBar = ({
  showFirmHandler,
  showProductHandler,
  showAllProductsHandler,
  showFirmTitle
}) => {
  return (
    <>
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <ul className="sidebar-links">
          <li>
            <span>Vendor</span>
          </li>
          {showFirmTitle ?  <li>
            <span onClick={showFirmHandler}>Add Firm</span>
          </li>  :  " "}
          
          <li>
            <span onClick={showProductHandler}>Add Product</span>
          </li>
          <li>
            <span onClick={showAllProductsHandler}>All Products</span>
          </li>
          <li>
            <span>User Details</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SideBar