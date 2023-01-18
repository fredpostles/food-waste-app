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
    } else {
      alert(
        "Sign up failed. Please double check the info you entered and look out for any errors below."
      );
      setErrors(errors);
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
      switch (e.target.name) {
        case "email":
          e.target.value && e.target.value.length > 0
            ? setErrors({ ...result, email: result.email })
            : setErrors({ ...result });
          break;

        case "password":
          e.target.value && e.target.value.length > 0
            ? setErrors({ ...result, password: result.password })
            : setErrors({ ...result });
          break;
        case "name":
          e.target.value
            ? setErrors({ ...result, name: result.name })
            : setErrors({ ...result });
          break;

        case "surname":
          e.target.value && e.target.value.length
            ? setErrors({ ...result, surname: result.surname })
            : setErrors({ ...result });
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
        <button className="signUp__button" onClick={onSubmit}>
          Sign Up
        </button>
      </div>
    </>
  );
};
export default Onboarding;
