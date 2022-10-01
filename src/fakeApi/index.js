// define data structure

import { generateRandomID } from "../utils";

export const user = {
  // id: 0,
  // username: "",
  // image: "",
  // signUpDate: 12345678910,
  // dietaryPreferences: {
  //   isVegan: false,
  //   isVegetarian: true,
  //   isGlutenFree: false,
  // },
};

export const data = {
  pantryItems: [
    { id: generateRandomID(12), itemName: "carrots" },
    { id: generateRandomID(12), itemName: "oats" },
    { id: generateRandomID(12), itemName: "soya milk" },
    { id: generateRandomID(12), itemName: "pasta" },
    { id: generateRandomID(12), itemName: "rice" },
    { id: generateRandomID(12), itemName: "kale" },
    { id: generateRandomID(12), itemName: "oranges" },
    { id: generateRandomID(12), itemName: "apples" },
  ],
  savedRecipes: [],
};

export const screenMode = 0;
