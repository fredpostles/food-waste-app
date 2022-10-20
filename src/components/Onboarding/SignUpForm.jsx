import React from "react";

const SignUpForm = ({ onInput, errors }) => {
  return (
    <>
      <label htmlFor="username">
        Username:{" "}
        <input
          type="text"
          name="username"
          placeholder="Username"
          onInput={onInput}
        />
      </label>
      <p>{errors && errors.username}</p>
      <label htmlFor="password">
        Password:{" "}
        <input
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
          type="text"
          name="surname"
          placeholder="Surname"
          onInput={onInput}
        />
      </label>
      <p>{errors && errors.surname}</p>
    </>
  );
};

export default SignUpForm;
