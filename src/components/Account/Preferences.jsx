import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { UPDATE_PREFERENCES } from "../../redux/types";

const Preferences = ({ user }) => {
  const dispatch = useDispatch();
  const [userInput, setUserInput] = useState({});

  const { vegan, vegetarian, glutenFree } = user.preferences;
  console.log(user);

  const onInput = (e) => {
    const newInput = { ...userInput, [e.target.name]: e.target.checked };
    setUserInput(newInput);
  };

  const onSubmit = () => {
    dispatch({
      type: UPDATE_PREFERENCES,
      payload: userInput,
    });
  };

  return (
    <>
      <div className="account__dietaryInfo__container">
        <div className="account__dietaryPrefs__container">
          <h2>Dietary Preferences:</h2>
          <ul className="dietaryPreferences">
            <li onInput={onInput}>
              <label htmlFor="vegan">
                Vegan
                <input type="checkbox" name="vegan" defaultChecked={vegan} />
              </label>
            </li>
            <li onInput={onInput}>
              <label htmlFor="vegetarian">
                Vegetarian
                <input
                  type="checkbox"
                  name="vegetarian"
                  defaultChecked={vegetarian}
                />
              </label>
            </li>
            <li onInput={onInput}>
              <label htmlFor="glutenFree">
                Gluten-Free
                <input
                  type="checkbox"
                  name="glutenFree"
                  defaultChecked={glutenFree}
                />
              </label>
            </li>
          </ul>
        </div>
        {
          <div className="intolerances__container">
            {/* <h2>Allergies or intolerances:</h2>
          <ul className="allergiesOrIntolerances">
            <li onInput={onInput}>
              <label htmlFor="noDairy">
                Dairy
                <input
                  type="checkbox"
                  name="noDairy"
                  defaultChecked={noDairy}
                />
              </label>
            </li>
            <li onInput={onInput}>
              <label htmlFor="noEgg">
                Egg
                <input type="checkbox" name="noEgg" defaultChecked={noEgg} />
              </label>
            </li>
            <li onInput={onInput}>
              <label htmlFor="noGrain">
                Grain
                <input
                  type="checkbox"
                  name="noGrain"
                  defaultChecked={noGrain}
                />
              </label>
            </li>
            <li onInput={onInput}>
              <label htmlFor="noPeanut">
                Peanut
                <input
                  type="checkbox"
                  name="noPeanut"
                  defaultChecked={noPeanut}
                />
              </label>
            </li>
            <li onInput={onInput}>
              <label htmlFor="noSeafood">
                Seafood
                <input
                  type="checkbox"
                  name="noSeafood"
                  defaultChecked={noSeafood}
                />
              </label>
            </li>
            <li onInput={onInput}>
              <label htmlFor="noSesame">
                Sesame
                <input
                  type="checkbox"
                  name="noSesame"
                  defaultChecked={noSesame}
                />
              </label>
            </li>
            <li onInput={onInput}>
              <label htmlFor="noShellfish">
                Shellfish
                <input
                  type="checkbox"
                  name="noShellfish"
                  defaultChecked={noShellfish}
                />
              </label>
            </li>
            <li onInput={onInput}>
              <label htmlFor="noSoy">
                Soy
                <input type="checkbox" name="noSoy" defaultChecked={noSoy} />
              </label>
            </li>
            <li onInput={onInput}>
              <label htmlFor="noSulfite">
                Sulfite
                <input
                  type="checkbox"
                  name="noSulfite"
                  defaultChecked={noSulfite}
                />
              </label>
            </li>
            <li onInput={onInput}>
              <label htmlFor="noTreeNuts">
                Tree nut
                <input
                  type="checkbox"
                  name="noTreeNuts"
                  defaultChecked={noTreeNuts}
                />
              </label>
            </li>
            <li onInput={onInput}>
              <label htmlFor="noWheat">
                Wheat
                <input
                  type="checkbox"
                  name="noWheat"
                  defaultChecked={noWheat}
                />
              </label>
            </li>
          </ul> */}
          </div>
        }
        <button onClick={onSubmit} className="updateBtn">
          Update
        </button>
      </div>
    </>
  );
};

export default Preferences;
