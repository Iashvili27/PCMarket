import React from "react";
import UserItems from "../Cards/UserItems";
import "./UserPage.css";
import { Link } from "react-router-dom";

function UserPage() {
  return (
    <div className="userpage-container">
      <div className="userpage-menubox">
        <Link to="/additem">Add Item</Link>
        <h3>My Items</h3>
        <h3>Options</h3>
      </div>
      <div className="userpage-itembox">
        <UserItems />
      </div>
    </div>
  );
}

export default UserPage;
