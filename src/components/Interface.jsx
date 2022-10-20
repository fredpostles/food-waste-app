import React from "react";
import Onboarding from "./Onboarding";
import Pantry from "./Pantry";
import Account from "./Account";
import RecipeSearch from "./RecipeSearch";
import SavedRecipes from "./SavedRecipes";
import DietaryInfo from "./Onboarding/DietaryInfo";
import { useSelector } from "react-redux";

const Interface = () => {
  const screenMode = useSelector((state) => state.screenMode);
  return (
    <>
      {screenMode === 0 && <Onboarding />}
      {screenMode === 0.5 && <DietaryInfo />}
      {screenMode === 1 && <Pantry />}
      {screenMode === 2 && <RecipeSearch />}
      {screenMode === 3 && <SavedRecipes />}
      {screenMode === 4 && <Account />}
    </>
  );
};

export default Interface;
