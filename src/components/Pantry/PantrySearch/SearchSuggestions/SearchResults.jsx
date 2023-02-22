import React, { useState } from "react";
import { useSelector } from "react-redux";
import { capitalizeFirstLetter } from "../../../../utils";

const SearchResults = ({ addPantryItem, item }) => {
  const [isAdded, setIsAdded] = useState(false);
  const pantryItems = useSelector((state) => state.pantryItems);

  // NOT WORKING AS EXPECTED...
  // checkmarks only show up second time;
  // object is undefined first
  const checkPantry = (item) => {
    let o = {};
    o = pantryItems.find((object) => object.name === item.itemName);

    console.log(o);

    // if (
    //   pantryItems &&
    // ) {
    //   setIsAdded(true);
    // } else {
    //   setIsAdded(false);
    // }
  };

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
            addPantryItem(item);
            checkPantry(item);
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

export default SearchResults;
