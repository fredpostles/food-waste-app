import React from "react";
import { capitalizeFirstLetter } from "../../../utils";
import { useDispatch } from "react-redux";
import { DELETE_RECIPE } from "../../../redux/types";
import CloseModalButton from "../../Buttons/CloseModalButton";
import { saveRecipe } from "../../../apiCalls/backendAPI";

const RecipeModal = ({ setOpenModal, modalContent }) => {
  const dispatch = useDispatch();

  const recipe = { ...modalContent.item };

  const recipeInfo = { ...modalContent.info };

  const onDelete = () => {
    dispatch({ type: DELETE_RECIPE, payload: recipe.id });
    setOpenModal(false);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const ingredients = recipeInfo.extendedIngredients;

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <button className="modalCloseBtn" onClick={closeModal}>
          <CloseModalButton />
        </button>
        <div className="modalTitle">
          <h1>{capitalizeFirstLetter(recipe.title)}</h1>
        </div>
        <div className="modalBody">
          <div className="imageContainer">
            <img
              preload
              src={recipe.image}
              alt={recipe.title}
              className="savedRecipes recipeImage"
            />
          </div>
          <div className="recipeItem text_section">
            <div className="recipeInfo__container">
              <ul className="recipeInfo__list">
                <li>Ready in {recipeInfo.readyInMinutes} minutes</li>
                <li>Serves {recipeInfo.servings}</li>
              </ul>
            </div>
            {recipe && ingredients ? (
              <div className="recipeModal ingredients__container">
                <ul className="ingredients__list typographic">
                  <h1>Ingredients</h1>
                  {ingredients.map((ingredient) => {
                    return <li key={ingredient.id}>{ingredient.original}</li>;
                  })}
                </ul>
              </div>
            ) : null}
            <div className="recipeMethod__container">
              <h5>Method:</h5>
              {recipeInfo.analyzedInstructions.length === 0 &&
              recipeInfo.instructions ? (
                <p>{recipeInfo.instructions}</p>
              ) : recipeInfo.analyzedInstructions.length === 0 &&
                !recipeInfo.instructions ? (
                <p>Oops! No method to show...</p>
              ) : null}
              {recipeInfo.analyzedInstructions.length > 0 ? (
                <ol>
                  {recipeInfo.analyzedInstructions[0].steps.map((element) => {
                    return <li key={element.number}>{element.step}</li>;
                  })}
                </ol>
              ) : null}
            </div>
          </div>
        </div>
        <div className="modalFooter">
          <button onClick={closeModal} title="Return to Saved Recipes">
            Close
          </button>
          <button onClick={onDelete} title="Delete from Saved Recipes">
            Delete recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
