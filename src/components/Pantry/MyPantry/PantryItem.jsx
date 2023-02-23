import React from "react";
import { useDispatch, useSelector } from "react-redux";
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
import PantryItemImage from "./PantryItem/PantryItemImage";
import PantryItemBody from "./PantryItem/PantryItemBody";
import { checkUserPrefs } from "../../../utils";

const PantryItem = ({ item }) => {
  const dispatch = useDispatch();
  const userPreferences = useSelector((state) => state.user.preferences);

  const onDelete = () => {
    dispatch({ type: DELETE_PANTRY_ITEM, payload: item.id });
  };

  // MOVE THIS TO DATA FETCHING/CONTROLLER
  const onRecipeSearch = async () => {
    // change screen to Recipe Search
    dispatch({ type: SET_SCREEN_MODE, payload: 2 });

    // send searchTerm (ingredient(s)) to API to get matching recipes
    const result = await getRecipeByIngredient(item.itemName);

    // extract IDs from the recipes returned by API
    const idsToSearch = result.map((item) => item.id);

    // send IDs to function that calls API to get recipe info
    const infoForRecipes = await getRecipeInformationBulk(idsToSearch);

    // filter for recipes that match user's dietary prefs, using recipe info
    const filteredRecipes = checkUserPrefs(userPreferences, infoForRecipes);

    // extract IDs of recipes that match dietary prefs
    const filteredIds = filteredRecipes.map((item) => item.id);

    // find these recipes in original array by ID
    const recipesToDisplay = result.filter((element) =>
      filteredIds.includes(element.id)
    );

    // send array of results to store
    dispatch({ type: SET_INGREDIENT_SEARCH, payload: recipesToDisplay });

    // send recipe info to store
    dispatch({ type: SET_RECIPE_INFO, payload: filteredRecipes });

    // console.log("Result", result, "IDs", idsToSearch);
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
