import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { DELETE_RECIPE } from "../../redux/types";
import { capitalizeFirstLetter } from "../../utils";

const Recipe = ({ savedRecipe }) => {
  const recipe = savedRecipe;
  const dispatch = useDispatch();
  const [showRecipeMethod, setShowRecipeMethod] = useState(false);

  const onDelete = () => {
    dispatch({ type: DELETE_RECIPE, payload: recipe.id });
  };

  const displayRecipeMethod = () => {
    setShowRecipeMethod(!showRecipeMethod);
  };
  console.log(recipe);
  return (
    <div className="singleRecipe__container">
      <h4>{capitalizeFirstLetter(recipe.title)}</h4>
      <img
        src={recipe.image}
        alt={recipe.name}
        className="savedRecipes recipeImage"
      />
      <div className="recipeItem text_section">
        <div className="recipeInfo__container">
          <ul className="recipeInfo__list">
            <li>Ready in {recipe.readyInMinutes} minutes</li>
            <li>Serves {recipe.servings}</li>
          </ul>
        </div>
        {showRecipeMethod ? (
          <div className="recipeMethod__container">
            <h5>Method:</h5>
            <ol>
              {recipe.analyzedInstructions[0].steps.map((element) => {
                return <li key={element.number}>{element.step}</li>;
              })}
            </ol>
          </div>
        ) : null}
        <small>
          <a href={recipe.sourceUrl}>Source</a>
        </small>
      </div>
      <div className="savedRecipe__buttons">
        <button onClick={displayRecipeMethod} className="seeMethodBtn">
          {showRecipeMethod ? "Hide method" : "See method"}
        </button>
        <button onClick={onDelete} className="deleteBtn">
          Delete recipe
        </button>
      </div>
    </div>
  );
};

export default Recipe;
