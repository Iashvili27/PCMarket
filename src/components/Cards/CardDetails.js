import React from "react";
import { useParams } from "react-router-dom";
import { useDataContext } from "../../context/DataContext";
import "./CardDetails.css";
import "../Sceletons/ContentLoader.css";
import ContentLoader from "../Sceletons/ContentLoader";
function CardDetails() {
  const { items } = useDataContext();
  let { id } = useParams();

  const filterItems = items.filter((item) => item.uuid === id);

  return (
    <div className="carddetails-container">
      {items.length > 0 ? (
        <div className="carddetails-itempage">
          <div className="carddetails-image-container">
            <img
              className="carddetails-image"
              alt="item"
              src={`${filterItems[0].imageurl}`}
            ></img>
          </div>
          <div className="carddetails-description">
            <p>
              <span>Item Name : </span>
              {filterItems[0].title}
            </p>
            <p>
              <span>Description : </span>
              {filterItems[0].description}
            </p>
            <p>
              <span>Price : </span>
              {filterItems[0].price}.00 GEL
            </p>
            <p>
              <span>Seller Number : </span>
              {filterItems[0].contactnumber}
            </p>

            <p>
              <span>Seller Name : </span>
              {filterItems[0].sellername}
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
