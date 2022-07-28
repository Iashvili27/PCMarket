import React from "react";

import { Link, Outlet } from "react-router-dom";

function UserPage() {
  return (
    <div className="userpage-container">
      <div className="userpage-menubox">
        <Link className="userpage-link" to="/additem">
          Add Item
        </Link>
        <Link className="userpage-link" to="/myproducts">
          My Items
        </Link>
        <Link className="userpage-link" to="/options">
          Options
        </Link>
      </div>
      <div className="userpage-itembox">
        <Outlet />
      </div>
    </div>
  );
}

export default UserPage;
