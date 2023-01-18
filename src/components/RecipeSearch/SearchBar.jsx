import React from "react";
import { useDispatch } from "react-redux";
import { getRecipeByIngredient } from "../../apiCalls/dataFetching";
import { SET_SEARCH_TERM } from "../../redux/types";

const SearchBar = ({ searchTerm, setSearchterm, setSuggestions }) => {
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

  const onClick = () => {
    setSuggestions();
    setSearchterm("");
  };

  const onEnter = (e) => {
    if (e.key === "Enter") {
      onSubmitSearch();
    }
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
              placeholder="Enter ingredients"
              className="searchInput"
              value={searchTerm}
              onInput={onInput}
              onKeyUp={onEnter}
            ></input>
            <div className="searchBar__icons">
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
