import React, { useState, useEffect } from "react";
import { capitalizeFirstLetter } from "../../../../utils";

const SearchResult = ({ addPantryItem, item, pantryItems }) => {
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const checkIfAdded = () => {
      const isItemAdded = pantryItems.some(
        (element) => element.name === item.name
      );
      setIsAdded(isItemAdded);
    };

    checkIfAdded();
  }, [pantryItems, item]);

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
