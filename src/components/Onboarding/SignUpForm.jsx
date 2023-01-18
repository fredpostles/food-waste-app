import React from "react";

const SignUpForm = ({ onInput, errors }) => {
  return (
    <>
      <div className="signUp__container">
        <div className="signUp email">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            onInput={onInput}
          />
        </div>
        <p>{errors && errors.email ? errors.email : null}</p>
        <div className="signUp password">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            onInput={onInput}
          />
        </div>
        <p>{errors && errors.password ? errors.password : null}</p>
        <div className="signUp name">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="First name"
            onInput={onInput}
          />
        </div>
        <p>{errors && errors.name ? errors.name : null}</p>
        <div className="signUp surname">
          <label htmlFor="surname">Surname:</label>
          <input
            id="surname"
            type="text"
            name="surname"
            placeholder="Surname"
            onInput={onInput}
          />
        </div>
        <p>{errors && errors.surname ? errors.surname : null}</p>
      </div>
    </>
  );
};

export default SignUpForm;
