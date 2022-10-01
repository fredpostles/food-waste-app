export const reverseJoiErrorObject = (error) => {
  const errorsMod = {};
  error.details.forEach((error) => {
    errorsMod[error.context.key] = error.message;
  });
  return errorsMod;
};
