import React, { useState } from "react";
import { useSelector } from "react-redux";
import { updateUser } from "../../apiCalls/backendAPI";

const Preferences = ({ user }) => {
  const [preferences, setPreferences] = useState(user.preferences);
  const token = useSelector((state) => state.token);

  const onInput = (e) => {
    const { name, checked } = e.target;
    setPreferences((previousState) => ({
      ...previousState,
      [name]: checked ? true : false,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await updateUser({ preferences: preferences }, token);
    console.log("updateUser result from onSubmit in Preferences:", result);
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
                  id="vegan"
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
                  id="vegetarian"
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
                  id="glutenFree"
                  defaultChecked={preferences.glutenFree}
                />
              </label>
            </li>
          </ul>
        </div>
        <button onClick={onSubmit} className="updateBtn">
          Update
        </button>
      </div>
    </form>
  );
};

export default Preferences;
