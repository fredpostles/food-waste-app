import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_SCREEN_MODE } from "../redux/types";

const Navigation = () => {
  const dispatch = useDispatch();
  const screenMode = useSelector((state) => state.screenMode);
  return (
    <>
      <nav>
        <button onClick={() => dispatch({ type: SET_SCREEN_MODE, payload: 1 })}>
          Pantry
        </button>
        <button onClick={() => dispatch({ type: SET_SCREEN_MODE, payload: 2 })}>
          Search
        </button>
        <button onClick={() => dispatch({ type: SET_SCREEN_MODE, payload: 3 })}>
          Account
        </button>
      </nav>
    </>
  );
};

export default Navigation;
