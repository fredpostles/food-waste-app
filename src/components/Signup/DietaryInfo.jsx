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
    dispatch({
      type: ADD_PREFERENCES,
      payload: userInput,
    });
  };

  return (
    <>
      <div className="dietaryInfo__container">
        <div className="dietaryPrefs__container">
          <h1>Dietary preferences:</h1>
          <p className="italic">Tick all that apply</p>
          <ul className="dietaryPreferences">
            <li onInput={onInput}>
              <label htmlFor="vegan">
                Vegan
                <input type="checkbox" name="vegan" defaultChecked={false} />
              </label>
            </li>
            <li onInput={onInput}>
              <label htmlFor="vegetarian">
                Vegetarian
                <input
                  type="checkbox"
                  name="vegetarian"
                  defaultChecked={false}
                />
              </label>
            </li>
            <li onInput={onInput}>
              <label htmlFor="glutenFree">
                Gluten-Free
                <input
                  type="checkbox"
                  name="glutenFree"
                  defaultChecked={false}
                />
              </label>
            </li>
          </ul>
        </div>
        <button onClick={onSubmit} className="signUp__button">
          Submit
        </button>
      </div>
    </>
  );
};

export default DietaryInfo;
