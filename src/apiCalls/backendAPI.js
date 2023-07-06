import axios from "axios";

const API_URL = `http://localhost:6005`;

export const createUser = async (user) => {
  // console.log(API_URL);
  try {
    const { data } = await axios.post(`${API_URL}/signup`, user);
    console.log("createUser - data:", data);
    return data;
  } catch (error) {
    console.log("createUser error:", error);
    throw error;
  }
};

export const login = async (loginDetails) => {
  try {
    const response = await axios.post(`${API_URL}/login`, loginDetails);
    // console.log("login response", response);
    // console.log("login - data:", response.data);
    if (response.status !== 200) {
      console.log("login response status !== 200");
      return;
    }
    return response.data;
  } catch (error) {
    console.log("login error:", error);
    throw error;
  }
};

export const getUser = async (token) => {
  try {
    const { data } = await axios.get(`${API_URL}/users`, {
      headers: {
        token: `${token}`,
      },
    });
    console.log("getUser data:", data);
    return data.user;
  } catch (error) {
    console.log("getUser error:", error);
    throw error;
  }
};

export const updateUser = async (userInput, token) => {
  console.log("updateUser ran");
  console.log("userInput in updateUser front", userInput);
  try {
    const { data } = await axios.put(`${API_URL}/users`, userInput, {
      headers: {
        token: `${token}`,
      },
    });
    console.log("updateUser data", data);
    return data;
  } catch (error) {
    console.log("updateUser error:", error);
    throw error;
  }
};

export const logoff = async (token) => {
  try {
    const result = await axios.delete(`${API_URL}/logoff`, {
      headers: { token },
    });
    console.log("logoff result", result);
    if (result.status !== 204) {
      console.log("logoff error response status !== 204");
    }
  } catch (error) {
    console.log("logoff error", error);
    throw error;
  }
};

export const deleteUser = async (token) => {
  try {
    const result = await axios.delete(`${API_URL}/users`, {
      headers: { token },
    });
    console.log("deleteUser result", result);
    if (result.status === 204) {
      console.log("User successfully deleted.");
    }
  } catch (error) {
    console.log("deleteUser", error);
    throw error;
  }
};

export const addToPantry = async (pantryItem, token) => {
  try {
    const result = await axios.post(`${API_URL}/pantry`, pantryItem, {
      headers: {
        token: `${token}`,
      },
    });
    console.log("addToPantry result:", result);
  } catch (error) {
    console.log("addToPantry error:", error);
    throw error;
  }
};

export const getAllPantryitems = async (token) => {
  try {
    const { data } = await axios.get(`${API_URL}/pantry/items`, {
      headers: {
        token: `${token}`,
      },
    });
    console.log("getAllPantryItems data:", data);
    return data;
  } catch (error) {
    console.log("could not get all pantry items:", error);
    throw error;
  }
};

export const updatePantryItem = async (token, id, quantity) => {
  try {
    const { data } = await axios.put(
      `${API_URL}/pantry/item/${id}`,
      { quantity },
      {
        headers: {
          token: `${token}`,
        },
      }
    );
    console.log("updatePantryItem data:", data);
    return data;
  } catch (error) {
    console.log("could not update pantry item:", error);
    throw error;
  }
};

export const deletePantryItem = async (token, id) => {
  try {
    const result = await axios.delete(`${API_URL}/pantry/item/${id}`, {
      headers: {
        token: `${token}`,
      },
    });
    console.log("result of delete pantry item:", result);
  } catch (error) {
    console.log("error deleting pantry item", error);
  }
};

export const saveRecipe = async (recipe, token) => {
  try {
    const result = await axios.post(`${API_URL}/saved-recipes`, recipe, {
      headers: {
        token: `${token}`,
      },
    });
    console.log("saveRecipe result:", result);
  } catch (error) {
    console.log("saveRecipe error:", error);
  }
};

export const getSavedRecipes = async (token) => {
  try {
    const { data } = await axios.get(`${API_URL}/saved-recipes`, {
      headers: {
        token: `${token}`,
      },
    });

    // Check if there are saved recipes in the response
    if (!data || data.savedRecipeResults?.length === 0) {
      // Handle the case of no saved recipes
      console.log("No saved recipes found");
      return { savedRecipeResults: [] };
    }

    // console.log("getSavedRecipes data:", data);
    return data;
  } catch (error) {
    console.log("getSavedRecipes error:", error);
    return { savedRecipeResults: [] };
  }
};

export const deleteSavedRecipe = async (token, id) => {
  try {
    const result = await axios.delete(`${API_URL}/saved-recipes/${id}`, {
      headers: {
        token: `${token}`,
      },
    });
    console.log("result of delete saved recipe:", result);
  } catch (error) {
    console.log("error deleting saved recipe", error);
  }
};
