import React, { useState } from "react";
import { capitalizeFirstLetter } from "../../../utils";
import ItemQuantity from "./ItemQuantity";

const PantryItemBody = ({ item, onDelete, onRecipeSearch }) => {
  return (
    <div className="card__body">
      <p className="card__title">{capitalizeFirstLetter(item.itemName)}</p>
      <ItemQuantity item={item} />
      <button onClick={onDelete}>Delete item</button>
      <button onClick={onRecipeSearch}>
        Search for recipes that use {item.itemName}
      </button>
    </div>
  );
};

export default PantryItemBody;
