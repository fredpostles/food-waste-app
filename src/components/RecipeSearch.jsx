import React, { useState } from "react";
import Navigation from "./Navigation";
import SearchBar from "./RecipeSearch/SearchBar";
import SearchResults from "./RecipeSearch/SearchResults";
import { useSelector } from "react-redux";
import { generateRandomID } from "../utils";
import RecipeTemplate from "./RecipeSearch/RecipeTemplate";

const RecipeSearch = () => {
  const [searchTerm, setSearchterm] = useState("");
  const [suggestions, setSuggestions] = useState();
  const ingredientSearch = useSelector((state) => state.ingredientSearch);
  const [showTemplate, setShowTemplate] = useState(false);

  // error coming from this?
  // if (!suggestions && !ingredientSearch) {
  //   setShowTemplate(true);
  // }

  return (
    <>
      <Navigation />
      <div className="recipeSearch__container">
        <SearchBar
          searchTerm={searchTerm}
          setSearchterm={setSearchterm}
          setSuggestions={setSuggestions}
        />
        {!suggestions && !ingredientSearch ? (
          <div className="recipeSearch__templateContainer">
            <RecipeTemplate />
          </div>
        ) : null}
        <div className="searchResults__container" key={generateRandomID(8)}>
          <ul className="recipeSearchResults__list">
            {suggestions &&
              suggestions.map((recipe, index) => {
                // to limit number of results being mapped over/displayed to 10
                // if (index > 9) return;

                // more could then be displayed using a "show more" button
                return (
                  <li className="singleRecipe__container" key={recipe.id}>
                    <SearchResults recipe={recipe} id={recipe.id} />
                  </li>
                );
              })}
            {!suggestions &&
              ingredientSearch &&
              ingredientSearch.length > 0 &&
              ingredientSearch.map((recipe) => {
                return (
                  <li className="singleRecipe__container">
                    <SearchResults recipe={recipe} key={recipe.id} />
                  </li>
                );
              })}
          </ul>
          {!suggestions &&
            ingredientSearch &&
            ingredientSearch.length === 0 && (
              <>
                <p className="ingredientSearch__noResults">
                  Sorry, there are no results for recipes using this ingredient.
                  Please try searching for another ingredient!
                </p>
              </>
            )}
        </div>
      </div>
    </>
  );
};

export default RecipeSearch;
