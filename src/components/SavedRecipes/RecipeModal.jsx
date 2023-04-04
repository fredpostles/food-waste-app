import React from "react";
import { capitalizeFirstLetter } from "../../utils";
import { useDispatch } from "react-redux";
import { DELETE_RECIPE } from "../../redux/types";

const RecipeModal = ({ setShowRecipeMethod, setOpenModal, modalContent }) => {
  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch({ type: DELETE_RECIPE, payload: recipe.id });
    setOpenModal(false);
  };

  const recipe = modalContent;

  const closeModal = () => {
    setOpenModal(false);
    setShowRecipeMethod(false);
  };

  const ingredients = recipe.extendedIngredients;

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <button className="modalCloseBtn" onClick={closeModal}>
          X
        </button>
        <div className="modalTitle">
          <h1>{capitalizeFirstLetter(recipe.title)}</h1>
        </div>
        <div className="modalBody">
          <div className="imageContainer">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="savedRecipes recipeImage"
            />
          </div>
          <div className="recipeItem text_section">
            <div className="recipeInfo__container">
              <ul className="recipeInfo__list">
                <li>Ready in {recipe.readyInMinutes} minutes</li>
                <li>Serves {recipe.servings}</li>
              </ul>
            </div>
            {recipe && ingredients ? (
              <div className="recipeModal ingredients__container">
                <h2>Ingredients</h2>
                <ul className="ingredients__list typographic">
                  {ingredients.map((ingredient) => {
                    return <li key={ingredient.id}>{ingredient.original}</li>;
                  })}
                </ul>
              </div>
            ) : null}
            <div className="recipeMethod__container">
              <h5>Method:</h5>
              {recipe.analyzedInstructions.length === 0 &&
              recipe.instructions ? (
                <p>{recipe.instructions}</p>
              ) : recipe.analyzedInstructions.length === 0 &&
                !recipe.instructions ? (
                <p>Oops! No method to show...</p>
              ) : null}
              {recipe.analyzedInstructions.length > 0 ? (
                <ol>
                  {recipe.analyzedInstructions[0].steps.map((element) => {
                    return <li key={element.number}>{element.step}</li>;
                  })}
                </ol>
              ) : null}
            </div>
          </div>
        </div>
        <div className="modalFooter">
          {/* Removed as Foodista links seems to redirect to spam websites */}
          {/* <button>
            <a href={recipe.sourceUrl}>Source</a>
          </button> */}
          <button onClick={closeModal} title="Return to Saved Recipes">
            Return
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
