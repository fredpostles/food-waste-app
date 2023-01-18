import React, { useState } from "react";
import SearchBar from "./SearchBar";
import SearchSuggestions from "./SearchSuggestions";

const PantrySearch = (props) => {
  const [searchTerm, setSearchterm] = useState("");
  return (
    <div className="pantrySearch__container">
      <div className="pantrySearch__container__header">
        <h1>Pantry</h1>
        <h2>Search for items to add to your pantry:</h2>
      </div>
      <SearchBar
        searchTerm={searchTerm}
        setSearchterm={setSearchterm}
        setSuggestions={props.setSuggestions}
      />
      {props.suggestions && (
        <SearchSuggestions suggestions={props.suggestions} />
      )}
    </div>
  );
};

export default PantrySearch;
