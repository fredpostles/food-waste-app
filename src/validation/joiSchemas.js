import Joi from "joi";

export const onboarding = {
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } }),
  password: Joi.string().required().min(8),
  // add character requirements to password validation using Regex?
  name: Joi.string().required(),
  surname: Joi.string().required(),
};
