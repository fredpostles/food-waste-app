import React, { useState } from "react";
import Navigation from "./Navigation";
import { SET_SEARCH_TERM } from "../redux/types";
import { useDispatch } from "react-redux";
import { getRecipeByIngredient } from "../apiCalls/dataFetching";
import SearchResults from "./RecipeSearch/SearchResults";
import { generateRandomID } from "../utils";

const RecipeSearch = () => {
  const [searchTerm, setSearchterm] = useState("");
  const [suggestions, setSuggestions] = useState();
  const dispatch = useDispatch();

  const onInput = (e) => {
    setSearchterm(e.target.value);
  };

  const onSubmitSearch = async () => {
    dispatch({ type: SET_SEARCH_TERM, payload: searchTerm });
    const result = await getRecipeByIngredient(searchTerm);
    setSuggestions(result);
    setSearchterm("");
  };

  return (
    <>
      <Navigation />
      <div className="recipeSearch__container">
        <h1>Search for recipes</h1>
        <h2>Got items in your pantry you need to use up?</h2>
        <h3>Search for recipes by ingredient below:</h3>
        <input
          name="search"
          type="text"
          placeholder="Enter ingredients"
          value={searchTerm}
          onInput={onInput}
        ></input>
        <button onClick={onSubmitSearch}>Search</button>
        <div className="searchResults__container">
          <ul className="recipeSearchResults__list">
            {suggestions &&
              suggestions.map((recipe) => {
                return (
                  <>
                    <li className="singleRecipe__container">
                      <SearchResults
                        recipe={recipe}
                        key={generateRandomID(34)}
                      />
                    </li>
                  </>
                );
              })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default RecipeSearch;
