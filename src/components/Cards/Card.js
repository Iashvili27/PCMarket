import React from "react";
import ItemData from "../../DATA/ItemData";
import "./Card.css";

function Card() {
  return (
    <div className="cardcontainer">
      {ItemData.map((item, index) => (
        <div className="card" key={index}>
          <div className="cardimg">
            <img className="image" alt="img" src={item.img} />
          </div>
          <div className="carddsc">
            <div className="cardtxt">
              <p>{item.name}</p>
            </div>
            <div className="cardprice">
              <p>{item.price}.00 GEL</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;
