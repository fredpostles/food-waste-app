export const reverseJoiErrorObject = (error) => {
  const errorsMod = {};
  error.details.forEach((error) => {
    errorsMod[error.context.key] = error.message;
  });
  return errorsMod;
};

export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
