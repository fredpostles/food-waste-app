import React from "react";
import { useDispatch } from "react-redux";
import { DELETE_RECIPE } from "../../redux/types";
import { capitalizeFirstLetter } from "../../utils";

const Recipe = ({
  savedRecipe,
  showRecipeMethod,
  setShowRecipeMethod,
  openModal,
  setOpenModal,
  getModalContent,
  onDelete,
}) => {
  const recipe = savedRecipe;
  const dispatch = useDispatch();

  // const onDelete = () => {
  //   // dispatch({ type: DELETE_RECIPE, payload: recipe.id });
  // };

  const displayRecipeMethod = () => {
    setShowRecipeMethod(!showRecipeMethod);
    setOpenModal(!openModal);
    getModalContent(recipe);
  };

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
        {/* Removed as Foodista links seems to redirect to spam websites */}
        {/* <small>
          <a href={recipe.sourceUrl}>Source</a>
        </small> */}
      </div>
      <div className="savedRecipe__buttons">
        <button onClick={displayRecipeMethod} className="seeMethodBtn">
          See method{" "}
        </button>
        <button onClick={() => onDelete(recipe)} className="deleteBtn">
          Delete recipe
        </button>
      </div>
    </div>
  );
};

export default Recipe;
