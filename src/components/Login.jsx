import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../apiCalls/backendAPI";
import { ADD_TOKEN } from "../redux/types";
import { validate } from "../validation";
import LoginForm from "./Login/LoginForm";
import { Link } from "react-router-dom";

const Login = () => {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState();
  const dispatch = useDispatch();

  const onInput = (e) => {
    const { name, value } = e.target;
    const newInput = { ...userInput };
    newInput[name] = value;

    setUserInput(newInput);
  };

  const validateLogin = () => {
    const result = validate("login", userInput);
    console.log("result of validate:", result);
    setErrors({ ...result });
    console.log("errors after validate:", errors);
  };

  const onLogin = async (e) => {
    e.preventDefault();
    validateLogin();

    try {
      // call backend to login
      const result = await login(userInput);
      console.log("onLogin result", result);

      if (result.data?.response.error) {
        console.log("Login error:", result.data.response.error);
        // setErrors({ ...errors, general: result.data.response.error });
      } else {
        console.log("Login success!");
        dispatch({ type: ADD_TOKEN, payload: result.token });
      }
    } catch (error) {
      console.log("catch login error", error);
    }
    console.log("login errors:", errors);
  };

  return (
    <>
      <div className="login__container">
        <h1>Login</h1>
        <LoginForm
          onInput={onInput}
          userInput={userInput}
          errors={errors}
          onLogin={onLogin}
        />
        <button className="login__button" onClick={onLogin}>
          Login
        </button>
        <div className="signup__redirect">
          <p>Not registered for an account yet?</p>
          <button>
            <Link to="/signup">Sign up</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
