import React from "react";
import Onboarding from "./Onboarding";
import Startup from "./Startup";
import Navigation from "./Navigation";
import Pantry from "./Pantry";
import Account from "./Account";
import Search from "./Search";
import { screenMode } from "../fakeApi";

const Interface = () => {
  return (
    <>
      <Startup />
      {screenMode === 0 && <Onboarding />}
      {screenMode === 1 && <Pantry />}
      {screenMode === 2 && <Search />}
      {screenMode === 3 && <Account />}
    </>
  );
};

export default Interface;
