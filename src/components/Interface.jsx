import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Signup";
import Pantry from "./Pantry";
import Account from "./Account";
import RecipeSearch from "./RecipeSearch";
import SavedRecipes from "./SavedRecipes";
import { useSelector } from "react-redux";
import Login from "./Login";
import { getUser } from "../apiCalls/backendAPI";

const Interface = () => {
  const [user, setUser] = useState({});
  const token = useSelector((state) => state.token);
  const [initialPage, setInitialPage] = useState("");

  const fetchUserData = async () => {
    try {
      const userData = await getUser(token);
      setUser(userData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
    console.log("fetchuserdata ran in Interface");
  }, []);

  useEffect(() => {
    const lastPage = localStorage.getItem("lastPage");
    if (!user) {
      setInitialPage("/signup");
    } else if (!token) {
      setInitialPage("/login");
    } else {
      setInitialPage(lastPage ? lastPage : "/pantry");
    }
  }, [user, token]);

  const renderRoutes = () => {
    if (!user && !token) {
      return <Route path="/*" element={<Signup />} />;
    } else if (!token) {
      return (
        <>
          <Route path="/*" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </>
      );
    } else {
      return (
        <>
          <Route path="/pantry" element={<Pantry />} />
          <Route path="/recipe-search" element={<RecipeSearch />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
          <Route path="/account" element={<Account />} />
          <Route path="*" element={<Navigate to="/pantry" />} />
        </>
      );
    }
  };

  return <Routes initialPath={initialPage}>{renderRoutes()}</Routes>;
};

export default Interface;
