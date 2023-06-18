import React, { useState } from "react";
import { useSelector } from "react-redux";
import { updatePantryItem } from "../../../../../apiCalls/backendAPI";
import QuantityInputForm from "./ItemQuantity/QuantityInputForm";

const ItemQuantity = ({
  item,
  pantryItems,
  setPantryItems,
  setPantryItemsChanged,
}) => {
  const [showControls, setShowControls] = useState(false);
  const [editedQuantity, setEditedQuantity] = useState({
    amount: 0,
    units: "",
  });
  const token = useSelector((state) => state.token);

  const indexOfItem = pantryItems.findIndex(
    (element) => element.id === item.id
  );

  const handleInputChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setEditedQuantity((prevQuantity) => ({
      ...prevQuantity,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePantryItem(token, item.id, editedQuantity);
      // Update the pantryItems state to reflect the changes
      const updatedPantryItems = [...pantryItems];
      updatedPantryItems[indexOfItem].quantity = editedQuantity;
      setPantryItems(updatedPantryItems);
    } catch (error) {
      console.log(">> error", error);
    }
    setShowControls(!showControls);
    setPantryItemsChanged(true);
  };

  let qty =
    pantryItems && pantryItems[indexOfItem]?.quantity
      ? pantryItems[indexOfItem].quantity
      : { amount: 0, units: "" };

  const onCancel = () => {
    setShowControls(!showControls);
  };

  return (
    <>
      {qty.amount > 0 && (
        <p className="pantryItem__quantity__value">
          Quantity:{" "}
          {
            <span className="bold">{`${qty.amount} ${
              qty.units !== undefined || null ? qty.units : " "
            }`}</span>
          }
        </p>
      )}
      {showControls && (
        <>
          <QuantityInputForm
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
          <button className="cancelBtn" onClick={onCancel}>
            Cancel
          </button>
        </>
      )}
      {!showControls &&
        (qty.amount === 0 ? (
          <button
            className="addQuantityBtn"
            onClick={() => setShowControls(!showControls)}
          >
            Add quantity
          </button>
        ) : (
          <button
            className="editQuantityBtn"
            onClick={() => setShowControls(!showControls)}
          >
            Edit quantity
          </button>
        ))}
    </>
  );
};

export default ItemQuantity;
