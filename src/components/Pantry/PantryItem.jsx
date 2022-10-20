import React from "react";
import { useDispatch } from "react-redux";
import { DELETE_PANTRY_ITEM } from "../../redux/types";
import { capitalizeFirstLetter } from "../../validation/utils";

const PantryItem = ({ item }) => {
  const dispatch = useDispatch();
  const ingredientImage = `https://spoonacular.com/cdn/ingredients_100x100/${item.image}`;
  const formattedItemName = capitalizeFirstLetter(item.itemName);

  const onDelete = () => {
    dispatch({ type: DELETE_PANTRY_ITEM, payload: item.id });
  };

  return (
    <>
      <div className="pantryItem__container">
        <p>{formattedItemName}</p>
        <p>Quantity: {item.quantity}</p>
        <img src={ingredientImage} alt={formattedItemName} />
        <button onClick={onDelete}>Delete item</button>
      </div>
    </>
  );
};

export default PantryItem;
