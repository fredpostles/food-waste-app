import axios from "axios";
import { storeItem } from "../localStorage";

// const storeApiData = (payload) => {
//   localStorage.setItem("cache", JSON.stringify(payload));
// };

export const getIngredients = async (searchTerm) => {
  try {
    const url = `https://api.spoonacular.com/food/ingredients/autocomplete?query=${searchTerm}&number=10&apiKey=97d9014fa12e44a4be62b6f3c8fc2a0e`;

    const result = await axios.get(url);

    console.log(result);

    storeItem("store", result.data);

    return result.data;
  } catch (error) {
    console.log(error.details);
  }
};
