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
  showRecipeMethod,
  setShowRecipeMethod,
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

  const dietsArray = recipeInfo[indexOfItem].diets;

  useEffect(() => {
    setIsLoaded(false);
    const fetchSavedRecipes = async () => {
      try {
        const { savedRecipeResults } = await getSavedRecipes(token);
        console.log("savedRecipeResults", savedRecipeResults);
        setSavedRecipes(savedRecipeResults);
        setIsLoaded(true);
      } catch (error) {
        console.log("error fetching saved recipes:", error);
        setIsLoaded(true);
      }
    };

    fetchSavedRecipes();
  }, [savedRecipeCounter]);

  const onSaveRecipe = async () => {
    try {
      await saveRecipe(recipeInfo[indexOfItem], token);
      // update savedRecipes state
      const updatedSavedRecipes = [...savedRecipes, recipeInfo[indexOfItem]];
      setSavedRecipes(updatedSavedRecipes);
      setSavedRecipeCounter(savedRecipeCounter + 1);
    } catch (error) {
      console.log("onSaveRecipe error:", error);
    }
  };

  const onUnsaveRecipe = async () => {
    try {
      await deleteSavedRecipe(token, recipe.id);
      // Update the savedRecipes state
      const updatedSavedRecipes = savedRecipes.filter(
        (element) => element.id !== recipe.id
      );
      setSavedRecipes(updatedSavedRecipes);
      setSavedRecipeCounter(savedRecipeCounter - 1);
    } catch (error) {
      console.log("onUnsaveRecipe error:", error);
    }
  };

  const displayRecipeMethod = () => {
    setShowRecipeMethod(!showRecipeMethod);
    setOpenModal(!openModal);
    getModalContent(recipe, recipeInfo[indexOfItem]);
  };

  return (
    <>
      <h2>{capitalizeFirstLetter(recipe.title)}</h2>
      <div className="recipeSearch imageContainer">
        <img src={recipe.image} alt={recipe.title} className="recipeImage" />
      </div>
      <div className="recipeItem text_section">
        {recipeInfo[indexOfItem] ? (
          <div className="recipeInfo__container">
            <ul className="recipeInfo__list">
              <li>Ready in {recipeInfo[indexOfItem].readyInMinutes} minutes</li>
              <li>Serves {recipeInfo[indexOfItem].servings}</li>
            </ul>
            <button
              onClick={() => {
                console.log(recipeInfo[indexOfItem]);
              }}
            >
              Log recipeInfo
            </button>
          </div>
        ) : null}
        <div className="recipeInfo__list">
          <li>
            Suitable for the following diets:
            <ol>
              {recipeInfo[indexOfItem].diets.map((diet, index) => (
                <li key={index}>{capitalizeFirstLetter(diet)}</li>
              ))}
            </ol>
          </li>{" "}
        </div>
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
