import React, { useState, useEffect } from "react";
import { useDataContext } from "../../context/DataContext";
import { useSearchContext } from "../../context/SearchContext";
import { Link } from "react-router-dom";
import CardLoader from "../Sceletons/CardLoader";
import MyImage from "../../Assets/DefaultImage.png";

const Card = ({ page }) => {
  const { items, addViewsToDatabase } = useDataContext();
  const { search, category } = useSearchContext();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  console.log(items);
  return (
    <div className="w-full h-full">
      {category ? <h3>{category}</h3> : null}
      {items.length > 0 && loading ? (
        <div>
          <CardLoader />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-around flex-wrap  md:flex-row">
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
                className="h-[150px] w-[90%] flex shadow-md  m-3 bg-white rounded-lg md:w-[350px] md-h[200px]"
                key={item.uuid}
              >
                {item.imageurl ? (
                  <img
                    className="h-[100%] w-[40%] rounded-lg object-cover"
                    alt="img"
                    src={`${item.imageurl}`}
                  />
                ) : (
                  <img className="card-image" alt="img" src={MyImage} />
                )}
                <div className="w-[60%]">
                  <p className="text-xl p-4 h-[50%] font-bold">
                    {item.itemName}
                  </p>
                  <div className="flex justify-between h-[50%] items-end">
                    {item.itemPrice ? (
                      <p className="p-4 font-semibold	">
                        {item.itemPrice} {item.currency}
                      </p>
                    ) : (
                      <p className="p-4">OFFER</p>
                    )}
                    <p className="p-4">{item.views} Views</p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
};

export default Card;
