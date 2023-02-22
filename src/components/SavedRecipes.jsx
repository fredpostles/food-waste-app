import React from "react";
import { useSelector } from "react-redux";
import Recipe from "./SavedRecipes/Recipe";
import Navigation from "./Navigation";
import SavedRecipeTemplate from "./SavedRecipes/SavedRecipeTemplate";

const SavedRecipes = () => {
  const savedRecipes = useSelector((state) => state.savedRecipes);

  return (
    <>
      <Navigation />
      <div className="savedRecipeSection__container">
        <h1>My Saved Recipes</h1>
        {savedRecipes.length < 1 ? <SavedRecipeTemplate /> : null}
        <div className="savedRecipes__container">
          {savedRecipes && savedRecipes.length > 0
            ? savedRecipes.map((savedRecipe) => {
                return (
                  <Recipe
                    savedRecipe={savedRecipe}
                    key={savedRecipe.id}
                    id={savedRecipe.id}
                  />
                );
              })
            : null}
        </div>
      </div>
    </>
  );
};

export default SavedRecipes;
