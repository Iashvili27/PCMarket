import React from "react";
import { useParams } from "react-router-dom";
import { useDataContext } from "../../context/DataContext";
function CardDetails() {
  const { items } = useDataContext();
  let { id } = useParams();
  console.log(items);
  return (
    <div className="CardDetails_container">
      <div className="cardDetails_image"></div>
      <p>{items[id].title}</p>
    </div>
  );
}

export default CardDetails;
