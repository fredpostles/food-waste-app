import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_RECIPE, SET_RECIPE_INSTRUCTIONS } from "../../../redux/types";
import { getRecipeInformationBulk } from "../../../apiCalls/dataFetching";
import AdditionalIngredients from "./AdditionalIngredients";

const SingleRecipeResult = ({ recipe }) => {
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
      <h2>{recipe.title}</h2>
      <div className="recipeSearch imageContainer">
        <img src={recipe.image} alt={recipe.title} className="recipeImage" />
      </div>
      <div className="recipeItem text_section">
        <AdditionalIngredients recipe={recipe} />
        {/* {want to only show the below conditionally when 'see method' button is clicked} */}
        {/* {and the recipe in question should become full-screen then} */}
        <div className="recipeMethod">
          {/* <h5>Method:</h5> */}
          {/* <ol>{steps}</ol> */}
        </div>
        <div className="recipeButtons">
          <button onClick={getRecipeMethod} className="seeMethodBtn">
            See method
          </button>
          <button onClick={onSaveRecipe} className="saveRecipeBtn">
            Save recipe
          </button>
        </div>
      </div>
    </>
  );
};

export default SingleRecipeResult;
