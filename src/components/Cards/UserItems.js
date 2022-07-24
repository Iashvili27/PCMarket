import React, { useEffect } from "react";
import { useDataContext } from "../../context/DataContext";
import { Link } from "react-router-dom";
import "./UserItems.css";

function UserItems(props) {
  const { useritems, deleteItemFromDatabase } = useDataContext();

  const page = "/edititem";

  return (
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
                    <img alt="img" src={item.imageurl}></img>
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
                      <button onClick={() => deleteItemFromDatabase(item.uuid)}>
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
        <div>
          <p>You dont have any items</p>
        </div>
      )}
    </div>
  );
}

export default UserItems;
