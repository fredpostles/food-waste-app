import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../apiCalls/backendAPI";
import { ADD_TOKEN } from "../redux/types";
import { validate } from "../validation";
import LoginForm from "./Login/LoginForm";

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

  console.log("userInput after onInput:", userInput);

  const validateLogin = () => {
    const result = validate("login", userInput);
    console.log("result of validate:", result);
    setErrors({ ...result });
    console.log("errors after validate:", errors);
  };

  const onLogin = async (e) => {
    e.preventDefault();
    validateLogin();

    // call backend to login
    const result = await login(userInput);

    if (result.data?.response.error) {
      console.log("Login error:", result.data.response.error);
      setErrors({ ...errors, general: result.data.response.error });
    } else {
      console.log("Login success!");
      dispatch({ type: ADD_TOKEN, payload: result.token });
    }

    console.log(errors);
  };

  return (
    <div className="login__container">
      <h1>Login</h1>
      <LoginForm onInput={onInput} userInput={userInput} errors={errors} />
      <button className="login__button" onClick={onLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
