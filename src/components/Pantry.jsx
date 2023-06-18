import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Navigation from "./Navigation";
import PantrySearch from "./Pantry/PantrySearch";
import MyPantry from "./Pantry/MyPantry";
import PantryItemTemplate from "./Pantry/PantryItemTemplate";
import LoadingModal from "./Modal/LoadingModal";
import { getUser, getAllPantryitems } from "../apiCalls/backendAPI";

const Pantry = () => {
  const [suggestions, setSuggestions] = useState();
  const token = useSelector((state) => state.token);
  const [userPreferences, setUserPreferences] = useState(null);
  const [pantryItems, setPantryItems] = useState([]);
  const [pantryItemsChanged, setPantryItemsChanged] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoaded(false);

        const userData = await getUser(token);
        setUserPreferences(userData.preferences);

        const { pantryResults } = await getAllPantryitems(token);
        setPantryItems(pantryResults);

        setIsLoaded(true);
      } catch (error) {
        console.log(error);
        setIsLoaded(true);
      }
    };

    fetchData();
  }, [token, pantryItemsChanged]);

  return (
    <>
      <Navigation />
      <div className="pantry__section__container">
        <PantrySearch
          suggestions={suggestions}
          setSuggestions={setSuggestions}
          pantryItems={pantryItems}
          setPantryItems={setPantryItems}
          setPantryItemsChanged={setPantryItemsChanged}
        />
        {pantryItems && pantryItems.length > 0 ? (
          <MyPantry
            setSuggestions={setSuggestions}
            pantryItems={pantryItems}
            setPantryItems={setPantryItems}
            userPreferences={userPreferences}
            setPantryItemsChanged={setPantryItemsChanged}
          />
        ) : (
          <PantryItemTemplate />
        )}
        {!isLoaded ? <LoadingModal /> : null}
      </div>
    </>
  );
};

export default Pantry;
