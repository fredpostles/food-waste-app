import axios from "axios";

// const storeApiData = (payload) => {
//   localStorage.setItem("cache", JSON.stringify(payload));
// };

export const getIngredients = async (searchTerm) => {
  try {
    const url = `https://api.spoonacular.com/food/ingredients/autocomplete?query=${searchTerm}&number=15&apiKey=97d9014fa12e44a4be62b6f3c8fc2a0e`;

    const result = await axios.get(url);

    return result.data;
  } catch (error) {
    console.log("API error:", error.details);
  }
};

export const getRecipeByIngredient = async (searchTerm) => {
  try {
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${searchTerm}&number=15&ranking=1&apiKey=97d9014fa12e44a4be62b6f3c8fc2a0e`;

    const result = await axios.get(url);

    return result.data;
  } catch (error) {
    console.log("API error:", error.details);
  }
};

export const getRecipeInformation = async (id) => {
  try {
    const url = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=97d9014fa12e44a4be62b6f3c8fc2a0e`;

    const result = await axios.get(url);

    return result.data;
  } catch (error) {
    console.log("Incorrect ID sent or API error:", error.details);
  }
};

export const getRecipeInformationBulk = async (ids) => {
  try {
    const url = `https://api.spoonacular.com/recipes/informationBulk?ids=${ids}&apiKey=97d9014fa12e44a4be62b6f3c8fc2a0e`;

    const result = await axios.get(url);

    return result.data;
  } catch (error) {
    console.log("Incorrect IDs sent or API error:", error.details);
  }
};
