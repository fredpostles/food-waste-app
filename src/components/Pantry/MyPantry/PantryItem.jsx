import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  DELETE_PANTRY_ITEM,
  SET_INGREDIENT_SEARCH,
  SET_RECIPE_INFO,
} from "../../../redux/types";
import {
  getRecipeByIngredient,
  getRecipeInformationBulk,
} from "../../../apiCalls/dataFetching";
import PantryItemImage from "./PantryItem/PantryItemImage";
import PantryItemBody from "./PantryItem/PantryItemBody";
import { checkUserPrefs } from "../../../utils";
import { getUser } from "../../../apiCalls/backendAPI";

const PantryItem = ({ item, setIsLoaded }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const [user, setUser] = useState(null);
  const [userPreferences, setUserPreferences] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserPreferences = async () => {
      try {
        const userData = await getUser(token);
        setUser(userData);
        setUserPreferences(userData.preferences);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserPreferences();
  }, [token]);

  const onDelete = () => {
    dispatch({ type: DELETE_PANTRY_ITEM, payload: item.id });
  };

  // search for recipes using current pantry item
  const onRecipeSearch = async () => {
    // show loading modal
    setIsLoaded(false);

    // send item name to API to get matching recipes
    const result = await getRecipeByIngredient(item.itemName);

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

    // send array of results to store
    dispatch({ type: SET_INGREDIENT_SEARCH, payload: recipesToDisplay });

    // send recipe info to store
    dispatch({ type: SET_RECIPE_INFO, payload: filteredRecipes });

    // change screen to Recipe Search
    navigate("/recipe-search");

    // close loading modal
    setIsLoaded(true);
  };

  return (
    <>
      <div className="pantryItem__container">
        <PantryItemImage item={item} />
        <PantryItemBody
          item={item}
          onDelete={onDelete}
          onRecipeSearch={onRecipeSearch}
        />
      </div>
    </>
  );
};

export default PantryItem;
