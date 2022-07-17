import React, { useState } from "react";
import { useDataContext } from "../../context/DataContext";
import "./Additem.css";
import { useNavigate } from "react-router-dom";

function AddItem() {
  const [itemadded, setItemAdded] = useState(false);
  const navigate = useNavigate();

  const {
    setCategory,
    setContactNumber,
    setDescription,
    setPrice,
    setSellerName,
    setTitle,
    changeHandler,
    setImageUrl,
  } = useDataContext();

  const submitHandler = () => {
    changeHandler();
    setItemAdded(true);
    setTimeout(() => {
      navigate(`/`);
    }, 3000);
  };

  return (
    <>
      {itemadded === false ? (
        <div className="additem-container">
          <h1>Add your Item</h1>
          <form onSubmit={submitHandler} className="additem-form">
            <div className="additem-category">
              <h3>Choose category</h3>
              <select
                className="item-select"
                onChange={(e) => setCategory(e.target.value)}
                name="category"
                id="category"
              >
                <option>Choose Category</option>
                <option value="PC">PC</option>
                <option value="Components">Components</option>
                <option value="Laptops">Laptops</option>
                <option value="Consoles">Consoles</option>
                <option value="Monitors">Monitors</option>
                <option value="Peripherals">Peripherals</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
            <div className="additem-title">
              <h3>Enter title for item</h3>
              <input
                onChange={(e) => setTitle(e.target.value)}
                name="title"
                type="text"
              />
            </div>
            <div className="additem-sellername">
              <h3>Enter your name here</h3>
              <input
                onChange={(e) => setSellerName(e.target.value)}
                name="name"
                type="text"
              />
            </div>
            <div className="additem-phone">
              <h3>Enter your phone number</h3>
              <input
                onChange={(e) => setContactNumber(e.target.value)}
                name="phonenumber"
                type="text"
              />
            </div>
            <div className="additem-price">
              <h3>Enter item price</h3>
              <input
                onChange={(e) => setPrice(e.target.value)}
                name="price"
                type="text"
              />
            </div>
            <div className="additem-image">
              <h3>Enter image url here</h3>
              <input
                onChange={(e) => setImageUrl(e.target.value)}
                name="desc"
                type="text"
              />
            </div>
            <div className="additem-desc">
              <h3>Write item description</h3>
              <input
                onChange={(e) => setDescription(e.target.value)}
                name="desc"
                type="text"
              />
            </div>
            <div className="d-button">
              <button type="Submit" className="d--button">
                Add Item
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="succesfullyadded">
          <h3>Item Added Succesfully</h3>
          <p>You will be redirected to main page in 3 seconds.</p>
        </div>
      )}
    </>
  );
}

export default AddItem;
