import axios from "axios";
import API_KEY from "../../src/config";

let localCache = {};

export const getIngredients = async (searchTerm) => {
  try {
    // if no cached data, get new data and save to cache
    if (!localCache[searchTerm]) {
      const url = `https://api.spoonacular.com/food/ingredients/autocomplete?query=${searchTerm}&number=25&apiKey=${API_KEY}`;

      const { data } = await axios.get(url);
      localCache[searchTerm] = data;
    }
    // return cached data
    return localCache[searchTerm];
  } catch (error) {
    console.log("API error:", error);
  }
};

export const getRecipeByIngredient = async (searchTerm) => {
  try {
    if (!localCache[searchTerm]) {
      const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${searchTerm}&number=25&ranking=1&apiKey=${API_KEY}`;
      console.log("API call made");
      const { data } = await axios.get(url);
      localCache[searchTerm] = data;
    }
    console.log("Cached data returned:", localCache[searchTerm]);
    return localCache[searchTerm];
  } catch (error) {
    console.log("API error:", error);
  }
};

export const getRecipeInformation = async (id) => {
  try {
    if (!localCache[id]) {
      const url = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${API_KEY}`;

      const { data } = await axios.get(url);
      localCache[id] = data;
    }

    return localCache[id];
  } catch (error) {
    console.log("Incorrect ID sent or API error:", error);
  }
};

export const getRecipeInformationBulk = async (ids) => {
  try {
    if (!localCache[ids]) {
      const url = `https://api.spoonacular.com/recipes/informationBulk?ids=${ids}&apiKey=${API_KEY}`;

      const { data } = await axios.get(url);
      localCache[ids] = data;
    }

    return localCache[ids];
  } catch (error) {
    console.log("Incorrect IDs sent or API error:", error);
  }
};
