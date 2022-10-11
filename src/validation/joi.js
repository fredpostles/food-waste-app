import Joi from "joi";
import { reverseJoiErrorObject } from "./utils";

export const joiValidation = (schema, payload) => {
  const j = Joi.object(schema);
  const r = j.validate(payload, { abortEarly: false });

  if (r.error) {
    return reverseJoiErrorObject(r.error);
  }

  return true;
};
