import axios from "axios";

const API_URL = `http://localhost:6005`;

export const createUser = async (user) => {
  console.log(API_URL);
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
      console.log("logoff error, status axios response status !== 204");
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
