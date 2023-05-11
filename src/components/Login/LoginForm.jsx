import React from "react";

const LoginForm = ({ onInput, userInput, errors, onLogin }) => {
  const onEnter = (e) => {
    if (e.key === "Enter") {
      onLogin(e);
    }
  };

  return (
    <form onInput={onInput}>
      <div className="login email">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          onKeyUp={onEnter}
        />
      </div>
      <div className="login errors email">
        {errors && errors.email ? <p>{errors.email}</p> : null}
      </div>
      <div className="login password">
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          onKeyUp={onEnter}
        />
      </div>
      <div className="login errors password">
        {errors && errors.password ? <p>{errors.password}</p> : null}
      </div>
      <div className="login errors general">
        {errors && errors.general ? <p>{errors.general}</p> : null}
      </div>
    </form>
  );
};

export default LoginForm;
