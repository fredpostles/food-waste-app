import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_RECIPE, UNSAVE_RECIPE } from "../../../redux/types";
import AdditionalIngredients from "./SingleRecipeResult/AdditionalIngredients";
import UsedIngredients from "./SingleRecipeResult/UsedIngredients";
import { capitalizeFirstLetter } from "../../../utils";

const SingleRecipeResult = ({ recipe }) => {
  const dispatch = useDispatch();
  const recipeInfo = useSelector((state) => state.recipeInfo);
  const [showRecipeMethod, setShowRecipeMethod] = useState(false);
  const savedRecipes = useSelector((state) => state.savedRecipes);

  const onSaveRecipe = () => {
    dispatch({ type: SAVE_RECIPE, payload: recipeInfo[indexOfItem] });
  };

  const onUnsaveRecipe = () => {
    dispatch({ type: UNSAVE_RECIPE, payload: recipe.id });
  };

  const displayRecipeMethod = () => {
    setShowRecipeMethod(!showRecipeMethod);
  };

  const indexOfItem = recipeInfo.findIndex(
    (element) => element.id === recipe.id
  );

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
          </div>
        ) : null}
        {recipe && recipe.usedIngredients && (
          <UsedIngredients recipe={recipe} />
        )}
        <AdditionalIngredients recipe={recipe} />
        {showRecipeMethod ? (
          <div className="recipeMethod__container">
            <h5>Method:</h5>
            {recipeInfo[indexOfItem].analyzedInstructions.length === 0 &&
            recipeInfo[indexOfItem].instructions ? (
              <p>{recipeInfo[indexOfItem].instructions}</p>
            ) : recipeInfo[indexOfItem].analyzedInstructions.length === 0 &&
              !recipeInfo[indexOfItem].instructions ? (
              <p>Oops! No method to show...</p>
            ) : null}
            {recipeInfo[indexOfItem].analyzedInstructions.length > 0 ? (
              <ol>
                {recipeInfo[indexOfItem].analyzedInstructions[0].steps.map(
                  (element) => {
                    return <li key={element.number}>{element.step}</li>;
                  }
                )}
              </ol>
            ) : null}
          </div>
        ) : null}
      </div>
      {/* Remove source as Foodista links seem to redirect to spam websites*/}
      {/* {recipeInfo[indexOfItem] ? (
        <small>
          <a href={recipeInfo[indexOfItem].sourceUrl}>Source</a>
        </small>
      ) : null} */}
      <div className="recipeButtons">
        <button onClick={displayRecipeMethod} className="seeMethodBtn">
          {showRecipeMethod ? "Hide method" : "See method"}
        </button>
        {/* <button onClick={() => console.log(recipeInfo[indexOfItem])}>
          Console log info for this recipe
        </button> */}
        {savedRecipes.some((element) => element.id === recipe.id) ? (
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
