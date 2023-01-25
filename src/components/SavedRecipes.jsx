import React from "react";
import { useSelector } from "react-redux";
import Recipe from "./SavedRecipes/Recipe";
import Navigation from "./Navigation";

const SavedRecipes = () => {
  const savedRecipes = useSelector((state) => state.savedRecipes);

  return (
    <>
      <Navigation />
      <div className="savedRecipeSection__container">
        <h1>My Saved Recipes</h1>
        <div className="savedRecipes__container">
          {savedRecipes &&
            savedRecipes.map((savedRecipe) => {
              return (
                <Recipe
                  savedRecipe={savedRecipe}
                  key={savedRecipe.id}
                  id={savedRecipe.id}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default SavedRecipes;
