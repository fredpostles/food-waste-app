import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecipeByIngredient,
  getRecipeInformationBulk,
} from "../../apiCalls/dataFetching";
import {
  CLEAR_INGREDIENT_SEARCH,
  SET_SEARCH_TERM,
  SET_RECIPE_INFO,
} from "../../redux/types";
import { checkUserPrefs, getUserDiet } from "../../utils";

const SearchBar = ({ searchTerm, setSearchterm, setSuggestions }) => {
  const dispatch = useDispatch();
  const userPreferences = useSelector((state) => state.user.preferences);
  const userDiet = getUserDiet(userPreferences);

  const onSubmitSearch = async () => {
    dispatch({ type: SET_SEARCH_TERM, payload: searchTerm });

    // get basic recipe info for recipes matching searchTerm(s)
    const result = await getRecipeByIngredient(searchTerm);

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

    // set matching recipes to display
    setSuggestions(recipesToDisplay);

    // send recipe info to store
    dispatch({ type: SET_RECIPE_INFO, payload: filteredRecipes });

    // clear previously stored ingredient search from store
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
