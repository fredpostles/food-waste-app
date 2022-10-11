import React from "react";

const PantryItem = ({ item }) => {
  return (
    <>
      <div className="pantryItem__container">
        <p>{item.itemName}</p>
        <p>Quantity: {item.quantity}</p>
      </div>
    </>
  );
};

export default PantryItem;
