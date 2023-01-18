import React, { useState } from "react";
import { useSelector } from "react-redux";

import Navigation from "./Navigation";
import PantrySearch from "./Pantry/PantrySearch";
import MyPantry from "./Pantry/MyPantry";

const Pantry = () => {
  const pantryItems = useSelector((state) => state.pantryItems);
  const [suggestions, setSuggestions] = useState("");

  return (
    <>
      <Navigation />
      <div className="pantry__section__container">
        <PantrySearch
          suggestions={suggestions}
          setSuggestions={setSuggestions}
        />
        {pantryItems && pantryItems.length > 0 && (
          <MyPantry setSuggestions={setSuggestions} />
        )}
      </div>
    </>
  );
};

export default Pantry;
