import React, { useState, useEffect } from "react";
import Startup from "./components/Startup";
import Interface from "./components/Interface";
import { useSelector, useDispatch } from "react-redux";
import { SET_SCREEN_MODE } from "./redux/types";
import "./css/generics.css";
import "./App.css";

const App = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const screenMode = useSelector((state) => state.screenMode);
  const dispatch = useDispatch();

  const setInterface = () => {
    console.log(screenMode);
    let payload;
    if (screenMode === 0) {
      payload = !user.id ? 0 : 1;
    } else {
      payload = screenMode ? screenMode : 1;
    }
    console.log(payload);
    dispatch({ type: SET_SCREEN_MODE, payload });
    setLoading(false);
  };

  useEffect(() => {
    // setTimeout(() => {
    setInterface();
    // }, 2000);
  }, []);

  return (
    <>
      <button onClick={() => localStorage.clear()}>Clear localStorage</button>
      <div className="appContainer">
        {loading ? <Startup /> : <Interface />}
      </div>
    </>
  );
};

export default App;
