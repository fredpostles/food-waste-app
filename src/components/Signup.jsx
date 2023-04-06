import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../apiCalls/backendAPI";
import { ADD_USER } from "../redux/types";
import { validate } from "../validation";
import SignUpForm from "./Signup/SignUpForm";

const Signup = () => {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
    name: "",
    surname: "",
    preferences: {
      vegan: false,
      vegetarian: false,
      glutenFree: false,
    },
  });
  const [errors, setErrors] = useState();
  const [focusedInput, setFocusedInput] = useState("");
  const dispatch = useDispatch();

  // validation on submit
  const onSubmit = async (e) => {
    e.preventDefault();
    validateUserInput();
    if (!errors) {
      try {
        const createdUser = await createUser(userInput);
        dispatch({ type: ADD_USER, payload: userInput });
        setUserInput({});
      } catch (error) {
        console.log(error);
        alert("Sign up failed. Please try again.");
      }
    } else {
      alert(
        "Sign up failed. Please double check the info you entered and look out for any errors below."
      );
    }
  };

  // live validation as user types
  const onInput = (e) => {
    const { name, value, type, checked } = e.target;
    // only spread userInput if input is not checkbox
    const newInput = { ...userInput };

    if (type === "checkbox") {
      newInput.preferences = {
        ...userInput.preferences,
        [name]: checked ? true : false,
      };
    } else {
      newInput[name] = value;
    }

    setUserInput(newInput);
  };

  console.log("userInput after onInput", userInput);

  const onFocus = (e) => {
    setFocusedInput(e.target.name);
  };

  const validateUserInput = () => {
    const result = validate("onboarding", userInput);
    if (result === true) {
      // no error to display
      setErrors(undefined);
    } else {
      // there is an error; display it
      switch (focusedInput) {
        case "email":
          userInput.email && userInput.email.length > 0
            ? setErrors({ ...result, email: result.email })
            : setErrors({ ...result });
          break;

        case "password":
          userInput.password && userInput.password.length > 0
            ? setErrors({ ...result, password: result.password })
            : setErrors({ ...result });
          break;

        case "name":
          userInput.name && userInput.name.length > 0
            ? setErrors({ ...result, name: result.name })
            : setErrors({ ...result });
          break;

        case "surname":
          userInput.surname && userInput.surname.length > 0
            ? setErrors({ ...result, surname: result.surname })
            : setErrors({ ...result });
          break;

        default:
          break;
      }
    }
    console.log("Validate userinput result:", result);
  };

  useEffect(() => {
    validateUserInput();
  }, [userInput]);

  return (
    <>
      <div className="onboarding__container">
        <h1>Sign up</h1>
        <SignUpForm
          onInput={onInput}
          onFocus={onFocus}
          errors={errors}
          focusedInput={focusedInput}
          userInput={userInput}
        />
        <button className="signUp__button" onClick={onSubmit}>
          Sign Up
        </button>
      </div>
    </>
  );
};
export default Signup;
