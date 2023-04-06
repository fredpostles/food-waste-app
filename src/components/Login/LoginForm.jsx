import React from "react";

const LoginForm = ({ onInput, userInput, errors }) => {
  return (
    <form onInput={onInput}>
      <div className="login email">
        <label htmlFor="email">Email:</label>
        <input id="email" type="email" name="email" placeholder="Email" />
      </div>
      <div className="login errors email">
        {userInput.email &&
        userInput.email.length > 0 &&
        errors &&
        errors.email ? (
          <p>{errors.email}</p>
        ) : null}
      </div>
      <div className="login password">
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
        />
      </div>
      <div className="login errors password">
        {userInput.password &&
        userInput.password.length > 0 &&
        errors &&
        errors.password ? (
          <p>{errors.password}</p>
        ) : null}
      </div>
      <div className="login errors general">
        {errors && errors.general ? <p>{errors.general}</p> : null}
      </div>
    </form>
  );
};

export default LoginForm;
