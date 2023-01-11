import React from "react";
import { useDispatch } from "react-redux";
import {
  DELETE_PANTRY_ITEM,
  SET_SCREEN_MODE,
  SET_INGREDIENT_SEARCH,
} from "../../redux/types";
import { capitalizeFirstLetter } from "../../utils";
import { getRecipeByIngredient } from "../../apiCalls/dataFetching";

const PantryItem = ({ item }) => {
  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch({ type: DELETE_PANTRY_ITEM, payload: item.id });
  };

  const onRecipeSearch = async () => {
    dispatch({ type: SET_SCREEN_MODE, payload: 2 });
    const result = await getRecipeByIngredient(item.itemName);
    dispatch({ type: SET_INGREDIENT_SEARCH, payload: result });
  };

  return (
    <>
      <div className="pantryItem__container">
        {item.image === "no" ? (
          <p>No image</p>
        ) : (
          <div className="image__container pantryItem">
            <img
              src={`https://spoonacular.com/cdn/ingredients_100x100/${item.image}`}
              alt={capitalizeFirstLetter(item.itemName)}
            />
          </div>
        )}
        <div className="card-body">
          <p className="card-title">{capitalizeFirstLetter(item.itemName)}</p>
          {item.quantity && <p>Quantity: {item.quantity}</p>}
          <button>Add quantity</button>
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
