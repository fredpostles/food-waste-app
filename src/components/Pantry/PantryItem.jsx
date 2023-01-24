import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  DELETE_PANTRY_ITEM,
  SET_SCREEN_MODE,
  SET_INGREDIENT_SEARCH,
  SET_RECIPE_INSTRUCTIONS,
  SET_SEARCH_TERM,
} from "../../redux/types";
import { capitalizeFirstLetter } from "../../utils";
import {
  getRecipeByIngredient,
  getRecipeInformationBulk,
} from "../../apiCalls/dataFetching";

const PantryItem = ({ item }) => {
  const dispatch = useDispatch();
  const [showQuantity, setShowQuantity] = useState(false);

  const onDelete = () => {
    dispatch({ type: DELETE_PANTRY_ITEM, payload: item.id });
  };

  // MOVE THIS TO DATA FETCHING/CONTROLLER
  const onRecipeSearch = async () => {
    dispatch({ type: SET_SCREEN_MODE, payload: 2 });

    // console.log(item.itemName);

    const result = await getRecipeByIngredient(item.itemName);
    dispatch(
      { type: SET_INGREDIENT_SEARCH, payload: result },
      { type: SET_SEARCH_TERM, payload: item.itemName }
    );

    // const idsToSearch = result.map((item) => item.id);
    // // console.log("Result", result, "IDs", idsToSearch);
    // const recipes = await getRecipeInformationBulk(idsToSearch);
    // dispatch({ type: SET_RECIPE_INSTRUCTIONS, payload: recipes });
    // console.log(recipes);
  };

  const onAddQuantity = () => {
    setShowQuantity(true);
  };

  const src = `https://spoonacular.com/cdn/ingredients_100x100/${item.image}`;
  return (
    <>
      <div className="pantryItem__container">
        {item.image === "no" ? (
          <div className="pantryItem image__container">
            <p>No image</p>
          </div>
        ) : (
          <div
            className="pantryItem image__container"
            style={{
              backgroundImage: `url(${src})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            {/* <img
              src={`https://spoonacular.com/cdn/ingredients_100x100/${item.image}`}
              alt={capitalizeFirstLetter(item.itemName)}
            /> */}
          </div>
        )}
        <div className="card__body">
          <p className="card__title">{capitalizeFirstLetter(item.itemName)}</p>
          {item.quantity && <p>Quantity: {item.quantity}</p>}
          {showQuantity ? (
            <>
              <div className="pantryItem__quantity">
                <label>Quantity: </label>
                <span>
                  <input
                    type="text"
                    className="pantryItem__quantityInput"
                    name="quantityInput"
                    id="quantityInput"
                  />
                  <select
                    className="pantryItem__quantityInput__unitOptions"
                    size={1}
                  >
                    <option
                      className="pantryItem__quantityInput__unitOptions__option"
                      value="default"
                    >
                      {""}
                    </option>
                    <option value="grams">g</option>
                    <option value="millilitres">ml</option>
                    <option value="litres">l</option>
                    <option value="ounces">oz</option>
                    <option value="cups">cups</option>
                    <option value="kilograms">kg</option>
                  </select>
                </span>
                <button
                  onClick={() => {
                    setShowQuantity(false);
                  }}
                >
                  X
                </button>
              </div>
            </>
          ) : (
            <button onClick={onAddQuantity}>Add quantity</button>
          )}
          <button onClick={onDelete}>Delete item</button>
          <button onClick={onRecipeSearch}>
            Search for recipes that use {item.itemName}
          </button>
        </div>
      </div>
    </>
  );
};

export default PantryItem;
