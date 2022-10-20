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
      <p>{recipe.title}</p>
      <img src={recipe.image} alt={recipe.title} />
      <button className="recipeLikes">{recipe.likes}</button>
      <p>Additional ingredients needed:</p>
      <div className="additionalIngredients__list">
        {recipe.missedIngredients &&
          recipe.missedIngredients.map((missedIngredient) => {
            const formattedIngredient = capitalizeFirstLetter(
              missedIngredient.name
            );
            return <li key={generateRandomID(12)}>{formattedIngredient}</li>;
          })}
        <button onClick={onSaveRecipe}>Save recipe</button>
      </div>
    </>
  );
};

export default SearchResults;
