import axios from "axios";

const API_URL = `http://localhost:6005`;

export const createUser = async (user) => {
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
    const { data } = await axios.post(`${API_URL}/login`, loginDetails);
    console.log("login - data:", data);
    return data;
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
    console.log("Data:", data);
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
    console.log("Data", data);
  } catch (error) {
    console.log("updateUser error:", error);
    throw error;
  }
};
