import React from "react";
import { useDispatch } from "react-redux";
import {
  DELETE_PANTRY_ITEM,
  SET_SCREEN_MODE,
  SET_INGREDIENT_SEARCH,
  SET_RECIPE_INFO,
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
    // change screen to Recipe Search
    dispatch({ type: SET_SCREEN_MODE, payload: 2 });

    // console.log(item.itemName);

    // send searchTerm (ingredient(s)) to API to get matching recipes
    const result = await getRecipeByIngredient(item.itemName);

    // send array of results to store
    dispatch({ type: SET_INGREDIENT_SEARCH, payload: result });

    // extract IDs from the recipes returned by API
    const idsToSearch = result.map((item) => item.id);

    // send IDs to function that calls API to get recipe info
    await getRecipeInfo(idsToSearch);
    console.log("Result", result, "IDs", idsToSearch);
  };

  const getRecipeInfo = async (recipeIds) => {
    // get recipe info in bulk for all recipes
    const recipes = await getRecipeInformationBulk(recipeIds);

    // send array of results to store
    dispatch({ type: SET_RECIPE_INFO, payload: recipes }); // console.log("Recipe info", recipes);
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
