import React from "react";
import { user } from "../fakeApi";

const Account = () => {
  return (
    <>
      <h1>Your Account</h1>
      <h2>Hi, {user.username}!</h2>
      <h3>Here is your account info:</h3>
    </>
  );
};

export default Account;
