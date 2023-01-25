import React, { useState } from "react";
import { useSelector } from "react-redux";
import NoResults from "./SearchResults/NoResults";
import ShowResultsButtons from "./SearchResults/ShowResultsButtons";
import SingleRecipeResult from "./SearchResults/SingleRecipeResult";

const SearchResults = (props) => {
  const suggestions = props.suggestions;
  const ingredientSearch = useSelector((state) => state.ingredientSearch);
  const [showMore, setShowMore] = useState(11);

  const onShowMore = () => {
    setShowMore(showMore + 10);
  };

  const onShowLess = () => {
    if (showMore <= 21) {
      setShowMore(11);
    } else {
      setShowMore(showMore - 10);
    }
  };

  return (
    <div className="searchResults__container">
      <ul className="recipeSearchResults__list">
        {suggestions &&
          suggestions.map((recipe, index) => {
            if (index > showMore) return;
            else
              return (
                <li className="singleRecipe__container" key={recipe.id}>
                  <SingleRecipeResult recipe={recipe} id={recipe.id} />
                </li>
              );
          })}
        {!suggestions &&
          ingredientSearch &&
          ingredientSearch.length > 0 &&
          ingredientSearch.map((recipe, index) => {
            if (index > showMore) return;
            else
              return (
                <li className="singleRecipe__container" key={recipe.id}>
                  <SingleRecipeResult recipe={recipe} id={recipe.id} />
                </li>
              );
          })}
      </ul>
      {(!suggestions && ingredientSearch && ingredientSearch.length === 0) ||
        (suggestions && !ingredientSearch && suggestions.length === 0 && (
          <NoResults />
        ))}
      {(suggestions || ingredientSearch) && (
        <ShowResultsButtons
          suggestions={suggestions}
          ingredientSearch={ingredientSearch}
          showMore={showMore}
          onShowMore={onShowMore}
          onShowLess={onShowLess}
        />
      )}
    </div>
  );
};

export default SearchResults;
