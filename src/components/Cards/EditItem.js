import React from "react";
import { useDataContext } from "../../context/DataContext";
import { useParams } from "react-router-dom";
function EditItem() {
  let { id } = useParams();
  const { items } = useDataContext();
  const filterItems = items.filter((item) => item.uuid === id);
  console.log(filterItems);

  return <div>EditItem</div>;
}

export default EditItem;
