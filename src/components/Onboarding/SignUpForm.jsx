import React from "react";

const SignUpForm = ({ onInput, errors }) => {
  console.log("Errors in signup form", errors);
  return (
    <>
      <div className="signUp__container">
        <label htmlFor="email">
          Email:{" "}
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            onInput={onInput}
          />
        </label>
        <p>{errors && errors.email}</p>
        <label htmlFor="password">
          Password:{" "}
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            onInput={onInput}
          />
        </label>
        <p>{errors && errors.password}</p>
        <label htmlFor="name">
          Name:{" "}
          <input
            id="name"
            type="text"
            name="name"
            placeholder="First name"
            onInput={onInput}
          />
        </label>
        <p>{errors && errors.name}</p>
        <label htmlFor="surname">
          Surname:{" "}
          <input
            id="surname"
            type="text"
            name="surname"
            placeholder="Surname"
            onInput={onInput}
          />
        </label>
        <p>{errors && errors.surname}</p>
      </div>
    </>
  );
};

export default SignUpForm;
