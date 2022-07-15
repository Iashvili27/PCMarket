import React from "react";
import "./Card.css";

import { useDataContext } from "../../context/DataContext";
import { Link } from "react-router-dom";

const Card = ({ page }) => {
  const { items } = useDataContext();
  console.log(items);
  return (
    <div className="cardcontainer">
      {items.map((item, index) => (
        <Link to={`${page}${index}`} className="card" key={item.uuid}>
          <div className="cardimg">
            <img className="image" alt="img" src={item.img} />
          </div>
          <div className="carddsc">
            <div className="cardtxt">
              <p>{item.title}</p>
            </div>
            <div className="cardprice">
              {item.price ? <p>{item.price}.00 GEL</p> : <p>OFFER</p>}
            </div>
          </div>
        </Link>
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
};

export default Card;
