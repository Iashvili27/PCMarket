import React from "react";
import { useDataContext } from "../../context/DataContext";

import { useNavigate } from "react-router-dom";

function ItemAddedModal(props) {
  const { itemAddedSuccesfully, setItemAddedSuccesfully } = useDataContext();
  const navigate = useNavigate();

  const submitHandler = () => {
    props.closeModal(false);
    setItemAddedSuccesfully(false);
    navigate(`/`);
    window.location.reload();
  };

  return (
    <div className="modal">
      <div
        onClick={() => props.closeModal(false)}
        className="modalBackground"
      />
      {itemAddedSuccesfully ? (
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <button onClick={submitHandler}>X</button>
          </div>
          <div className="title">
            <h3>Item Succesfully Added.</h3>
          </div>
          <div className="footer">
            <button onClick={submitHandler}>Ok</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ItemAddedModal;
