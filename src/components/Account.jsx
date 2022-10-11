import React from "react";
// import { useSelector } from "react-redux";
import { user } from "../fakeApi";
import Navigation from "./Navigation";

const Account = () => {
  // const user = useSelector((state) => state.user);

  // const dietaryPreferences = user.dietaryPreferences;
  const { isVegan, isVegetarian, isGlutenFree } = user.dietaryPreferences;
  return (
    <>
      <h1>Your Account</h1>
      <h2>Hi, {user.firstName}!</h2>
      <h3>Here is your account info:</h3>
      <p>Username: {user.username}</p>
      <p>
        Dietary Preferences:
        <ul>
          <li>{isVegan && "Vegan"} </li>
          <li>{isVegetarian && "Vegetarian"}</li>
          <li>{isGlutenFree && "Gluten Free"}</li>
        </ul>
      </p>
      <Navigation />
    </>
  );
};

export default Account;
