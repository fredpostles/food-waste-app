import React from "react";
import Signup from "./Signup";
import Pantry from "./Pantry";
import Account from "./Account";
import RecipeSearch from "./RecipeSearch";
import SavedRecipes from "./SavedRecipes";
import { useSelector } from "react-redux";

const Interface = () => {
  const screenMode = useSelector((state) => state.screenMode);
  const user = useSelector((state) => state.user);
  return (
    <>
      {screenMode === 0 && !user.id && <Signup />}
      {screenMode === 1 && <Pantry />}
      {screenMode === 2 && <RecipeSearch />}
      {screenMode === 3 && <SavedRecipes />}
      {screenMode === 4 && <Account />}
    </>
  );
};

export default Interface;
