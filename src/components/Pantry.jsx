import React, { useState } from "react";
import { useSelector } from "react-redux";
import { generateRandomID } from "../utils";
import PantryItem from "./Pantry/PantryItem";
import Navigation from "./Navigation";
import SearchBar from "./Pantry/SearchBar";
import SearchResult from "./Pantry/SearchResults";
import { getItem } from "../localStorage";

const Pantry = () => {
  const pantryItems = useSelector((state) => state.data.pantryItems);
  const [searchTerm, setSearchterm] = useState("");
  const [suggestions, setSuggestions] = useState();

  const addInventoryItem = (item) => {
    console.log(item);
  };

  console.log(suggestions);
  return (
    <>
      <div className="pantry__container">
        <Navigation />
        <h1>Pantry</h1>
        <SearchBar
          searchTerm={searchTerm}
          setSearchterm={setSearchterm}
          setSuggestions={setSuggestions}
        />
        {suggestions &&
          suggestions.map((item) => {
            return (
              <SearchResult
                item={item}
                key={item.id}
                addInventoryItem={addInventoryItem}
              />
            );
          })}
        <div className="pantryItems__container">
          <h3>My Pantry Items:</h3>
          {pantryItems.map((item) => {
            return <PantryItem item={item} key={generateRandomID(34)} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Pantry;
