import { user } from "../fakeApi";

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
    userDiet.push("vegan|vegetarian");

  // if user identified as gluten free
  userPreferences.glutenFree && userDiet.push("glutenFree");

  // if no diet preferences, clear the array
  !userPreferences.vegan &&
    !userPreferences.vegetarian &&
    !userPreferences.glutenFree &&
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
  let result = [];

  const userDiet = getUserDiet(userPreferences);
  console.log(userDiet);

  // console log user prefs and unfiltered recipes
  console.log("User prefs:", userPreferences, "recipes:", recipes);

  // Russell's solution
  // recipes.forEach((recipe) => {
  //   let keep = true;
  //   for (const key in userPreferences) {
  //     if (recipe[key] === false) {
  //       keep = false;
  //     }
  //   }
  //   if (keep === true) {
  //     result.push(recipe);
  //   }
  // });

  const dietAsString = userDiet.toLocaleString();
  console.log(dietAsString);

  // const regex = new RegExp(`([^,]+)`);
  // const matched = dietAsString.match(regex);
  // console.log("regex", regex, "matched", matched);

  // recipes.forEach((recipe) => {
  //   recipe[ke];
  // });
  // if (dietAsString.includes("vegan")) {
  //   recipes.forEach((recipe) => recipe.vegan === true);
  // }

  const keys = dietAsString.split(",");
  console.log(keys);

  // for (const [key, value] of Object.entries(object1)) {
  //   console.log(`${key}: ${value}`);
  // }

  recipes.forEach((recipe) => {
    // let keep = undefined;
    keys.forEach((key) => {
      if (userPreferences[key] === true) {
        if (result.includes(recipe)) {
          return;
        }
        if (recipe[key] === true) {
          result.push(recipe);
        } else return;
      }

      // if (keep === true) {
      //   result.push(recipe);
      // }
    });
  });

  // console log filtered recipes
  console.log("Filtered recipes (result)", result);
  // return only suitable recipes
  return result;

  // recipes.forEach((element) => {
  //   element.vegan === userPreferences.isVegan &&
  //     (element.vegetarian === userPreferences.isVegetarian ||
  //       element.vegetarian === userPreferences.isVegan) &&
  //     element.glutenFree === userPreferences.isGlutenFree &&
  //     result.push(element);
  // });
};
