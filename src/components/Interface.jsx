import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Signup from "./Signup";
import Pantry from "./Pantry";
import Account from "./Account";
import RecipeSearch from "./RecipeSearch";
import SavedRecipes from "./SavedRecipes";
import { useSelector } from "react-redux";
import Login from "./Login";

const Interface = () => {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();
  const [initialPage, setInitialPage] = useState("");

  useEffect(() => {
    const lastPage = localStorage.getItem("lastPage");
    if (lastPage) {
      setInitialPage(lastPage);
    } else if (!user.id) {
      setInitialPage("/signup");
    } else if (user.id && !token) {
      setInitialPage("/login");
    } else {
      setInitialPage("/pantry");
    }
  }, [user.id, token]);

  return (
    <Routes initialPath={initialPage}>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/pantry" element={<Pantry />} />
      <Route path="/recipe-search" element={<RecipeSearch />} />
      <Route path="/saved-recipes" element={<SavedRecipes />} />
      <Route path="/account" element={<Account />} />
      <Route path="*" element={<Navigate to="/pantry" />} />
    </Routes>
  );
};

export default Interface;
