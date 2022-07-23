import React from "react";
import { useDataContext } from "../../context/DataContext";
import "./UserItems.css";

function UserItems() {
  const { useritems } = useDataContext();

  console.log(useritems);

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
                  <div className="useritems-button">
                    <button>EDIT</button>
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
