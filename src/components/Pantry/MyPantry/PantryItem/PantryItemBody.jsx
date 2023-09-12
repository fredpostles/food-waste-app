import React from "react";
import { capitalizeFirstLetter } from "../../../../utils";
import ItemQuantity from "./PantryItemBody/ItemQuantity";

const PantryItemBody = ({
  item,
  onDelete,
  onRecipeSearch,
  pantryItems,
  setPantryItems,
  setPantryItemsChanged,
}) => {
  return (
    <div className="card__body">
      <p className="card__title">{capitalizeFirstLetter(item.name)}</p>
      <ItemQuantity
        item={item}
        pantryItems={pantryItems}
        setPantryItems={setPantryItems}
        setPantryItemsChanged={setPantryItemsChanged}
      />
      <button onClick={onDelete} className="deleteBtn">
        Delete item
      </button>
      <button onClick={onRecipeSearch} className="ingredientSearchBtn">
        Search for recipes that use {item.name}
      </button>
    </div>
  );
};

export default PantryItemBody;
