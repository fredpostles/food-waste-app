import React from "react";
import { capitalizeFirstLetter } from "../../utils";

const SearchResults = ({ addPantryItem, item }) => {
  return (
    <>
      <div className="singleIngredient__container">
        {item.image === "no.jpg" ? (
          <p>No image :-/</p>
        ) : (
          <img
            src={`https://spoonacular.com/cdn/ingredients_100x100/${item.image}`}
            alt={capitalizeFirstLetter(item.name)}
          />
        )}
        <p>{capitalizeFirstLetter(item.name)}</p>
        <button
          onClick={() => {
            addPantryItem(item);
          }}
        >
          Add to pantry
        </button>
      </div>
    </>
  );
};

export default SearchResults;
