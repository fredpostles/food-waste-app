import React from "react";
import { capitalizeFirstLetter } from "../../../../utils";
import ItemQuantity from "./PantryItemBody/ItemQuantity";

const PantryItemBody = ({ item, onDelete, onRecipeSearch }) => {
  return (
    <div className="card__body">
      <p className="card__title">{capitalizeFirstLetter(item.itemName)}</p>
      <ItemQuantity item={item} />
      <button onClick={onDelete} className="deleteBtn">
        Delete item
      </button>
      <button onClick={onRecipeSearch} className="ingredientSearchBtn">
        Search for recipes that use {item.itemName}
      </button>
    </div>
  );
};

export default PantryItemBody;
