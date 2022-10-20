import React, { useState, useEffect } from "react";
import Startup from "./components/Startup";
import Interface from "./components/Interface";
import { useSelector, useDispatch } from "react-redux";
import { SET_SCREEN_MODE } from "./redux/types";
import "./App.css";

const App = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const setInterface = () => {
    const payload =
      user.id && user.preferences ? 1 : user.id && !user.preferences ? 0.5 : 0;
    dispatch({ type: SET_SCREEN_MODE, payload });
    setLoading(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setInterface();
    }, 2000);
  });

  return (
    <>
      <button onClick={() => localStorage.clear()}>Clear localStorage</button>
      {loading ? <Startup /> : <Interface />}
    </>
  );
};

export default App;
