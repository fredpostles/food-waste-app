import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeByIngredient } from "../../apiCalls/dataFetching";
import { CLEAR_INGREDIENT_SEARCH, SET_SEARCH_TERM } from "../../redux/types";
import { getUserDiet, getUserIntolerances } from "../../utils";

const SearchBar = ({ searchTerm, setSearchterm, setSuggestions }) => {
  const dispatch = useDispatch();
  const userPreferences = useSelector((state) => state.user.preferences);

  const userDiet = getUserDiet(userPreferences);
  const userIntolerances = getUserIntolerances(userPreferences);

  // get string list of diet(s) to send in API call
  const diet = userDiet.toString();

  const intolerances = userIntolerances.toString();

  /* 
  Next, swap out getRecipeByIngredient below for complexSearch
  - need to send diet & intolerances, as well as searchTerm(s) to complexSearch
  */

  const onSubmitSearch = async () => {
    dispatch({ type: SET_SEARCH_TERM, payload: searchTerm });
    // get basic recipe info for recipes matching searchTerm(s)
    const result = await getRecipeByIngredient(searchTerm);

    // get IDs of returned recipes
    setSuggestions(result);
    dispatch({ type: CLEAR_INGREDIENT_SEARCH, payload: null });
  };

  const onClick = () => {
    setSuggestions();
    setSearchterm("");
    dispatch({ type: CLEAR_INGREDIENT_SEARCH, payload: null });
  };

  return (
    <>
      <div className="recipeSearchBar__container">
        <h1>Search for recipes</h1>
        <h2>Got items in your pantry you need to use up?</h2>
        <h3>Search for recipes by ingredient below:</h3>
        <div className="recipeSearchBar">
          <div className="innerRecipeSearch">
            <input
              name="search"
              type="text"
              placeholder="Kale, tomatoes, pasta..."
              className="searchInput"
              value={searchTerm}
              onInput={(e) => setSearchterm(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  onSubmitSearch();
                }
              }}
            ></input>
            <div className="searchBar__icons__container">
              <button onClick={onClick} className="clearBtn">
                <img
                  className="icons"
                  src="/assets/icons/cross.svg"
                  alt="Cross icon"
                />
              </button>
              <button className="searchBtn" onClick={onSubmitSearch}>
                <img
                  className="icons"
                  src="/assets/icons/search.svg"
                  alt="Loupe icon"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
