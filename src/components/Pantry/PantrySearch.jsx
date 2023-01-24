import React, { useState } from "react";
import SearchBar from "./PantrySearch/SearchBar";
import SearchSuggestions from "./PantrySearch/SearchSuggestions";

const PantrySearch = ({ suggestions, setSuggestions }) => {
  const [searchTerm, setSearchterm] = useState("");
  return (
    <div className="pantrySearch__container">
      <div className="pantrySearch__container__header">
        <h1>Pantry</h1>
        <h2>Search for items to add to your pantry:</h2>
      </div>
      <div className="innerPantrySearch">
        <SearchBar
          searchTerm={searchTerm}
          setSearchterm={setSearchterm}
          setSuggestions={setSuggestions}
        />
        {suggestions && <SearchSuggestions suggestions={suggestions} />}
      </div>
    </div>
  );
};

export default PantrySearch;
