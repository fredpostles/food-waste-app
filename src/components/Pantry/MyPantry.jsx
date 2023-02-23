import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecipeByIngredient,
  getRecipeInformationBulk,
} from "../../apiCalls/dataFetching";
import {
  SET_SCREEN_MODE,
  SET_INGREDIENT_SEARCH,
  SET_RECIPE_INFO,
} from "../../redux/types";
import { getUserDiet, checkUserPrefs } from "../../utils";
import PantryItem from "./MyPantry/PantryItem";
import PantrySortSelection from "./MyPantry/PantrySortSelection";

const MyPantry = (setSuggestions) => {
  const dispatch = useDispatch();
  const [sort, setSort] = useState("");
  const pantryItems = useSelector((state) => state.pantryItems);
  const userPreferences = useSelector((state) => state.user.preferences);

  const userDiet = getUserDiet(userPreferences);

  // copy of pantry items to be used for sorting data
  let sortedData = [...pantryItems];

  // function to set sort order
  const filterChange = (e) => {
    setSort(e.target.value);
  };

  // change sort order depending on user selected order
  if (sort) {
    switch (sort) {
      case "azSort":
        sortedData.sort((a, b) => {
          return a.itemName > b.itemName;
        });
        break;

      case "zaSort":
        sortedData.reverse();
        break;

      case "sortDateAsc":
        sortedData.sort(function (a, b) {
          return b.dateAdded - a.dateAdded;
        });
        break;

      case "sortDateDesc":
        sortedData.sort(function (a, b) {
          return a.dateAdded - b.dateAdded;
        });
        break;

      case "default":
        sortedData = [...pantryItems];
        break;

      default:
        break;
    }
  }

  const onUsePantry = async () => {
    // get string of pantry items to send to API to find matching recipes
    const wholePantry = sortedData.map((item) => item.itemName).toString();

    // send to API
    const result = await getRecipeByIngredient(wholePantry);

    // extract IDs from the recipes returned by API
    const idsToSearch = result.map((item) => item.id);

    // send IDs to function that calls API to get recipe info
    const infoForRecipes = await getRecipeInformationBulk(idsToSearch);

    // filter for recipes that match user's dietary prefs, using recipe info
    const filteredRecipes = checkUserPrefs(userDiet, infoForRecipes);

    // extract IDs of recipes that match dietary prefs
    const filteredIds = filteredRecipes.map((item) => item.id);

    // find these recipes in original array by ID
    const recipesToDisplay = result.filter((element) =>
      filteredIds.includes(element.id)
    );

    // send result (array of recipes returned) to store
    dispatch({ type: SET_INGREDIENT_SEARCH, payload: recipesToDisplay });

    // send extra info for matching recipes to store
    dispatch({ type: SET_RECIPE_INFO, payload: filteredRecipes });

    // set screen to recipe search
    dispatch({ type: SET_SCREEN_MODE, payload: 2 });
  };

  return (
    <div className="myPantry__container">
      <h3>My Pantry Items:</h3>
      {pantryItems.length > 1 && (
        <PantrySortSelection filterChange={filterChange} />
      )}
      <div className="wholePantrySearch__container">
        <button
          onClick={onUsePantry}
          className="wholePantrySearchBtn"
          title="Search for recipes using as many pantry ingredients as possible"
        >
          Use as many pantry items as possible
        </button>
      </div>
      <div className="pantryItems__container">
        {sortedData &&
          sortedData.map((item) => {
            return (
              <PantryItem
                item={item}
                setSuggestions={setSuggestions}
                key={item.id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default MyPantry;
