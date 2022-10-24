import React from "react";
import { useDispatch } from "react-redux";
import { SAVE_RECIPE } from "../../redux/types";
import { generateRandomID } from "../../utils";
import { capitalizeFirstLetter } from "../../validation/utils";

const SearchResults = ({ recipe }) => {
  const dispatch = useDispatch();

  const onSaveRecipe = () => {
    dispatch({ type: SAVE_RECIPE, payload: recipe });
  };

  return (
    <>
      <h4>{recipe.title}</h4>
      <div className="recipeSearch imageContainer">
        <img src={recipe.image} alt={recipe.title} className="recipeImage" />
      </div>
      <div className="recipeItem text_section">
        <div className="additionalIngredients__list">
          <p className="sub-heading">Additional ingredients needed:</p>
          <ul className="typographic">
            {recipe.missedIngredients &&
              recipe.missedIngredients.map((missedIngredient) => {
                const formattedIngredient = capitalizeFirstLetter(
                  missedIngredient.name
                );
                return (
                  <li key={generateRandomID(12)}>{formattedIngredient}</li>
                );
              })}
          </ul>
        </div>
        <div className="recipeButtons">
          <button className="recipeLikes">Likes: {recipe.likes}</button>
          <button onClick={onSaveRecipe}>Save recipe</button>
        </div>
      </div>
    </>
  );
};

export default SearchResults;
