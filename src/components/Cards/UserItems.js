import React, { useState, useEffect } from "react";
import { useDataContext } from "../../context/DataContext";
import { Link } from "react-router-dom";
import Modal from "../Modal/Modal";

import MyImage from "../../Assets/DefaultImage.png";
import CardLoader from "../Sceletons/CardLoader";

function UserItems() {
  const { useritems } = useDataContext();
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [loading, setLoading] = useState(true);

  const page = "/edititem";

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <CardLoader />
        </div>
      ) : (
        <>
          {useritems.length > 0 ? (
            <>
              {useritems.map((item) => {
                return (
                  <div
                    key={item.uuid}
                    className="p-4 m-2 flex flex-col rounded-lg border border-gray-200 h-[200px]"
                  >
                    <div className="flex justify-between w-full items-center p-4 h-[30%]">
                      <h3 className="italic text-xl font-bold	md:text-2xl">
                        {item.itemName}
                      </h3>
                      <p className="text-sm">Added on : {item.date}</p>
                    </div>
                    <div className="flex w-full h-[70%]">
                      <div className="w-[30%] items-center justify-center flex">
                        {item.imageurl ? (
                          <img
                            className="w-[100px] h-[100px]"
                            alt="img"
                            src={`${item.imageurl}`}
                          />
                        ) : (
                          <img
                            className="w-[100px] h-[100px]"
                            alt="img"
                            src={MyImage}
                          />
                        )}
                      </div>
                      <div className="w-[70%]">
                        <div className="flex items-center justify-between h-1/2 p-2">
                          <div className="useritems-price">
                            <p>Views : {item.views}</p>
                          </div>
                          <div className="useritems-price">
                            <p>{item.itemPrice} GEL</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between h-1/2 p-2">
                          <Link to={`${page}${item.uuid}`}>
                            <button className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-full">
                              EDIT
                            </button>
                          </Link>

                          <button
                            className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-full"
                            onClick={() => {
                              setModalData(item.uuid);
                              setOpenModal(true);
                            }}
                          >
                            DELETE
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <h3 className="font-bold text-xl">You Don't Have Any Items...</h3>
            </div>
          )}
        </>
      )}

      {openModal && (
        <Modal
          itemuid={modalData}
          openModal={openModal}
          closeModal={setOpenModal}
        />
      )}
    </>
  );
}

export default UserItems;
