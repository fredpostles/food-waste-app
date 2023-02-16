import React from "react";
import { capitalizeFirstLetter } from "../../../../utils";

const AdditionalIngredients = ({ recipe }) => {
  return (
    <div className="additionalIngredients__list">
      {recipe ? (
        <>
          <p className="sub-heading">Additional ingredients needed:</p>
          <ul className="typographic">
            {recipe.missedIngredients
              ? recipe.missedIngredients.map((missedIngredient) => {
                  return (
                    <li key={missedIngredient.id}>
                      {capitalizeFirstLetter(missedIngredient.original)}
                    </li>
                  );
                })
              : null}
          </ul>
        </>
      ) : null}
    </div>
  );
};

export default AdditionalIngredients;
