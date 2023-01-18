import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_RECIPE, SET_RECIPE_INSTRUCTIONS } from "../../redux/types";
import { generateRandomID } from "../../utils";
import { capitalizeFirstLetter } from "../../utils";
import { getRecipeInformationBulk } from "../../apiCalls/dataFetching";

const SearchResults = ({ recipe }) => {
  const dispatch = useDispatch();
  const ingredientSearch = useSelector((state) => state.ingredientSearch);
  const recipeInstructions = useSelector((state) => state.recipeInstructions);

  const onSaveRecipe = () => {
    dispatch({ type: SAVE_RECIPE, payload: recipe });
  };

  const getRecipeMethod = async (e) => {
    const idsToSearch = ingredientSearch.map((item) => item.id);
    // console.log("Result", result, "IDs", idsToSearch);
    const recipes = await getRecipeInformationBulk(idsToSearch);
    dispatch({ type: SET_RECIPE_INSTRUCTIONS, payload: recipes });
  };

  // const indexOfRecipe = ingredientSearch.findIndex(
  //   (item) => item.id === recipe.id
  // );
  // const currentRecipeMethod = recipeInstructions[indexOfRecipe];

  // const steps = currentRecipeMethod.analyzedInstructions[0].steps.map(
  //   (element) => {
  //     return <li>{element.step}</li>;
  //   }
  // );

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
                return (
                  <li key={generateRandomID(12)}>
                    {capitalizeFirstLetter(missedIngredient.name)}
                  </li>
                );
              })}
          </ul>
        </div>
        {/* {want to only show the below conditionally when 'see method' button is clicked} */}
        {/* {and the recipe in question should become full-screen then} */}
        <div className="recipeMethod">
          {/* <h5>Method:</h5> */}
          {/* <ol>{steps}</ol> */}
        </div>
        <div className="recipeButtons">
          <button onClick={getRecipeMethod}>See method</button>
          <button className="recipeLikes">Likes: {recipe.likes}</button>
          <button onClick={onSaveRecipe}>Save recipe</button>
        </div>
      </div>
    </>
  );
};

export default SearchResults;
