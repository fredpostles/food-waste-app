import React from "react";
import { useDispatch } from "react-redux";
import { DELETE_RECIPE } from "../../redux/types";

const Recipe = ({ savedRecipe }) => {
  const recipe = savedRecipe;
  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch({ type: DELETE_RECIPE, payload: recipe.id });
  };

  return (
    <div className="singleRecipe__container">
      <h4>{recipe.name}</h4>
      <img src={recipe.image} alt={recipe.name} />
      <button className="recipeLikes">Likes: {recipe.likes}</button>
      <button onClick={onDelete}>Delete recipe</button>
    </div>
  );
};

export default Recipe;
