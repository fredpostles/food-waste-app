export function generateRandomID(length = 64) {
  const now = Date.now().toString;
  let uniqueId = "";
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
  const charsLength = chars.length;
  for (let index = 0; index < length - now.length; index++) {
    uniqueId += chars.charAt(Math.floor(Math.random() * charsLength));
  }
  return uniqueId + Date.now();
}

export function capitalizeFirstLetter(str) {
  if (typeof str !== "string") {
    return null;
  } else return str.charAt(0).toUpperCase() + str.slice(1);
}

export const getUserDiet = (userPreferences) => {
  // user diet prefs
  const userDiet = [];

  // if user identified as vegan
  userPreferences.isVegan &&
    !userPreferences.isVegetarian &&
    userDiet.push("vegan");

  // if user idenfitied as vegetarian only, or both vegan & vegetarian
  (userPreferences.isVegetarian ||
    (userPreferences.isVegan && userPreferences.isVegetarian)) &&
    userDiet.push("vegan|vegetarian");

  // if no diet preferences, clear the array
  !userPreferences.isVegan &&
    !userPreferences.isVegetarian &&
    userDiet.splice(0, userDiet.length);

  return userDiet;
};

export const getUserIntolerances = (userPreferences) => {
  // user intolerances
  const userIntolerances = [];

  // get intolerances, remove "no" & add to userIntolerances array
  Object.entries(userPreferences).forEach((element) => {
    if (element[0].includes("no") && element[1] === true) {
      userIntolerances.push(element[0].slice(2));
    } else return;
  });

  return userIntolerances;
};

export const checkUserPrefs = (userPreferences, recipes) => {
  // filter recipes to only return ones that match user's diet
  const result = recipes.filter(
    (element) =>
      element.vegan === userPreferences.isVegan &&
      element.vegetarian === userPreferences.isVegetarian
  );

  // return only suitable recipes
  console.log(result);
  return result;
};
