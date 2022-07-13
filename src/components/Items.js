import React from "react";
import ItemData from "../DATA/ItemData";
import "./Items.css";

function Items() {
  return (
    <div>
      {ItemData.map((item, index) => (
        <div key={index}>
          <p>{item.name}</p>
          <img className="image" alt="img" src={item.img} />
        </div>
      ))}
    </div>
  );
}

export default Items;
