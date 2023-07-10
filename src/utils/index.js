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
  userPreferences.vegan &&
    !userPreferences.vegetarian &&
    userDiet.push("vegan");

  // if user idenfitied as vegetarian only, or both vegan & vegetarian
  (userPreferences.vegetarian ||
    (userPreferences.vegan && userPreferences.vegetarian)) &&
    userDiet.push("vegan, vegetarian");

  // if user identified as gluten free
  userPreferences.glutenFree && userDiet.push("glutenFree");

  // if no diet preferences, clear the array
  (!userPreferences.vegan || userPreferences.vegan === false) &&
    (!userPreferences.vegetarian || userPreferences.vegetarian === false) &&
    (!userPreferences.glutenFree || userPreferences.glutenFree === false) &&
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
  // turn preferences into a hash table for efficiency
  // const preferences = new Map(Object.entries(userPreferences));
  const preferences = userPreferences;

  console.log(recipes);
  console.log(preferences);

  // if neither argument needed sent in, return
  if (!preferences || !recipes) return;

  // Check if all preferences are false
  const allFalse = Object.values(preferences).every((pref) => !pref);

  // If all preferences are false, return all recipes
  if (allFalse) {
    console.log("All preferences are false, returning all recipes.");
    return recipes;
  }

  // Set to put filtered recipes into
  let result = new Set();

  // filter recipes to only return ones that match user's diet
  recipes.forEach((recipe) => {
    // initiate match variable to true
    let match = true;

    // if recipe already added, return
    if (result.has(recipe)) {
      return;
    }
    // for each key in preferences, filter matching recipes
    for (const key in preferences) {
      // if recipe doesn't match preference, exit early
      if (preferences[key] === true && recipe[key] !== preferences[key]) {
        match = false;
        break;
      }
      // filter
      // if (preferences[key] === true && recipe[key] === preferences[key]) {
      //   result = recipes.filter((recipe) => recipe[key] === preferences[key]);
      // }
    }

    // if recipe matches preferences, add to result Set
    if (match) {
      result.add(recipe);
    }
  });

  // convert Set back to Array
  const filteredRecipes = [...result];

  // console log filtered recipes
  console.log("Filtered recipes (result)", filteredRecipes);

  // return only suitable recipes
  return filteredRecipes;
};
