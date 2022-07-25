import React from "react";
import "./Card.css";
import { useDataContext } from "../../context/DataContext";
import { useSearchContext } from "../../context/SearchContext";
import { Link } from "react-router-dom";
import CardLoader from "../Sceletons/CardLoader";
import MyImage from "../../Assets/DefaultImage.png";

const Card = ({ page }) => {
  const { items, addViewsToDatabase } = useDataContext();
  const { search, category } = useSearchContext();
  console.log(items);
  return (
    <div className="cardfragment">
      {category ? <h3>{category}</h3> : null}
      {items.length > 0 ? (
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
              <Link
                onClick={() => addViewsToDatabase(item.uuid, item.views)}
                to={`${page}${item.uuid}`}
                className="card"
                key={item.uuid}
              >
                <div className="cardtitle">
                  <p>{item.title}</p>
                </div>
                <div className="cardimg">
                  {item.imageurl ? (
                    <img
                      className="card-image"
                      alt="img"
                      src={`${item.imageurl}`}
                    />
                  ) : (
                    <img className="card-image" alt="img" src={MyImage} />
                  )}
                </div>

                <div className="carddesc">
                  <div className="cardprice">
                    {item.price ? <p>{item.price} GEL</p> : <p>OFFER</p>}
                  </div>
                  <div className="cardviews">
                    <p>{item.views} Views</p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      ) : (
        <div>
          <CardLoader />
        </div>
      )}
    </div>
  );
};

export default Card;
