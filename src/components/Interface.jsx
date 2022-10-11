import React from "react";
import Onboarding from "./Onboarding";
import Pantry from "./Pantry";
import Account from "./Account";
import Search from "./Search";
import { useSelector } from "react-redux";

const Interface = () => {
  const screenMode = useSelector((state) => state.screenMode);
  return (
    <>
      {screenMode === 0 && <Onboarding />}
      {screenMode === 1 && <Pantry />}
      {screenMode === 2 && <Search />}
      {screenMode === 3 && <Account />}
    </>
  );
};

export default Interface;
