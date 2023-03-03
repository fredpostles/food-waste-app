import React, { useState } from "react";
import Navigation from "./Navigation";
import SearchBar from "./RecipeSearch/SearchBar";
import SearchResults from "./RecipeSearch/SearchResults";
import { useSelector } from "react-redux";
import RecipeTemplate from "./RecipeSearch/RecipeTemplate";
import LoadingModal from "./Modal/LoadingModal";

const RecipeSearch = () => {
  const [searchTerm, setSearchterm] = useState("");
  const [suggestions, setSuggestions] = useState();
  const [loading, setLoading] = useState(false);
  const ingredientSearch = useSelector((state) => state.ingredientSearch);

  return (
    <>
      <Navigation />
      <div className="recipeSearch__container">
        <SearchBar
          searchTerm={searchTerm}
          setSearchterm={setSearchterm}
          setSuggestions={setSuggestions}
          setLoading={setLoading}
        />
        {!suggestions && !ingredientSearch ? (
          <div className="recipeSearch__templateContainer">
            <RecipeTemplate />
          </div>
        ) : null}
        <SearchResults suggestions={suggestions} />
      </div>
      {loading ? <LoadingModal /> : null}
    </>
  );
};

export default RecipeSearch;
