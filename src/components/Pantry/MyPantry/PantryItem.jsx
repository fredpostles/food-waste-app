import React from "react";
import { useDispatch } from "react-redux";
import {
  DELETE_PANTRY_ITEM,
  SET_SCREEN_MODE,
  SET_INGREDIENT_SEARCH,
  SET_RECIPE_INSTRUCTIONS,
  SET_SEARCH_TERM,
} from "../../../redux/types";
import {
  getRecipeByIngredient,
  getRecipeInformationBulk,
} from "../../../apiCalls/dataFetching";
import PantryItemImage from "../PantryItem/PantryItemImage";
import PantryItemBody from "../PantryItem/PantryItemBody";

const PantryItem = ({ item }) => {
  const dispatch = useDispatch();
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

  return (
    <>
      <div className="pantryItem__container">
        <PantryItemImage item={item} />
        <PantryItemBody
          item={item}
          onDelete={onDelete}
          onRecipeSearch={onRecipeSearch}
        />
      </div>
    </>
  );
};

export default PantryItem;
