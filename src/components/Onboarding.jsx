import { useState } from "react";
import { useDispatch } from "react-redux";
import { ADD_USER } from "../redux/types";
import { validate } from "../validation";
import SignUpForm from "./Onboarding/SignUpForm";

const Onboarding = () => {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
    name: "",
    surname: "",
  });
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
    console.log("Result", result);
    console.log(e.target.name);

    if (result === true) {
      // no error to display
      setErrors(undefined);
    } else {
      // there is an error; display it
      switch (e.target.name) {
        case "email":
          e.target.value && e.target.value.length > 0
            ? setErrors({ email: result.email })
            : setErrors(undefined);
          break;

        case "password":
          e.target.value && e.target.value.length > 0
            ? setErrors({ password: result.password })
            : setErrors(undefined);
          break;
        case "name":
          e.target.value
            ? setErrors({ name: result.name })
            : setErrors(undefined);
          break;

        case "surname":
          e.target.value && e.target.value.length
            ? setErrors({ surname: result.surname })
            : setErrors(undefined);
          break;

        default:
          break;
      }
    }
  };

  return (
    <>
      <div className="onboarding__container">
        <h1>Sign up</h1>
        <SignUpForm onInput={onInput} errors={errors} />
        <button onClick={onSubmit}>Sign Up</button>
      </div>
    </>
  );
};
export default Onboarding;
