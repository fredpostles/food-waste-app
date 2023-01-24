import React, { useState } from "react";
// import { useSelector } from "react-redux";
import NoResults from "./NoResults";
import SearchResults from "./SearchResults";
import { useDispatch } from "react-redux";
import { ADD_PANTRY_ITEM } from "../../../redux/types";
import ShowMoreButton from "../../Buttons/ShowMoreButton";
import ShowLessButton from "../../Buttons/ShowLessButton";

const SearchSuggestions = (props) => {
  const dispatch = useDispatch();
  // const pantryItems = useSelector((state) => state.pantryItems);
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
        {props.suggestions &&
          props.suggestions.map((item, index) => {
            if (index > showMore) return;
            else
              return (
                <li className="suggestionItem" key={index}>
                  <SearchResults item={item} addPantryItem={addPantryItem} />
                </li>
              );
          })}
        {props.suggestions && props.suggestions.length < 1 && <NoResults />}
      </ul>
      {props.suggestions && <ShowMoreButton onShowMore={onShowMore} />}
      {props.suggestions && showMore >= 14 && (
        <ShowLessButton onShowLess={onShowLess} />
      )}
    </div>
  );
};

export default SearchSuggestions;
