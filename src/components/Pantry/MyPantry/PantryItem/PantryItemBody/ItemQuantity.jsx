import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EDIT_QUANTITY } from "../../../../../redux/types";
import QuantityInputForm from "./ItemQuantity/QuantityInputForm";

const ItemQuantity = ({ item }) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({ quantity: { amount: 0, units: "" } });
  const [showControls, setShowControls] = useState(false);
  const pantryItems = useSelector((state) => state.pantryItems);

  const indexOfItem = pantryItems.findIndex(
    (element) => element.id === item.id
  );

  const handleInputChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: EDIT_QUANTITY,
      payload: {
        id: item.id,
        quantity: { amount: state.amount, units: state.units },
      },
    });
    setShowControls(!showControls);
  };

  let qty = {};
  pantryItems[indexOfItem].quantity
    ? (qty = pantryItems[indexOfItem].quantity)
    : (qty = state.quantity);

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
