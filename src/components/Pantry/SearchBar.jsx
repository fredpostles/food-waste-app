import React from "react";
import { useDispatch } from "react-redux";
import { getIngredients } from "../../apiCalls/dataFetching";
import { SET_SEARCH_TERM } from "../../redux/types";

const SearchBar = ({ searchTerm, setSearchterm, setSuggestions }) => {
  const dispatch = useDispatch();

  const onInput = (e) => {
    setSearchterm(e.target.value);
  };

  const onSubmitSearch = async () => {
    dispatch({ type: SET_SEARCH_TERM, payload: searchTerm });
    const result = await getIngredients(searchTerm);
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
      <div className="pantrySearchBar">
        <div className="innerPantrySearch">
          <input
            className="searchInput"
            type="text"
            placeholder="Add items to your pantry"
            value={searchTerm}
            onInput={onInput}
            onKeyUp={onEnter}
          ></input>
          <button onClick={onClick} className="clearBtn">
            X
          </button>
        </div>
        <button onClick={onSubmitSearch}>Search</button>
      </div>
    </>
  );
};

export default SearchBar;
