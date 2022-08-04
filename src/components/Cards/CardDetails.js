import React from "react";
import { useParams } from "react-router-dom";
import { useDataContext } from "../../context/DataContext";
import "../Sceletons/ContentLoader.css";
import ContentLoader from "../Sceletons/ContentLoader";
import MyImage from "../../Assets/DefaultImage.png";

import ImageGallery from "react-image-gallery";

const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
];

function CardDetails() {
  const { items } = useDataContext();
  let { id } = useParams();

  const filterItems = items.filter((item) => item.uuid === id);
  console.log(filterItems);
  return (
    <div className="h-screen">
      <ImageGallery items={images} />
      {items.length > 0 ? (
        <div className="h-screen">
          <div className="w-[500px] h-[500px]">
            {filterItems[0].images?.[0] ? (
              <p>hey</p>
            ) : (
              <img className="card-image" alt="img" src={MyImage} />
            )}
          </div>
          <div className="carddetails-description">
            <p>
              <span>Item Name : </span>
              {filterItems[0].itemName}
            </p>
            <p>
              <span>Description : </span>
              {filterItems[0].description}
            </p>
            <p>
              <span>Price : </span>
              {filterItems[0].itemPrice} {filterItems[0].currency}
            </p>
            <p>
              <span>Seller Number : </span>
              {filterItems[0].sellerNumber}
            </p>

            <p>
              <span>Seller Name : </span>
              {filterItems[0].sellerName}
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
