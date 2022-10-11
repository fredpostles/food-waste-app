import React, { useState } from "react";
import Navigation from "./Navigation";
import { SET_SEARCH_TERM } from "../redux/types";
import { useDispatch } from "react-redux";

const Search = () => {
  const [searchTerm, setSearchterm] = useState();
  const dispatch = useDispatch();

  const onInput = (e) => {
    setSearchterm(e.target.value);
    console.log(e.target.value);
  };

  const onSearch = () => {
    dispatch({ type: SET_SEARCH_TERM, payload: searchTerm });
  };

  return (
    <>
      <h1>Search for recipes</h1>
      <input
        name="search"
        type="text"
        placeholder="Search for recipes"
        value={searchTerm}
        onInput={onInput}
      ></input>
      <button onClick={onSearch}>Search</button>
      <Navigation />
    </>
  );
};

export default Search;
