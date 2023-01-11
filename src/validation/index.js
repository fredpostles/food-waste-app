import { joiValidation } from "./joi";
import { onboarding } from "./joiSchemas";

export const validate = (type, payload) => {
  // type indicates what part of app is being validated, e.g. 1, 2, 3, 4 (to match diff screens)
  // payload is whatever data is to be validated

  switch (type) {
    case 0: // onboarding
      return joiValidation(onboarding, payload);

    case 1:
      // pantry
      break;

    case 2:
      //recipe search
      break;

    default:
      console.log("Invalid type sent in!");
      break;
  }
};
