import React, { useState, useEffect } from "react";
import { useDataContext } from "../../context/DataContext";

import ItemAddedModal from "../Modal/ItemAddedModal";

function AddItem() {
  const [openModal, setOpenModal] = useState(false);

  const {
    setCategory,
    setContactNumber,
    setDescription,
    setPrice,
    setSellerName,
    setTitle,
    changeHandler,
    setImageUpload,
    uploadImage,
    imageuploaddone,
    setImageUploadDone,
    imageurl,
  } = useDataContext();

  const submitHandler = (e) => {
    e.preventDefault();
    changeHandler();
    setOpenModal(true);
  };

  useEffect(() => {
    setImageUploadDone(false);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="additem-container">
      {openModal && <ItemAddedModal closeModal={setOpenModal} />}
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
            className="additem-input"
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            type="text"
          />
        </div>
        <div className="additem-sellername">
          <h3>Enter your name here</h3>
          <input
            className="additem-input"
            onChange={(e) => setSellerName(e.target.value)}
            name="name"
            type="text"
          />
        </div>
        <div className="additem-phone">
          <h3>Enter your phone number</h3>
          <input
            className="additem-input"
            onChange={(e) => setContactNumber(e.target.value)}
            name="phonenumber"
            type="text"
          />
        </div>
        <div className="additem-price">
          <h3>Enter item price</h3>
          <input
            className="additem-input"
            onChange={(e) => setPrice(e.target.value)}
            name="price"
            type="text"
          />
        </div>
        <div className="additem-image">
          <h3>Upload item image</h3>
          {imageuploaddone ? (
            <div>
              <div>
                <img alt="img" className="uploadedimage" src={imageurl}></img>
              </div>
              {imageuploaddone}
            </div>
          ) : null}
          <label>
            <input
              hidden
              className="add-item-image-input"
              onChange={(e) => setImageUpload(e.target.files[0])}
              accept=".png, .jpg, .jpeg"
              name="desc"
              type="file"
            />
          </label>

          <button
            className="upload--button"
            type="button"
            onClick={uploadImage}
          >
            Upload
          </button>
        </div>
        <div className="additem-desc">
          <h3>Write item description</h3>
          <input
            className="additem-input"
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
  );
}

export default AddItem;
