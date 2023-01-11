import React from "react";

const SignUpForm = ({ onInput, errors, user }) => {
  return (
    <>
      <label htmlFor="email">
        Email:{" "}
        <input
          type="email"
          name="email"
          placeholder="Email"
          onInput={onInput}
          defaultValue={user.email}
        />
      </label>
      <p>{errors && errors.email}</p>
      <label htmlFor="password">
        Password:{" "}
        <input
          type="password"
          name="password"
          placeholder="Password"
          onInput={onInput}
          defaultValue={user.password}
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
          defaultValue={user.name}
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
          defaultValue={user.surname}
        />
      </label>
      <p>{errors && errors.surname}</p>
    </>
  );
};

export default SignUpForm;
