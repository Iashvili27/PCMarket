import React from "react";
import { useDataContext } from "../../context/DataContext";
import "./Modal.css";

function Modal(props) {
  const {
    deleteItemFromDatabase,
    itemdeletedsucecsfully,
    setItemDeletedSuccesfully,
  } = useDataContext();

  const submitHandler = () => {
    props.closeModal(false);
    setItemDeletedSuccesfully(false);
  };

  return (
    <div className="modal">
      <div
        onClick={() => props.closeModal(false)}
        className="modalBackground"
      />
      {!itemdeletedsucecsfully ? (
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <button onClick={() => props.closeModal(false)}>X</button>
          </div>
          <div className="title">
            <h3>Are your sure you want to delete item?</h3>
          </div>
          <div className="body">
            <p>Item can't be restored after deletion!</p>
          </div>
          <div className="footer">
            <button onClick={() => props.closeModal(false)}>Cancel</button>
            <button
              onClick={() => {
                deleteItemFromDatabase(props.itemuid);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <button onClick={submitHandler}>X</button>
          </div>
          <div className="title">
            <h3>Item Was Deleted Succesfully.</h3>
          </div>
          <div className="footer">
            <button onClick={submitHandler}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
