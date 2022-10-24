import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { generateRandomID } from "../utils";
import PantryItem from "./Pantry/PantryItem";
import Navigation from "./Navigation";
import SearchBar from "./Pantry/SearchBar";
import SearchResults from "./Pantry/SearchResults";
import { ADD_PANTRY_ITEM } from "../redux/types";

const Pantry = () => {
  const pantryItems = useSelector((state) => state.pantryItems);
  const dispatch = useDispatch();
  const [searchTerm, setSearchterm] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [sort, setSort] = useState("");

  const addPantryItem = (item) => {
    dispatch({ type: ADD_PANTRY_ITEM, payload: item });
  };

  const filterChange = (e) => {
    setSort(e.target.value);
  };

  let sortedData = [...pantryItems];

  if (sort) {
    switch (sort) {
      case "azSort":
        sortedData.sort((a, b) => {
          return a.itemName > b.itemName;
        });
        break;

      case "zaSort":
        sortedData.reverse();

        break;

      case "sortDateAsc":
        sortedData.sort(function (a, b) {
          return b.dateAdded - a.dateAdded;
        });
        break;

      case "sortDateDesc":
        console.log("before", sortedData);
        sortedData.sort(function (a, b) {
          return a.dateAdded - b.dateAdded;
        });
        console.log("after", sortedData);

        break;

      default:
        break;
    }
  }

  return (
    <>
      <Navigation />
      <div className="pantry__section__container">
        <div className="pantrySearch__container">
          <h1>Pantry</h1>
          <h2>Search for items to add to your pantry:</h2>
          <SearchBar
            searchTerm={searchTerm}
            setSearchterm={setSearchterm}
            setSuggestions={setSuggestions}
          />
          {suggestions && (
            <div className="searchResults__container">
              <ul className="suggestions__list">
                {suggestions &&
                  suggestions.map((item) => {
                    return (
                      <>
                        <li className="suggestionItem">
                          <SearchResults
                            item={item}
                            key={generateRandomID(32)}
                            addPantryItem={addPantryItem}
                          />
                        </li>
                      </>
                    );
                  })}
                {suggestions && suggestions.length < 1 && (
                  <>
                    <p>Sorry, we didn't find anything for that search term.</p>{" "}
                    <p>Try searching for something else.</p>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
        {pantryItems.length > 0 && (
          <div className="myPantry__container">
            <h1>My Pantry Items:</h1>
            {pantryItems.length > 0 && (
              <label htmlFor="sortPantryItems">
                Sort by:{" "}
                <select
                  name="sortPantryItems"
                  id="sortPantryItems"
                  onChange={filterChange}
                >
                  <option value="default">Default</option>
                  <option value="azSort">A-Z</option>
                  <option value="zaSort">Z-A</option>
                  <option value="sortDateDesc">Newest first</option>
                  <option value="sortDateAsc">Oldest first</option>
                </select>
              </label>
            )}
            <div className="pantryItems__container">
              {sortedData.map((item) => {
                return (
                  <PantryItem
                    item={item}
                    key={generateRandomID(32)}
                    setSuggestions={setSuggestions}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Pantry;
