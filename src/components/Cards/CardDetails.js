import React from "react";
import { useParams } from "react-router-dom";
import { useDataContext } from "../../context/DataContext";
import "./CardDetails.css";

function CardDetails() {
  const { items } = useDataContext();
  let { id } = useParams();

  console.log(items[id]);

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
            <p>{items[id].title}</p>
            <p>{items[id].description}</p>
            <p>{items[id].contactnumber}</p>
            <p>{items[id].price}</p>
            <p>{items[id].sellername}</p>
          </div>
        </div>
      ) : (
        <div>
          <h3>Loading.. please wait.</h3>
        </div>
      )}
    </div>
  );
}

export default CardDetails;
