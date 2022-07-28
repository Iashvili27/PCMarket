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
        <div className="useritems-loader">
          <CardLoader />
        </div>
      ) : (
        <div className="useritems-container">
          <h3 className="useritems-headname">My Items</h3>
          {useritems.length > 0 ? (
            <div>
              {useritems.map((item) => {
                return (
                  <div key={item.uuid} className="useritems-cardwrapper">
                    <div className="useritems-name">
                      <h3>{item.title}</h3>
                      <p>Added on : {item.date}</p>
                    </div>
                    <div className="useritems-desc">
                      <div className="useritems-image">
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
                      <div className="useritems-price">
                        <p>Views : {item.views}</p>
                      </div>
                      <div className="useritems-price">
                        <p>{item.price} GEL</p>
                      </div>
                      <div>
                        <div className="useritems-button">
                          <Link to={`${page}${item.uuid}`}>
                            <button>EDIT</button>
                          </Link>
                        </div>
                        <div className="useritems-buttondelete">
                          <button
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
            </div>
          ) : (
            <div className="useritems-loader">
              <h3>You don't have any item.</h3>
            </div>
          )}
        </div>
      )}

      {openModal && <Modal itemuid={modalData} closeModal={setOpenModal} />}
    </>
  );
}

export default UserItems;
