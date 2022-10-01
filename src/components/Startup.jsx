import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_SCREEN_MODE } from "../redux/types";

const Startup = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    setTimeout(() => {
      const payload = user.id ? 1 : 0;
      dispatch({ type: SET_SCREEN_MODE, payload });
    }, 2000);
  }, []);

  return (
    <>
      <h1>Waste-saving recipes</h1>
      <h2>Loading...</h2>

      <small>&copy; Fred Postles 2022</small>
    </>
  );
};

export default Startup;
