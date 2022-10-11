// define data structure

import { generateRandomID } from "../utils";

export const user = {
  id: 0,
  username: "fredp",
  firstName: "Fred",
  secondName: "Postles",
  image: "",
  signupDate: Date.now(),
  dietaryPreferences: {
    isVegan: false,
    isVegetarian: true,
    isGlutenFree: false,
  },
};

export const data = {
  pantryItems: [
    { id: generateRandomID(12), itemName: "Carrots", quantity: "500g" },
    { id: generateRandomID(12), itemName: "Oats", quantity: "1kg" },
    { id: generateRandomID(12), itemName: "Soya milk", quantity: "500ml" },
    { id: generateRandomID(12), itemName: "Pasta", quantity: "1.5kg" },
    { id: generateRandomID(12), itemName: "Rice", quantity: "5kg" },
    { id: generateRandomID(12), itemName: "Kale", quantity: "400g" },
    { id: generateRandomID(12), itemName: "Oranges", quantity: 6 },
    { id: generateRandomID(12), itemName: "Apples", quantity: 12 },
  ],
  savedRecipes: [],
};

export const screenMode = 0;
