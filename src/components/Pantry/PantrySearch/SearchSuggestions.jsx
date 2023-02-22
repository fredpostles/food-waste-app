import React, { useState } from "react";
// import { useSelector } from "react-redux";
import NoResults from "./SearchSuggestions/NoResults";
import SearchResults from "./SearchSuggestions/SearchResults";
import { useDispatch } from "react-redux";
import { ADD_PANTRY_ITEM } from "../../../redux/types";
import ShowMoreButton from "../../Buttons/ShowMoreButton";
import ShowLessButton from "../../Buttons/ShowLessButton";

const SearchSuggestions = ({ suggestions }) => {
  const dispatch = useDispatch();
  const [showMore, setShowMore] = useState(9);

  // check if item is already in pantry
  // if yes show checkmark in its SearchResults item
  // if no show plus

  const addPantryItem = (item) => {
    dispatch({ type: ADD_PANTRY_ITEM, payload: item });
  };

  const onShowMore = () => {
    setShowMore(showMore + 5);
  };

  const onShowLess = () => {
    if (showMore <= 14) {
      setShowMore(9);
    } else {
      setShowMore(showMore - 5);
    }
  };

  return (
    <div className="suggestions__container">
      <ul className="suggestions__list">
        {suggestions &&
          suggestions.map((item, index) => {
            if (index > showMore) return;
            else
              return (
                <li className="suggestionItem" key={index}>
                  <SearchResults item={item} addPantryItem={addPantryItem} />
                </li>
              );
          })}
        {suggestions && suggestions.length < 1 && <NoResults />}
      </ul>
      {suggestions && suggestions.length > 9 && (
        <ShowMoreButton onShowMore={onShowMore} />
      )}
      {suggestions && showMore >= 14 && (
        <ShowLessButton onShowLess={onShowLess} />
      )}
    </div>
  );
};

export default SearchSuggestions;
