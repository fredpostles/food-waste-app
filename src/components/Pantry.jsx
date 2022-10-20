import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { generateRandomID } from "../utils";
import PantryItem from "./Pantry/PantryItem";
import Navigation from "./Navigation";
import SearchBar from "./Pantry/SearchBar";
import SearchResults from "./Pantry/SearchResults";
import { ADD_PANTRY_ITEM, ALPHABETICAL_SORT } from "../redux/types";

const Pantry = () => {
  const pantryItems = useSelector((state) => state.pantryItems);
  const dispatch = useDispatch();
  const [searchTerm, setSearchterm] = useState("");
  const [suggestions, setSuggestions] = useState("");

  const addPantryItem = (item) => {
    dispatch({ type: ADD_PANTRY_ITEM, payload: item });
  };

  const azSort = () => {
    return pantryItems.sort();
  };

  const zaSort = () => {
    return pantryItems.reverse();
  };

  const sortDateDesc = () => {
    return pantryItems.sort(function (a, b) {
      return a.dateAdded - b.dateAdded;
    });
  };

  const sortDateAsc = () => {
    return pantryItems.sort(function (a, b) {
      return b.dateAdded - a.dateAdded;
    });
  };

  return (
    <>
      <Navigation />
      <div className="pantry__container">
        <h1>Pantry</h1>
        <SearchBar
          searchTerm={searchTerm}
          setSearchterm={setSearchterm}
          setSuggestions={setSuggestions}
        />
        <div className="searchResults__container">
          <ul className="suggestions__list">
            {suggestions &&
              suggestions.map((item) => {
                return (
                  <>
                    <li>
                      <SearchResults
                        item={item}
                        key={generateRandomID(32)}
                        addPantryItem={addPantryItem}
                      />
                    </li>
                  </>
                );
              })}
            {searchTerm && !suggestions && (
              <>
                <p>Sorry, we didn't find anything for that search term.</p>{" "}
                <p>Try searching for something else.</p>
              </>
            )}
          </ul>
        </div>
        <div className="pantryItems__container">
          <h3>My Pantry Items:</h3>
          {pantryItems.length > 0 && (
            <label htmlFor="sortPantryItems">
              Sort:{" "}
              <select name="sortPantryItems" id="sortPantryItems">
                <option value="default">Default</option>
                <option value="A-Z" onClick={azSort}>
                  A-Z
                </option>
                <option value="Z-A" onClick={zaSort}>
                  Z-A
                </option>
                <option value="dateDesc" onClick={sortDateDesc}>
                  Newest first
                </option>
                <option value="dateAsc" onClick={sortDateAsc}>
                  Oldest first
                </option>
              </select>
            </label>
          )}
          <div className="itemsGrid">
            {pantryItems.map((item) => {
              return <PantryItem item={item} key={generateRandomID(32)} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Pantry;
