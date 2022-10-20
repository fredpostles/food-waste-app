import React from "react";
import { capitalizeFirstLetter } from "../../validation/utils";

const SearchResults = ({ addPantryItem, item }) => {
  const ingredientImage = `https://spoonacular.com/cdn/ingredients_100x100/${item.image}`;

  const formattedName = capitalizeFirstLetter(item.name);

  return (
    <>
      <div className="singleIngredient__container">
        <p>{formattedName}</p>
        <img src={ingredientImage} alt={formattedName} />
        <button
          onClick={() => {
            addPantryItem(item);
          }}
        >
          Add item to Pantry
        </button>
      </div>
    </>
  );
};

export default SearchResults;
