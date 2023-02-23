import React from "react";
import { useSelector } from "react-redux";
import { capitalizeFirstLetter } from "../../../../utils";

const SearchResult = ({ addPantryItem, item }) => {
  const pantryItems = useSelector((state) => state.pantryItems);

  let isAdded;
  const checkIfAdded = (item) => {
    if (pantryItems.some((element) => element.itemName === item.name)) {
      isAdded = true;
    } else isAdded = false;
  };

  checkIfAdded(item);

  const src = `https://spoonacular.com/cdn/ingredients_100x100/${item.image}`;
  return (
    <>
      <div className="singleIngredient__container">
        {item.image === "no.jpg" ? (
          <div className="singleIngredient__imageContainer">
            <p>No image :-/</p>
          </div>
        ) : (
          <div
            className="singleIngredient__imageContainer"
            style={{
              backgroundImage: `url(${src})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "contain",
            }}
          ></div>
        )}
        <p>{capitalizeFirstLetter(item.name)}</p>
        <button
          onClick={() => {
            !isAdded ? addPantryItem(item) : alert("Item already in pantry.");
          }}
          className="plusBtn"
        >
          {!isAdded ? (
            <>
              <img
                className="icons"
                src="/assets/icons/plus.svg"
                alt="Plus icon"
                title="Add to pantry"
              />
            </>
          ) : (
            <>
              <img
                className="icons"
                src="/assets/icons/check.svg"
                alt="Checkmark"
                title="Added to pantry"
              />
            </>
          )}
        </button>
      </div>
    </>
  );
};

export default SearchResult;
