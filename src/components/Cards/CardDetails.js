import React from "react";
import { useParams } from "react-router-dom";
import { useDataContext } from "../../context/DataContext";
import "./CardDetails.css";
import "../Sceletons/ContentLoader.css";
import ContentLoader from "../Sceletons/ContentLoader";
function CardDetails() {
  const { items } = useDataContext();
  let { id } = useParams();

  return (
    <div className="carddetails-container">
      {items.length > 0 ? (
        <div className="carddetails-itempage">
          <div className="carddetails-image-container">
            <img
              className="carddetails-image"
              alt="item"
              src={`${items[id].imageurl}`}
            ></img>
          </div>
          <div className="carddetails-description">
            <p>
              <span>Item Name : </span>
              {items[id].title}
            </p>
            <p>
              <span>Description : </span>
              {items[id].description}
            </p>
            <p>
              <span>Price : </span>
              {items[id].price}.00 GEL
            </p>
            <p>
              <span>Seller Number : </span>
              {items[id].contactnumber}
            </p>

            <p>
              <span>Seller Name : </span>
              {items[id].sellername}
            </p>
          </div>
        </div>
      ) : (
        <div className="contentLoader">
          <ContentLoader />
        </div>
      )}
    </div>
  );
}

export default CardDetails;
