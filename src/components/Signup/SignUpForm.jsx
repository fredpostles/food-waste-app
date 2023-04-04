import React from "react";

const SignUpForm = ({ onInput, onFocus, errors, focusedInput }) => {
  return (
    <form onInput={onInput}>
      <div className="signUp__container">
        <h2>Your details:</h2>
        <div className="signUp email">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            onFocus={onFocus}
          />
        </div>
        <p>{focusedInput === "email" && errors?.email ? errors.email : null}</p>
        <div className="signUp password">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            onFocus={onFocus}
          />
        </div>
        <p>
          {focusedInput === "password" && errors?.password
            ? errors.password
            : null}
        </p>
        <div className="signUp name">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="First name"
            onFocus={onFocus}
          />
        </div>
        <p>{focusedInput === "name" && errors?.name ? errors.name : null}</p>
        <div className="signUp surname">
          <label htmlFor="surname">Surname:</label>
          <input
            id="surname"
            type="text"
            name="surname"
            placeholder="Surname"
            onFocus={onFocus}
          />
        </div>
        <p>
          {focusedInput === "surname" && errors?.surname
            ? errors.surname
            : null}
        </p>
      </div>
      <div className="dietaryPrefs__container">
        <h1>Dietary preferences:</h1>
        <p className="italic">Tick all that apply</p>
        <ul className="dietaryPreferences">
          <li>
            <label htmlFor="vegan">
              Vegan
              <input
                type="checkbox"
                id="vegan"
                name="vegan"
                defaultChecked={false}
              />
            </label>
          </li>
          <li>
            <label htmlFor="vegetarian">
              Vegetarian
              <input
                type="checkbox"
                id="vegetarian"
                name="vegetarian"
                defaultChecked={false}
              />
            </label>
          </li>
          <li>
            <label htmlFor="glutenFree">
              Gluten-Free
              <input
                type="checkbox"
                id="glutenFree"
                name="glutenFree"
                defaultChecked={false}
              />
            </label>
          </li>
        </ul>
      </div>
    </form>
  );
};

export default SignUpForm;
