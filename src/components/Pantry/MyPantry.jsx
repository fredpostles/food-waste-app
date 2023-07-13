import React, { useState, useEffect, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import { SET_INGREDIENT_SEARCH, SET_RECIPE_INFO } from "../../redux/types";
import {
  getRecipeByIngredient,
  getRecipeInformationBulk,
} from "../../apiCalls/dataFetching";
import { checkUserPrefs } from "../../utils";
import { useNavigate } from "react-router-dom";
import PantrySortSelection from "./MyPantry/PantrySortSelection";
import LoadingModal from "../Modal/LoadingModal";

const PantryItem = lazy(() => import("./MyPantry/PantryItem"));

const MyPantry = ({
  setSuggestions,
  pantryItems,
  setPantryItems,
  userPreferences,
  setPantryItemsChanged,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sort, setSort] = useState("");
  const [isLoaded, setIsLoaded] = useState(true);
  // const pantryItems = useSelector((state) => state.pantryItems);
  const [randomMessage, setRandomMessage] = useState("");

  useEffect(() => {
    // possible messages to display in "use pantry" buton
    const messagesArray = [
      "Use as many pantry items as possible",
      "Use up my pantry!",
      "What can I make with what I've got?",
      "Find recipes using what I have",
      "Show me recipes that use my pantry items",
    ];

    // get random index value
    const randomIndex = Math.floor(Math.random() * messagesArray.length);

    // set random message
    setRandomMessage(messagesArray[randomIndex]);
  }, []);

  // copy of pantry items to be used for sorting data
  let sortedData = [...pantryItems];

  // function to set sort order
  const filterChange = (e) => {
    setSort(e.target.value);
  };

  // change sort order depending on user selected order
  if (sort) {
    switch (sort) {
      case "azSort":
        sortedData.sort((a, b) => {
          return a.name > b.name;
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
        sortedData.sort(function (a, b) {
          return a.dateAdded - b.dateAdded;
        });
        break;

      case "default":
        sortedData = [...pantryItems];
        break;

      default:
        break;
    }
  }

  const onUsePantry = async () => {
    // show loading modal
    setIsLoaded(false);

    // get string of pantry items to send to API to find matching recipes
    const wholePantry = sortedData
      .map((item) => {
        const itemName = item.name.replace(/\s+/g, "+"); // Replace spaces with plus sign
        return itemName;
      })
      .join(",");
    console.log("wholePantry", wholePantry);

    // send to API
    const result = await getRecipeByIngredient(wholePantry);

    // extract IDs from the recipes returned by API
    const idsToSearch = result.map((item) => item.id);

    // send IDs to function that calls API to get recipe info
    const infoForRecipes = await getRecipeInformationBulk(idsToSearch);

    // filter for recipes that match user's dietary prefs, using recipe info
    const filteredRecipes = checkUserPrefs(userPreferences, infoForRecipes);

    // extract IDs of recipes that match dietary prefs
    const filteredIds = filteredRecipes.map((item) => item.id);

    // find these recipes in original array by ID
    const recipesToDisplay = result.filter((element) =>
      filteredIds.includes(element.id)
    );

    // send result (array of recipes returned) to store
    dispatch({ type: SET_INGREDIENT_SEARCH, payload: recipesToDisplay });

    // send extra info for matching recipes to store
    dispatch({ type: SET_RECIPE_INFO, payload: filteredRecipes });

    // set screen to recipe search
    navigate("/recipe-search");

    // close loading modal
    setIsLoaded(true);
  };

  return (
    <div className="myPantry__container">
      <h3>My Pantry Items:</h3>
      {pantryItems && pantryItems.length > 1 ? (
        <PantrySortSelection filterChange={filterChange} />
      ) : null}
      {pantryItems && pantryItems.length > 1 ? (
        <div className="wholePantrySearch__container">
          <button
            data-testid="searchButton"
            onClick={onUsePantry}
            className="wholePantrySearchBtn"
            title="Search for recipes using as many pantry ingredients as possible"
          >
            {randomMessage}
          </button>
        </div>
      ) : null}
      <div className="pantryItems__container">
        {sortedData &&
          sortedData.map((item) => {
            return (
              <Suspense fallback={<LoadingModal />} key={item.id}>
                <PantryItem
                  item={item}
                  setSuggestions={setSuggestions}
                  setIsLoaded={setIsLoaded}
                  pantryItems={pantryItems}
                  setPantryItems={setPantryItems}
                  userPreferences={userPreferences}
                  setPantryItemsChanged={setPantryItemsChanged}
                />
              </Suspense>
            );
          })}
      </div>
      {!isLoaded ? <LoadingModal /> : null}
    </div>
  );
};

export default MyPantry;
