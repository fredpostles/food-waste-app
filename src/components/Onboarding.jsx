import { useState } from "react";
import { useDispatch } from "react-redux";
import { ADD_USER } from "../redux/types";
import { validate } from "../validation";
import Navigation from "./Navigation";

const Onboarding = () => {
  const [userInput, setUserInput] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState();
  const dispatch = useDispatch();

  // validation on submit, with logic to display error message commented out
  const onSubmit = () => {
    if (!errors) {
      dispatch({ type: ADD_USER, payload: userInput });
      setUserInput({});
    }
  };

  // live validation as user types
  const onInput = (e) => {
    const newInput = { ...userInput, [e.target.name]: e.target.value };
    setUserInput(newInput);

    const result = validate(0, newInput);

    if (result === true) {
      // no error to display
      setErrors(undefined);
    } else {
      // there is an error; display it
      setErrors(result);
    }
  };

  return (
    <>
      <Navigation />
      <h1>Sign up</h1>
      <input
        type="text"
        name="username"
        placeholder="Username"
        onInput={onInput}
      ></input>
      <p>{errors && errors.username}</p>
      <input
        type="password"
        name="password"
        placeholder="Password"
        onInput={onInput}
      ></input>
      <p>{errors && errors.password}</p>
      <button onClick={onSubmit}>Sign Up</button>
    </>
  );
};
export default Onboarding;
