import React from "react";
import NoResults from "./NoResults";
import SearchResults from "./SearchResults";
import { useDispatch } from "react-redux";
import { ADD_PANTRY_ITEM } from "../../redux/types";

const SearchSuggestions = (props) => {
  const dispatch = useDispatch();

  const addPantryItem = (item) => {
    dispatch({ type: ADD_PANTRY_ITEM, payload: item });
  };
  return (
    <div className="searchResults__container">
      <ul className="suggestions__list">
        {props.suggestions &&
          props.suggestions.map((item, index) => {
            return (
              <li className="suggestionItem" key={index}>
                <SearchResults item={item} addPantryItem={addPantryItem} />
              </li>
            );
          })}
        {props.uggestions && props.suggestions.length < 1 && <NoResults />}
      </ul>
    </div>
  );
};

export default SearchSuggestions;
