import React from "react";
import { useParams } from "react-router-dom";
import { useDataContext } from "../../context/DataContext";
import "../Sceletons/ContentLoader.css";
import ContentLoader from "../Sceletons/ContentLoader";
import MyImage from "../../Assets/DefaultImage.png";
import Gallereact from "gallereact";
import { PhoneIcon } from "@heroicons/react/outline";
import { UserIcon } from "@heroicons/react/outline";

function CardDetails() {
  const { items } = useDataContext();
  let { id } = useParams();
  const filterItems = items.filter((item) => item.uuid === id);
  const item = filterItems[0];
  console.log(filterItems);
  return (
    <div className="min-h-[80vh]">
      {items.length > 0 ? (
        <div className="min-h-[80vh] md:flex md:flex-row md:items-center ">
          <div className="w-full  flex justify-center items-start flex-col rounded-2xl my-2 md:items-center md:w-[60%]">
            <h1 className="font-bold text-2xl	p-4">{item.itemName}</h1>
            <div className="w-[screen] md:w-[50%] h-[500px]">
              {item.images?.[0] ? (
                <>
                  <div className="medium:hidden w-full h-full border-gray-300 border rounded-2xl">
                    <Gallereact
                      cover={false}
                      arrowOnHover={true}
                      images={item.images}
                    />
                  </div>
                  <div className="w-full h-full md:hidden">
                    <Gallereact
                      swipe={true}
                      cover={false}
                      images={item.images}
                    />
                  </div>
                </>
              ) : (
                // <img
                //   className="object-cover w-full h-full"
                //   alt="img"
                //   src={filterItems[0].images[0]}
                // />
                <img className="card-image" alt="img" src={MyImage} />
              )}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center my-2 md:w-[30%]">
            <div className="flex w-full h-[30px] items-center justify-around">
              <p className="text-sm text-blue-700">Added: {item.date}</p>
              <p className="text-sm text-blue-700">{item.views} Views</p>
            </div>
            <div className="bg-[#F4F4F4] my-2 flex flex-row w-[80%] h-[100px] rounded-full justify-center items-center">
              <p className="text-xl font-bold">
                {item.itemPrice} {item.currency}
              </p>
            </div>
            <div className="flex flex-row justify-around items-center w-full h-[50px]">
              <div className="flex">
                <UserIcon
                  className="h-6 w-6 text-black-700 mr-1"
                  aria-hidden="true"
                />
                <p className="font-bold">{item.sellerName}</p>
              </div>
              <div className="flex">
                <PhoneIcon
                  className="h-6 w-6 text-green-700  mr-1"
                  aria-hidden="true"
                />
                <p className="font-bold">{item.sellerNumber}</p>
              </div>
            </div>
            <div className="flex flex-col items-start w-[90%] rounded-xl min-h-[150px] p-4 bg-[#F4F4F4] ">
              <p className="font-bold">Description</p>
              <p>{item.description}</p>
            </div>
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
