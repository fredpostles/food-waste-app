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
      <div className="savedRecipe__buttons">
        <button onClick={onDelete} className="deleteBtn">
          Delete recipe
        </button>
      </div>
    </div>
  );
};

export default Recipe;
