import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SET_SCREEN_MODE } from "../redux/types";

const Navigation = () => {
  const dispatch = useDispatch();

  return (
    <>
      <nav className="mainNav">
        <Link to="/pantry">Pantry</Link>
        <Link to="/recipe-search">Recipe Search</Link>
        <Link to="/saved-recipes">Saved Recipes</Link>
        <Link to="/account">Account</Link>
        {/* <a onClick={() => dispatch({ type: SET_SCREEN_MODE, payload: 1 })}>
          Pantry
        </a>
        <a onClick={() => dispatch({ type: SET_SCREEN_MODE, payload: 2 })}>
          Recipe Search
        </a>
        <a onClick={() => dispatch({ type: SET_SCREEN_MODE, payload: 3 })}>
          Saved Recipes
        </a>
        <a onClick={() => dispatch({ type: SET_SCREEN_MODE, payload: 4 })}>
          Account
        </a> */}
      </nav>
    </>
  );
};

export default Navigation;
