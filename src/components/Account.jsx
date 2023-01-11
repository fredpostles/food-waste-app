import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { validate } from "../validation";
import { capitalizeFirstLetter } from "../utils";
import Navigation from "./Navigation";
import AccountInfo from "./Account/AccountInfo";
import { UPDATE_USER } from "../redux/types";
import Preferences from "./Account/Preferences";

const Account = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [userInput, setUserInput] = useState({
    email: user.email,
    password: user.password,
    name: user.name,
    surname: user.surname,
  });
  const [errors, setErrors] = useState();

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

  const onUpdate = () => {
    dispatch({ type: UPDATE_USER, payload: userInput });
  };

  return (
    <>
      <Navigation />
      <div className="account__container">
        <h1>Your Account</h1>
        <h2>Hi, {capitalizeFirstLetter(user.name)}</h2>
        <div className="accountInfo__container">
          <h2>Here is your account info:</h2>
          <AccountInfo onInput={onInput} errors={errors} user={user} />
          <button onClick={onUpdate}>Update</button>
        </div>
        <Preferences user={user} />
      </div>
    </>
  );
};

export default Account;
