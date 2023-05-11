import React from "react";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../apiCalls/backendAPI";
import { DELETE_USER, DELETE_TOKEN } from "../../redux/types";

const DeleteAccount = ({ token }) => {
  const dispatch = useDispatch();

  const onDeleteAccount = async () => {
    try {
      await deleteUser(token)
        .then(dispatch({ type: DELETE_USER }))
        .then(dispatch({ type: DELETE_TOKEN, payload: token }));
    } catch (error) {
      console.log("onDeleteAccount error", error);
    }
  };

  return (
    <button className="deleteBtn" onClick={onDeleteAccount}>
      Delete Account
    </button>
  );
};

export default DeleteAccount;
