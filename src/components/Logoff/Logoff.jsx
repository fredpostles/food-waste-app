import React from "react";
import { useDispatch } from "react-redux";
import { logoff } from "../../apiCalls/backendAPI";
import { DELETE_TOKEN } from "../../redux/types";

const Logoff = ({ token }) => {
  const dispatch = useDispatch();

  const onLogoff = async () => {
    try {
      await logoff(token).then(
        dispatch({ type: DELETE_TOKEN, payload: token })
      );
    } catch (error) {
      console.log("onLogoff error", error);
    }
  };

  return (
    <>
      <div className="logoff__container">
        <button onClick={onLogoff} className="logoffBtn">
          Log out
        </button>
      </div>
    </>
  );
};

export default Logoff;
