import React from "react";
import { useDispatch } from "react-redux";
import { getIngredients } from "../../../apiCalls/dataFetching";
import { SET_SEARCH_TERM } from "../../../redux/types";

const SearchBar = ({ searchTerm, setSearchterm, setSuggestions }) => {
  const dispatch = useDispatch();

  const onInput = (e) => {
    setSearchterm(e.target.value);
  };

  const onSubmitSearch = async () => {
    dispatch({ type: SET_SEARCH_TERM, payload: searchTerm });
    const result = await getIngredients(searchTerm);
    console.log(result);
    setSuggestions(result);
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
        <input
          className="searchInput"
          type="text"
          placeholder="Add items to your pantry"
          value={searchTerm}
          onInput={onInput}
          onKeyUp={onEnter}
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
    </>
  );
};

export default SearchBar;
