import React, { useState } from "react";
import Navigation from "./Navigation";
import SearchBar from "./RecipeSearch/SearchBar";
import SearchResults from "./RecipeSearch/SearchResults";
import { useSelector } from "react-redux";
import { generateRandomID } from "../utils";

const RecipeSearch = () => {
  const [searchTerm, setSearchterm] = useState("");
  const [suggestions, setSuggestions] = useState();
  const ingredientSearch = useSelector((state) => state.ingredientSearch);

  return (
    <>
      <Navigation />
      <div className="recipeSearch__container">
        <SearchBar
          searchTerm={searchTerm}
          setSearchterm={setSearchterm}
          setSuggestions={setSuggestions}
        />
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
            {!suggestions &&
              ingredientSearch &&
              ingredientSearch.map((recipe) => {
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
