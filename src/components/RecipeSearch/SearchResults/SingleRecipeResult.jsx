import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_RECIPE } from "../../../redux/types";
import AdditionalIngredients from "./SingleRecipeResult/AdditionalIngredients";
import UsedIngredients from "./SingleRecipeResult/UsedIngredients";
import { capitalizeFirstLetter } from "../../../utils";

const SingleRecipeResult = ({ recipe }) => {
  const dispatch = useDispatch();
  const recipeInfo = useSelector((state) => state.recipeInfo);
  const [showRecipeMethod, setShowRecipeMethod] = useState(false);

  const onSaveRecipe = () => {
    dispatch({ type: SAVE_RECIPE, payload: recipe });
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
        {recipe.usedIngredients && <UsedIngredients recipe={recipe} />}
        <AdditionalIngredients recipe={recipe} />
        {showRecipeMethod ? (
          <div className="recipeMethod__container">
            <h5>Method:</h5>
            <ol>
              {recipeInfo[indexOfItem].analyzedInstructions[0].steps.map(
                (element) => {
                  return <li key={element.number}>{element.step}</li>;
                }
              )}
            </ol>
          </div>
        ) : null}
      </div>
      {recipeInfo[indexOfItem] ? (
        <small>
          <a href={recipeInfo[indexOfItem].sourceUrl}>Source</a>
        </small>
      ) : null}
      <div className="recipeButtons">
        <button onClick={displayRecipeMethod} className="seeMethodBtn">
          {showRecipeMethod ? "Hide method" : "See method"}
        </button>
        <button onClick={() => console.log(recipeInfo[indexOfItem])}>
          Console log recipeInfo for this recipe
        </button>
        <button onClick={onSaveRecipe} className="saveRecipeBtn">
          Save recipe
        </button>
      </div>
    </>
  );
};

export default SingleRecipeResult;
