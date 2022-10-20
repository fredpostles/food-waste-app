import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { validate } from "../validation";
import { capitalizeFirstLetter } from "../validation/utils";
import Navigation from "./Navigation";
import AccountInfo from "./Account/AccountInfo";
import { UPDATE_USER } from "../redux/types";

const Account = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState({});
  const [userInput, setUserInput] = useState({
    username: "",
    password: "",
    name: "",
    surname: "",
  });
  const [errors, setErrors] = useState();

  const {
    isVegan,
    isVegetarian,
    isGlutenFree,
    noDairy,
    noEgg,
    noGluten,
    noGrain,
    noPeanut,
    noSeafood,
    noSesame,
    noShellfish,
    noSoy,
    noSulfite,
    noTreeNuts,
    noWheat,
  } = user.preferences;

  const onInput = (e) => {
    const newInput = { ...userInput, [e.target.name]: e.target.value };
    setUserInput(newInput);

    const result = validate(0, newInput);

    if (result === true) {
      // no error to display
      setErrors(undefined);
    } else {
      // there is an error; display it
      setErrors(result);
    }
  };

  const onUpdate = () => {
    dispatch({ type: UPDATE_USER, payload: userInput });
  };

  //   const onEdit = (e) => {
  //     setEdit({ ...edit, [e]: true });
  //   };

  // // in the opening tag of item to be edited
  // onClick={() => onEdit("isVegan")}

  //   // under the item to be edited
  //   {edit.isVegan && <input type="checkbox" name="isVegan"></input>}

  const formattedName = capitalizeFirstLetter(user.name);

  return (
    <>
      <Navigation />
      <div className="account__container">
        <h1>Your Account</h1>
        <h2>Hi, {formattedName}!</h2>
        <h3>Here is your account info:</h3>
        <AccountInfo onInput={onInput} errors={errors} user={user} />
        <button onClick={onUpdate}>Save</button>
        <div className="account__dietaryInfo__container">
          <div className="account__dietaryPrefs__container">
            <p>Dietary Preferences:</p>
            <ul className="dietaryPreferences__list">
              {isVegan && <li>Vegan</li>}
              {isVegetarian && <li>Vegetarian</li>}
              {isGlutenFree && <li>Gluten Free</li>}
            </ul>
          </div>
          <div className="account__intolerances__container">
            <p>Allergies or Intolerances:</p>
            <ul className="intolerances__list">
              {noDairy && <li>Dairy</li>}
              {noEgg && <li>Egg</li>}
              {noGluten && <li>Gluten</li>}
              {noGrain && <li>Grain</li>}
              {noPeanut && <li>Peanuts</li>}
              {noSeafood && <li>Seafood</li>}
              {noSesame && <li>Sesame</li>}
              {noShellfish && <li>Shellfish</li>}
              {noSoy && <li>Soy</li>}
              {noSulfite && <li>Sulfite</li>}
              {noTreeNuts && <li>Tree nuts</li>}
              {noWheat && <li>Wheat</li>}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
