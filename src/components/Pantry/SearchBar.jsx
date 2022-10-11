import React from "react";
import { useDispatch } from "react-redux";
import { getIngredients } from "../../api/dataFetching";
import { SET_SEARCH_TERM } from "../../redux/types";

const SearchBar = ({ searchTerm, setSearchterm, setSuggestions }) => {
  const dispatch = useDispatch();

  const onInput = (e) => {
    setSearchterm(e.target.value);
    console.log(e.target.value);
  };

  const onSubmitSearch = async () => {
    dispatch({ type: SET_SEARCH_TERM, payload: searchTerm });
    const result = await getIngredients(searchTerm);
    setSuggestions(result);
    setSearchterm("");
  };

  return (
    <>
      <div className="pantrySearch">
        <input
          className="searchInput"
          type="text"
          placeholder="Search for pantry items"
          value={searchTerm}
          onInput={onInput}
        ></input>
        <button onClick={onSubmitSearch}>Search</button>
      </div>
    </>
  );
};

export default SearchBar;
