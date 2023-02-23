import React, { useState } from "react";
import NoResults from "./SearchSuggestions/NoResults";
import SearchResult from "./SearchSuggestions/SearchResult";
import { useDispatch } from "react-redux";
import { ADD_PANTRY_ITEM } from "../../../redux/types";
import ShowMoreButton from "../../Buttons/ShowMoreButton";
import ShowLessButton from "../../Buttons/ShowLessButton";

const SearchSuggestions = ({ suggestions }) => {
  const dispatch = useDispatch();
  const [showMore, setShowMore] = useState(9);

  const addPantryItem = (item) => {
    dispatch({ type: ADD_PANTRY_ITEM, payload: item });
  };

  const onShowMore = () => {
    suggestions.length > showMore + 1
      ? setShowMore(showMore + 5)
      : setShowMore(showMore);
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
        {suggestions
          ? suggestions.map((item, index) => {
              if (index > showMore) return;
              else
                return (
                  <li className="suggestionItem" key={index}>
                    <SearchResult item={item} addPantryItem={addPantryItem} />
                  </li>
                );
            })
          : null}
        {suggestions && suggestions.length === 0 ? <NoResults /> : null}
      </ul>
      {suggestions.length <= showMore + 1 ? null : (
        <ShowMoreButton onShowMore={onShowMore} />
      )}
      {suggestions && showMore >= 14 && (
        <ShowLessButton onShowLess={onShowLess} />
      )}
    </div>
  );
};

export default SearchSuggestions;
