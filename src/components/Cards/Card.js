import React from "react";
import ItemData from "../../DATA/ItemData";
import "./Card.css";
import { useDataContext } from "../../context/DataContext";

function Card() {
  const { items } = useDataContext();
  console.log(items);
  return (
    <div className="cardcontainer">
      {items.map((item) => (
        <div className="card" key={item.uuid}>
          <div className="cardimg">
            <img className="image" alt="img" src={item.img} />
          </div>
          <div className="carddsc">
            <div className="cardtxt">
              <p>{item.title}</p>
            </div>
            <div className="cardprice">
              <p>{item.price}.00 GEL</p>
            </div>
          </div>
        </div>
      ))}
    </div>
    // <div className="cardcontainer">
    //   {ItemData.map((item, index) => (
    //     <div className="card" key={index}>
    //       <div className="cardimg">
    //         <img className="image" alt="img" src={item.img} />
    //       </div>
    //       <div className="carddsc">
    //         <div className="cardtxt">
    //           <p>{item.name}</p>
    //         </div>
    //         <div className="cardprice">
    //           <p>{item.price}.00 GEL</p>
    //         </div>
    //       </div>
    //     </div>
    //   ))}
    // </div>
  );
}

export default Card;
