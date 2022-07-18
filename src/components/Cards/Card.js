import React, { useState } from "react";
import "./Card.css";
import { useDataContext } from "../../context/DataContext";
import { useSearchContext } from "../../context/SearchContext";
import { Link } from "react-router-dom";

const Card = ({ page }) => {
  const { items } = useDataContext();
  const { search, category } = useSearchContext();
  const IsLoading = useState(false);
  return (
    <div className="cardfragment">
      {category ? <h3>{category}</h3> : null}
      <div className="cardcontainer">
        {items
          .filter((item) => {
            if (!category && !search) {
              return item;
            } else if (item.category === category) {
              return item;
            } else if (
              !category &&
              item.title.toLowerCase().includes(search.toLowerCase())
            ) {
              return item;
            } else if (category === item.category && search) {
              return item;
            } else {
              return null;
            }
            // else if (search === "") {
            //   return item;
            // } else if (item.title.toLowerCase().includes(search.toLowerCase())) {
            //   return item;
            // } else return null;
          })
          .map((item, index) => (
            <Link to={`${page}${index}`} className="card" key={item.uuid}>
              <div className="cardimg">
                <img
                  className="card-image"
                  alt="img"
                  src={`${item.imageurl}`}
                />
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
    </div>
  );
};

export default Card;
