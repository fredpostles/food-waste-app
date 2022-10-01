import { joiValidation } from "./joi";
import { onboarding, data } from "./joiSchemas";

export const validate = (type, payload) => {
  // type indicates what part of app is being validated, e.g. 1, 2, 3, 4 (to match diff screens)
  // payload is whatever data is to be validated

  switch (type) {
    case 1: // onboarding
      return joiValidation(onboarding, payload);

    case 2:
      return joiValidation(data, payload);

    case 3:
    // validate recipe search

    default:
      console.log("Invalid type sent in!");
      break;
  }
};
