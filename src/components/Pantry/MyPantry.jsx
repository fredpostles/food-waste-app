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
import PantryItem from "./MyPantry/PantryItem";
import PantrySortSelection from "./MyPantry/PantrySortSelection";

const MyPantry = (setSuggestions) => {
  const dispatch = useDispatch();
  const [sort, setSort] = useState("");
  const pantryItems = useSelector((state) => state.pantryItems);
  const userPreferences = useSelector((state) => state.user.preferences);

  const getUserDiet = () => {
    // user diet prefs
    const userDiet = [];

    // if user identified as vegan
    userPreferences.isVegan &&
      !userPreferences.isVegetarian &&
      userDiet.push("vegan");

    // if user idenfitied as vegetarian only, or both vegan & vegetarian
    (userPreferences.isVegetarian ||
      (userPreferences.isVegan && userPreferences.isVegetarian)) &&
      userDiet.push("vegan|vegetarian");

    // if no diet preferences, clear the array
    !userPreferences.isVegan &&
      !userPreferences.isVegetarian &&
      userDiet.splice(0, userDiet.length);

    return userDiet;
  };

  const getUserIntolerances = () => {
    // user intolerances
    const userIntolerances = [];

    // get intolerances, remove "no" & add to userIntolerances array
    Object.entries(userPreferences).forEach((element) => {
      if (element[0].includes("no") && element[1] === true) {
        userIntolerances.push(element[0].slice(2));
      } else return;
    });

    return userIntolerances;
  };

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

    // send result (array of recipes returned) to store
    dispatch({ type: SET_INGREDIENT_SEARCH, payload: result });

    // extract IDs from the recipes returned by API
    const idsToSearch = result.map((item) => item.id);

    // send IDs to function that calls API to get recipe info
    await getRecipeInfo(idsToSearch);

    dispatch({ type: SET_SCREEN_MODE, payload: 2 });
  };

  const getRecipeInfo = async (recipeIds) => {
    // get recipe info in bulk for all recipes
    const recipes = await getRecipeInformationBulk(recipeIds);

    // send array of results to store
    dispatch({ type: SET_RECIPE_INFO, payload: recipes }); // console.log("Recipe info", recipes);
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
          Use as many pantry ingredients as possible
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
