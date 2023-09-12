import React from "react";

const PantryItemTemplate = () => {
  return (
    <div className="pantry__templateResult">
      <div className="pantry imageContainer">
        <img
          loading="lazy"
          src="/assets/images/imageTemplate.png"
          alt="Template"
          name="Template image"
          className="pantryImage templateImage"
        />
      </div>
      <div className="pantryItem text_section">
        <h1>Pantry empty!</h1>
        <ol>
          <li>Add ingredients to your pantry by searching above.</li>
          <li>
            Then, you can search for recipes that use the items you have in your
            pantry!
          </li>
        </ol>
      </div>
    </div>
  );
};

export default PantryItemTemplate;
