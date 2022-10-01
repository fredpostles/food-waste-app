import { useState } from "react";
import { useDispatch } from "react-redux";
import { ADD_USER } from "../redux/types";
import { validate } from "../validation";

const Onboarding = () => {
  const [username, setUsername] = useState("");
  //   const [password, setPassword] = useState("");
  const [errors, setErrors] = useState();
  const dispatch = useDispatch();

  // validation on submit, with logic to display error message commented out
  const onSubmit = () => {
    // const result = validate(1, { username });

    if (!errors) {
      dispatch({ type: ADD_USER, payload: username });
      setUsername("");
    }
    //      else {
    //       setErrors(result);
    //     }
    //   };

    // live validation as user types
    const onInput = (e) => {
      setUsername(e.target.value);
      // setPassword(e.target.value);

      const result = validate(1, { username });

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
        <button onClick={onSubmit}>Sign Up</button>
      </>
    );
  };
};
export default Onboarding;
