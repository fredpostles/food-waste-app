import { joiValidation } from "./joi";
import { onboarding, login } from "./joiSchemas";

export const validate = (type, payload) => {
  // type indicates what part of app is being validated, e.g. 1, 2, 3, 4 (to match diff screens)
  // payload is whatever data is to be validated

  switch (type) {
    case "onboarding": // onboarding
      return joiValidation(onboarding, payload);

    case "login":
      // login
      return joiValidation(login, payload);

    case "pantry":
      //pantry
      break;

    case "recipeSearch":
      // recipe search
      break;

    default:
      console.log("Invalid type sent in!");
      break;
  }
};
