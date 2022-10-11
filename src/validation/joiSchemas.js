import Joi from "joi";

export const onboarding = {
  username: Joi.string().required().min(4),
  password: Joi.string().required().min(8),
  // add character requirements to password validation using Regex?
};

export const data = {
  pantryItems: Joi.string().required,
  dietaryPreference: Joi.string().required,
  allergy: Joi.string().required,
};
