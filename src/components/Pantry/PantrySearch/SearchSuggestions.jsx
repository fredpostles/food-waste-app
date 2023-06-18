import React, { useState } from "react";
import NoResults from "./SearchSuggestions/NoResults";
import SearchResult from "./SearchSuggestions/SearchResult";
import { useSelector } from "react-redux";
import ShowMoreButton from "../../Buttons/ShowMoreButton";
import ShowLessButton from "../../Buttons/ShowLessButton";
import { addToPantry } from "../../../apiCalls/backendAPI";

const SearchSuggestions = ({
  suggestions,
  pantryItems,
  setPantryItems,
  setPantryItemsChanged,
}) => {
  const [showMore, setShowMore] = useState(9);
  const token = useSelector((state) => state.token);

  const addPantryItem = async (item) => {
    console.log("pantry item", item);

    // if item already in pantry, return
    if (
      pantryItems.some(
        (element) => element.name === item.name && element.image === item.image
      )
    ) {
      console.log("Item already in pantry");
      return;
    } else {
      try {
        const result = await addToPantry(item, token);
        console.log("result of addToPantry call:", result);
        // Update pantry items state immediately
        setPantryItems((prevPantryItems) => [...prevPantryItems, item]);
      } catch (error) {
        console.log("error adding pantry item:", error);
      }
      setPantryItemsChanged(true);
    }
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
                    <SearchResult
                      item={item}
                      addPantryItem={addPantryItem}
                      pantryItems={pantryItems}
                    />
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
