import React from "react";
import Onboarding from "./Onboarding";
import Startup from "./Startup";
import Navigation from "./Navigation";
import Pantry from "./Pantry";
import Account from "./Account";
import Search from "./Search";

const Interface = () => {
  return (
    <>
      <Startup />
      <Onboarding />
      <Navigation />
      <Pantry />
      <Account />
      <Search />
    </>
  );
};

export default Interface;
