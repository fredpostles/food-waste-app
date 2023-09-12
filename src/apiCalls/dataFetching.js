import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

const localCache = {};
const CACHE_EXPIRATION_TIME = 60 * 60 * 1000; // 1 hour
const MAX_CACHE_SIZE = 100;

const fetchData = async (url, cacheKey) => {
  try {
    const { data } = await axios.get(url);
    localCache[cacheKey] = {
      data,
      timestamp: Date.now(),
    };
    // check cache size
    if (localCache.size > MAX_CACHE_SIZE) {
      // Evict older entries when cache size limit is reached
      const oldestKey = localCache.keys().next().value;
      delete localCache[oldestKey];
    }
    return data;
  } catch (error) {
    console.log("API error:", error);
    throw error; // Throw the error to indicate the failure
  }
};

const getCachedData = (cacheKey) => {
  const cachedData = localCache[cacheKey];
  if (cachedData && Date.now() - cachedData.timestamp < CACHE_EXPIRATION_TIME) {
    return cachedData.data;
  }
  delete localCache[cacheKey]; // Remove stale or expired data
  return null;
};

export const getIngredients = async (searchTerm) => {
  const cacheKey = `ingredients_${searchTerm}`;
  const cachedData = getCachedData(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  const url = `https://api.spoonacular.com/food/ingredients/autocomplete?query=${searchTerm}&number=25&apiKey=${API_KEY}`;
  return fetchData(url, cacheKey);
};

export const getRecipeByIngredient = async (searchTerm) => {
  const cacheKey = `recipeByIngredient_${searchTerm}`;
  const cachedData = getCachedData(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${searchTerm}&number=30&ranking=1&apiKey=${API_KEY}`;
  return fetchData(url, cacheKey);
};

export const getRecipeInformation = async (id) => {
  const cacheKey = `recipeInformation_${id}`;
  const cachedData = getCachedData(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  const url = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${API_KEY}`;
  return fetchData(url, cacheKey);
};

export const getRecipeInformationBulk = async (ids) => {
  const cacheKey = `recipeInformationBulk_${ids}`;
  const cachedData = getCachedData(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  const url = `https://api.spoonacular.com/recipes/informationBulk?ids=${ids}&apiKey=${API_KEY}`;
  return fetchData(url, cacheKey);
};
