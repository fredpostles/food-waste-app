import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeByIngredient } from "../../apiCalls/dataFetching";
import {
  SET_SCREEN_MODE,
  SET_INGREDIENT_SEARCH,
  SET_SEARCH_TERM,
} from "../../redux/types";
import PantryItem from "./MyPantry/PantryItem";

const MyPantry = (setSuggestions) => {
  const dispatch = useDispatch();
  const pantryItems = useSelector((state) => state.pantryItems);

  const filterChange = (e) => {
    setSort(e.target.value);
  };

  const [sort, setSort] = useState("");

  let sortedData = [...pantryItems];

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
    const wholePantry = sortedData.map((item) => item.itemName).toString();
    console.log("1", wholePantry);
    const result = await getRecipeByIngredient(wholePantry);
    console.log("2", result);
    dispatch({ type: SET_INGREDIENT_SEARCH, payload: result });
    dispatch({ type: SET_SCREEN_MODE, payload: 2 });
  };

  return (
    <div className="myPantry__container">
      <h3>My Pantry Items:</h3>
      {pantryItems.length > 1 && (
        <label className="pantrySort__label" htmlFor="sortPantryItems">
          Sort by:{" "}
          <select
            name="sortPantryItems"
            id="sortPantryItems"
            onChange={filterChange}
          >
            <option value="default">Default</option>
            <option value="azSort">A-Z</option>
            <option value="zaSort">Z-A</option>
            <option value="sortDateAsc">Newest first</option>
            <option value="sortDateDesc">Oldest first</option>
          </select>
        </label>
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
