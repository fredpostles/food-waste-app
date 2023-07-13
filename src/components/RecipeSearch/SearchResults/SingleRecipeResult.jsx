import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AdditionalIngredients from "./SingleRecipeResult/AdditionalIngredients";
import UsedIngredients from "./SingleRecipeResult/UsedIngredients";
import { capitalizeFirstLetter } from "../../../utils";
import {
  deleteSavedRecipe,
  getSavedRecipes,
  saveRecipe,
} from "../../../apiCalls/backendAPI";

const SingleRecipeResult = ({
  recipe,
  openModal,
  setOpenModal,
  getModalContent,
  setIsLoaded,
}) => {
  const recipeInfo = useSelector((state) => state.recipeInfo);
  const token = useSelector((state) => state.token);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [savedRecipeCounter, setSavedRecipeCounter] = useState(0);

  const indexOfItem = recipeInfo.findIndex(
    (element) => element.id === recipe.id
  );

  useEffect(() => {
    // start loading modal
    setIsLoaded(false);
    // get saved recipe data
    const fetchSavedRecipes = async () => {
      try {
        // make call to backend via API
        const { savedRecipeResults } = await getSavedRecipes(token);
        // set saved recipes to state
        setSavedRecipes(savedRecipeResults);
        // end loading modal
        setIsLoaded(true);
      } catch (error) {
        console.log("error fetching saved recipes:", error);
        // end loading modal if error
        setIsLoaded(true);
      }
    };

    fetchSavedRecipes();
  }, [savedRecipeCounter, setIsLoaded, token]);

  const onSaveRecipe = async () => {
    try {
      // send recipe to DB and await response
      await saveRecipe(recipeInfo[indexOfItem], token);
      // update savedRecipes state
      const updatedSavedRecipes = [...savedRecipes, recipeInfo[indexOfItem]];
      setSavedRecipes(updatedSavedRecipes);
      // increase counter
      setSavedRecipeCounter(savedRecipeCounter + 1);
    } catch (error) {
      console.log("onSaveRecipe error:", error);
    }
  };

  const onUnsaveRecipe = async () => {
    try {
      // delete recipe from DB and await response
      await deleteSavedRecipe(token, recipe.id);
      // Update the savedRecipes state
      const updatedSavedRecipes = savedRecipes.filter(
        (element) => element.id !== recipe.id
      );
      setSavedRecipes(updatedSavedRecipes);
      // decrease counter
      setSavedRecipeCounter(savedRecipeCounter - 1);
    } catch (error) {
      console.log("onUnsaveRecipe error:", error);
    }
  };

  // when user clicks on show method, open modal and send it the right content
  const displayRecipeMethod = () => {
    setOpenModal(!openModal);
    getModalContent(recipe, recipeInfo[indexOfItem]);
  };

  return (
    <>
      <h2>{capitalizeFirstLetter(recipe.title)}</h2>
      <div className="recipeSearch imageContainer">
        <img
          loading="lazy"
          src={recipe.image}
          alt={recipe.title}
          className="recipeImage"
        />
      </div>
      <div className="recipeItem text_section">
        {recipeInfo[indexOfItem] ? (
          <div className="recipeInfo__container">
            <ul className="recipeInfo__list">
              <li>Ready in {recipeInfo[indexOfItem].readyInMinutes} minutes</li>
              <li>Serves {recipeInfo[indexOfItem].servings}</li>
            </ul>
          </div>
        ) : null}
        {recipeInfo[indexOfItem].diets &&
        recipeInfo[indexOfItem].diets.length > 0 ? (
          <div className="recipeInfo__diets">
            <p className="sub-heading"> Suitable for the following diets:</p>
            <ul className="typographic">
              {recipeInfo[indexOfItem].diets.map((diet, index) => (
                <li key={index} className="diet">
                  {capitalizeFirstLetter(diet)}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {recipe && recipe.usedIngredients && (
          <UsedIngredients recipe={recipe} />
        )}
        <AdditionalIngredients recipe={recipe} />
      </div>
      <div className="recipeButtons">
        <button onClick={displayRecipeMethod} className="seeMethodBtn">
          See method{" "}
        </button>
        {savedRecipes &&
        savedRecipes.some((element) => element.id === recipe.id) ? (
          <button onClick={onUnsaveRecipe} className="unsaveRecipeBtn">
            Remove from saved recipes
          </button>
        ) : (
          <button onClick={onSaveRecipe} className="saveRecipeBtn">
            Save recipe
          </button>
        )}
      </div>
    </>
  );
};

export default SingleRecipeResult;
