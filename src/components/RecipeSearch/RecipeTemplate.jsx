import React from "react";

const RecipeTemplate = () => {
  return (
    <div className="recipeSearch__templateResult">
      <div className="recipeSearch imageContainer">
        <img
          src="/assets/images/imageTemplate.png"
          alt="Template"
          name="Template image"
          className="recipeImage templateImage"
        />
      </div>
      <h1>No recipes yet!</h1>
      <div className="recipeItem text_section">
        <h2>Want to search for recipes?</h2>
        <ol>
          <li>Add ingredients to your pantry.</li>
          <li>Then search for recipes that use them!</li>
          <li>Or you can search for recipes by ingredient above...</li>
        </ol>
      </div>
    </div>
  );
};

export default RecipeTemplate;
