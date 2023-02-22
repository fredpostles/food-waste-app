import React from "react";

const SavedRecipeTemplate = () => {
  return (
    <div className="savedRecipes__templateResult">
      <div className="savedRecipes imageContainer">
        <img
          src="/assets/images/imageTemplate.png"
          alt="Template"
          name="Template image"
          className="savedRecipeImage templateImage"
        />
      </div>
      <div className="savedRecipe text_section">
        <h1>No saved recipes yet!</h1>
        <h2>Want to save recipes?</h2>
        <ol>
          <li>Search for recipes that use your pantry items</li>
          <li>
            Find ones you like, click "Save recipe" and they will appear here!
          </li>
        </ol>
      </div>
    </div>
  );
};

export default SavedRecipeTemplate;
