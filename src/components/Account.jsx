import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { validate } from "../validation";
import { capitalizeFirstLetter } from "../utils";
import Navigation from "./Navigation";
import AccountInfo from "./Account/AccountInfo";
import { UPDATE_USER } from "../redux/types";
import Preferences from "./Account/Preferences";
import { getUser, updateUser } from "../apiCalls/backendAPI";
import LoadingModal from "./Modal/LoadingModal";
import isEqual from "lodash/isEqual";
import Logoff from "./Logoff/Logoff";
import DeleteAccount from "./Account/DeleteAccount";

const Account = () => {
  const token = useSelector((state) => state.token);
  const [userData, setUserData] = useState();
  const [userInput, setUserInput] = useState({});
  const [errors, setErrors] = useState();
  const [isLoaded, setIsLoaded] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [preferencesUpdated, setPreferencesUpdated] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    const fetchUserData = async () => {
      try {
        // console.log("here");
        const user = await getUser(token);
        // console.log("user", user);
        setUserData({
          email: user.email,
          // leave hashed password in back end
          // password: user.password,
          name: user.name,
          surname: user.surname,
          preferences: {
            vegan: user.preferences.vegan,
            vegetarian: user.preferences.vegetarian,
            glutenFree: user.preferences.glutenFree,
          },
        });
        setUserInput({
          email: user.email,
          password: "",
          name: user.name,
          surname: user.surname,
        });
        // console.log("hereee");
        setIsLoaded(true);
      } catch (error) {
        console.log("Error fetching user:", error);
        setIsLoaded(true);
        if (error.response) {
          switch (error.response.status) {
            case 401:
              setErrorMessage("Unauthorized access. Please log in again.");
              break;
            case 403:
              setErrorMessage(
                "Forbidden. You do not have permission to access this resource."
              );
              break;
            case 404:
              setErrorMessage("User not found.");
              break;
            case 500:
              setErrorMessage(
                "Server error. We apologise for the inconvenience. Please try again later."
              );
              break;
            default:
              setErrorMessage(
                "An error occurred. Please try again later or contact support."
              );
          }
        } else {
          setErrorMessage(
            "An error occurred. Please try again later or contact support."
          );
        }
        throw error;
      }
    };
    fetchUserData();
  }, [token, preferencesUpdated]);

  // console.log("userData after being set", userData);

  const onInput = (e) => {
    const newInput = { ...userInput, [e.target.name]: e.target.value };
    setUserInput(newInput);

    const result = validate("onboarding", newInput);

    if (result === true) {
      // no error to display
      setErrors(undefined);
    } else {
      // there is an error; display it
      setErrors(result);
    }
    checkForInputChange();
  };

  const onUpdate = async () => {
    if (errors) {
      alert("Could not update. Please check the errors below.");
    } else {
      const result = await updateUser({ ...userInput }, token);
      // console.log("result of updateUser, account:", result);
      setShowPasswordInput(false);
    }
  };

  const checkForInputChange = () => {
    if (isEqual(userData, userInput)) {
      console.log("no change in user data");
      // console.log("userData:", userData);
      // console.log("userInput:", userInput);
    } else {
      console.log("There was a change in user data");
      // console.log("userData:", userData);
      // console.log("userInput:", userInput);
      setShowPasswordInput(true);
    }
  };

  const onCancel = () => {
    setShowPasswordInput(false);
  };

  return (
    <>
      <Navigation />
      <div className="account__container">
        <h1 className="section__heading">Your Account</h1>
        <div className="accountInfo__container">
          <h2>
            Hi {userData ? capitalizeFirstLetter(userData.name) : "there"}!
          </h2>
          {userData ? (
            <>
              <h3>Here is your account info:</h3>
              <AccountInfo
                onInput={onInput}
                errors={errors}
                user={userData}
                showPasswordInput={showPasswordInput}
              />
              <button onClick={onUpdate} className="updateBtn">
                Update
              </button>
            </>
          ) : null}

          {showPasswordInput ? (
            <button className="cancelBtn" onClick={onCancel}>
              Cancel
            </button>
          ) : null}
        </div>
        {userData ? (
          <Preferences
            user={userData}
            setUserData={setUserData}
            setPreferencesUpdated={setPreferencesUpdated}
          />
        ) : null}
        <div className="dangerZone__container">
          <h2>Account Management:</h2>
          <p>Choose from the following options to manage your account:</p>
          <p>
            <strong>Log Out:</strong> Click the "Log Out" button to securely log
            out of your current session.
          </p>
          <p>
            <strong>Delete Account:</strong> If you wish to delete your entire
            account, use the "Delete Account" option.
          </p>
          <div className="accountMgmt__actions">
            <Logoff token={token} />
            <DeleteAccount token={token} />
          </div>
        </div>
        {!isLoaded ? <LoadingModal /> : null}
      </div>
    </>
  );
};

export default Account;
