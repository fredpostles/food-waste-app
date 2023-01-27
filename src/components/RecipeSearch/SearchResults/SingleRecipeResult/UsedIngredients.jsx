import React from "react";

const UsedIngredients = ({ recipe }) => {
  return (
    <div className="usedIngredients__container">
      <p className="sub-heading">Pantry items used:</p>
      <ul className="typographic usedIngredients__list">
        {recipe.usedIngredients.map((element) => {
          return (
            <li className="usedIngredient" key={element.id}>
              {element.extendedName ? element.extendedName : element.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UsedIngredients;
