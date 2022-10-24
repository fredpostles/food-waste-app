import React from "react";
import { useDispatch } from "react-redux";
import { SET_SCREEN_MODE } from "../redux/types";

const Navigation = () => {
  const dispatch = useDispatch();

  return (
    <>
      <nav className="mainNav">
        <a onClick={() => dispatch({ type: SET_SCREEN_MODE, payload: 1 })}>
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
        </a>
      </nav>
    </>
  );
};

export default Navigation;
