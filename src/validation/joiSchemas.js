import Joi from "joi";

const preferenceSchema = Joi.object({
  vegan: Joi.boolean().default(false),
  vegetarian: Joi.boolean().default(false),
  glutenFree: Joi.boolean().default(false),
}).unknown(true);

export const onboarding = {
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } }),
  password: Joi.string().required().alphanum().min(8),
  name: Joi.string().required().min(2).max(25),
  surname: Joi.string().required().min(2).max(25),
  preferences: preferenceSchema,
};
