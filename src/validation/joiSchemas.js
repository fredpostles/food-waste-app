import Joi from "joi";

export const onboarding = {
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } }),
  password: Joi.string().required().alphanum().min(8),
  // add character requirements to password validation using Regex?
  name: Joi.string().required().min(2).max(25),
  surname: Joi.string().required().min(2).max(25),
};
