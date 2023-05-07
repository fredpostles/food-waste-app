import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../apiCalls/backendAPI";
import { UPDATE_PREFERENCES } from "../../redux/types";

const Preferences = ({ user }) => {
  console.log(user);
  const [preferences, setPreferences] = useState(user.preferences);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const onInput = (e) => {
    const { name, checked } = e.target;
    setPreferences((previousState) => ({
      ...previousState,
      [name]: checked ? true : false,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // const result = await updateUser({ ...preferences }, token);
    // console.log("Result of updateUser query in front:", result);
    dispatch({ type: UPDATE_PREFERENCES, payload: preferences });
  };

  return (
    <form onInput={onInput}>
      <div className="account__dietaryInfo__container">
        <div className="account__dietaryPrefs__container">
          <h2>Dietary Preferences:</h2>
          <ul className="dietaryPreferences">
            <li>
              <label htmlFor="vegan">
                Vegan
                <input
                  type="checkbox"
                  name="vegan"
                  defaultChecked={preferences.vegan}
                />
              </label>
            </li>
            <li>
              <label htmlFor="vegetarian">
                Vegetarian
                <input
                  type="checkbox"
                  name="vegetarian"
                  defaultChecked={preferences.vegetarian}
                />
              </label>
            </li>
            <li>
              <label htmlFor="glutenFree">
                Gluten-Free
                <input
                  type="checkbox"
                  name="glutenFree"
                  defaultChecked={preferences.glutenFree}
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
    </form>
  );
};

export default Preferences;
