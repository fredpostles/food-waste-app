import React, { useState } from "react";
import SearchBar from "./PantrySearch/SearchBar";
import SearchSuggestions from "./PantrySearch/SearchSuggestions";

const PantrySearch = ({
  suggestions,
  setSuggestions,
  pantryItems,
  setPantryItems,
  setPantryItemsChanged,
}) => {
  const [searchTerm, setSearchterm] = useState("");
  return (
    <div className="pantrySearch__container">
      <div className="pantrySearch__container__header">
        <h1 className="section__heading">Pantry</h1>
        <h2>Search for items to add to your pantry:</h2>
      </div>
      <div className="innerPantrySearch">
        <SearchBar
          searchTerm={searchTerm}
          setSearchterm={setSearchterm}
          setSuggestions={setSuggestions}
        />
        {suggestions ? (
          <SearchSuggestions
            suggestions={suggestions}
            pantryItems={pantryItems}
            setPantryItems={setPantryItems}
            setPantryItemsChanged={setPantryItemsChanged}
          />
        ) : null}
      </div>
    </div>
  );
};

export default PantrySearch;
