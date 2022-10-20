import React, { useState } from "react";
import { ADD_PREFERENCES } from "../../redux/types";
import { useDispatch } from "react-redux";

const DietaryInfo = () => {
  const dispatch = useDispatch();
  const [userInput, setUserInput] = useState({});

  const onInput = (e) => {
    const newInput = { ...userInput, [e.target.name]: e.target.checked };
    setUserInput(newInput);
  };

  const onSubmit = () => {
    {
      dispatch({
        type: ADD_PREFERENCES,
        payload: userInput,
      });
    }
  };

  return (
    <>
      <div className="dietaryInfo__container">
        <div className="dietaryPrefs__container">
          <h1>Dietary preferences:</h1>
          <p>Tick all that apply</p>
          <ul className="dietaryPreferences">
            <li onInput={onInput}>
              <label htmlFor="isVegan">
                Vegan
                <input type="checkbox" name="isVegan" />
              </label>
            </li>
            <li onInput={onInput}>
              <label htmlFor="isVegetarian">
                Vegetarian
                <input type="checkbox" name="isVegetarian" />
              </label>
            </li>
            <li onInput={onInput}>
              <label htmlFor="isGlutenFree">
                Gluten-free
                <input type="checkbox" name="isGlutenFree" />
              </label>
            </li>
          </ul>
        </div>
        <div className="intolerances__container">
          <h2>Allergies or intolerances:</h2>
          <p>Tick all that apply</p>
          <ul className="allergiesOrIntolerances">
            <li onInput={onInput}>
              <label htmlFor="noDairy">
                Dairy
                <input type="checkbox" name="noDairy" />
              </label>
            </li>
            <li onInput={onInput}>
              <label htmlFor="noEgg">
                Egg
                <input type="checkbox" name="noEgg" />
              </label>
            </li>
            <li onInput={onInput}>
              <label htmlFor="noGluten">
                Gluten
                <input type="checkbox" name="noGluten" />
              </label>
            </li>
            <li onInput={onInput}>
              <label htmlFor="noGrain">
                Grain
                <input type="checkbox" name="noGrain" />
              </label>
            </li>
            <li onInput={onInput}>
              <label htmlFor="noPeanut">
                Peanut
                <input type="checkbox" name="noPeanut" />
              </label>
            </li>
            <li onInput={onInput}>
              <label htmlFor="noSeafood">
                Seafood
                <input type="checkbox" name="noSeafood" />
              </label>
            </li>
            <li onInput={onInput}>
              <label htmlFor="noSesame">
                Sesame
                <input type="checkbox" name="noSesame" />
              </label>
            </li>
            <li onInput={onInput}>
              <label htmlFor="noShellfish">
                Shellfish
                <input type="checkbox" name="noShellfish" />
              </label>
            </li>
            <li onInput={onInput}>
              <label htmlFor="noSoy">
                Soy
                <input type="checkbox" name="noSoy" />
              </label>
            </li>
            <li onInput={onInput}>
              <label htmlFor="noSulfite">
                {" "}
                Sulfite
                <input type="checkbox" name="noSulfite" />
              </label>
            </li>
            <li onInput={onInput}>
              <label htmlFor="noTreeNuts">
                {" "}
                Tree nut
                <input type="checkbox" name="noTreeNuts" />
              </label>
            </li>
            <li onInput={onInput}>
              <label htmlFor="noWheat">
                Wheat
                <input type="checkbox" name="noWheat" />
              </label>
            </li>
          </ul>
        </div>
        <button onClick={onSubmit}>Submit</button>
      </div>
    </>
  );
};

export default DietaryInfo;
