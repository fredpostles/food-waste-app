import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_INGREDIENT_SEARCH, SET_RECIPE_INFO } from "../../../redux/types";
import {
  getRecipeByIngredient,
  getRecipeInformationBulk,
} from "../../../apiCalls/dataFetching";
import PantryItemImage from "./PantryItem/PantryItemImage";
import PantryItemBody from "./PantryItem/PantryItemBody";
import { checkUserPrefs } from "../../../utils";
import { deletePantryItem } from "../../../apiCalls/backendAPI";

const PantryItem = ({
  item,
  setIsLoaded,
  pantryItems,
  setPantryItems,
  userPreferences,
  setPantryItemsChanged,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);

  const onDelete = async () => {
    try {
      await deletePantryItem(token, item.id);
      const updatedPantryItems = pantryItems.filter(
        (pantryItem) => pantryItem.id !== item.id
      );
      setPantryItems(updatedPantryItems);
      setPantryItemsChanged(true);
    } catch (error) {
      console.log("deletePAntry error in PantryItem.jsx:", error);
    }

    setPantryItemsChanged(true);
  };

  // search for recipes using current pantry item
  const onRecipeSearch = async () => {
    // show loading modal
    setIsLoaded(false);

    // format item name for API
    const itemName = item.name.replace(/\s+/g, "+"); // Replace spaces with plus sign
    console.log("itemName:", itemName);

    // send item name to API to get matching recipes
    const result = await getRecipeByIngredient(itemName);

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

    // change screen to Recipe Search
    navigate("/recipe-search");

    // close loading modal
    setIsLoaded(true);
  };

  return (
    <>
      <div className="pantryItem__container">
        <PantryItemImage item={item} />
        <PantryItemBody
          item={item}
          onDelete={onDelete}
          onRecipeSearch={onRecipeSearch}
          pantryItems={pantryItems}
          setPantryItems={setPantryItems}
          setPantryItemsChanged={setPantryItemsChanged}
        />
      </div>
    </>
  );
};

export default PantryItem;
