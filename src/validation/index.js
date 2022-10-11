import { joiValidation } from "./joi";
import { onboarding, data } from "./joiSchemas";

export const validate = (type, payload) => {
  // type indicates what part of app is being validated, e.g. 1, 2, 3, 4 (to match diff screens)
  // payload is whatever data is to be validated

  switch (type) {
    case 0: // onboarding
      return joiValidation(onboarding, payload);

    case 1:
      return joiValidation(data, payload);

    case 2:
      // validate recipe search
      break;

    default:
      console.log("Invalid type sent in!");
      break;
  }
};
