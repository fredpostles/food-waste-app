import { initialState } from "./initialState";
import { generateRandomID } from "../utils";
import {
  ADD_USER,
  UPDATE_USER,
  DELETE_USER,
  SET_SCREEN_MODE,
  SET_SEARCH_TERM,
  ADD_PANTRY_ITEM,
  UPDATE_PANTRY_ITEM,
  DELETE_PANTRY_ITEM,
  SAVE_RECIPE,
  DELETE_RECIPE,
  ADD_PREFERENCES,
} from "./types";
import { storeItem, getItem } from "../localStorage";

export function reducer(state = getItem("store") || initialState, action) {
  switch (action.type) {
    case SET_SCREEN_MODE: {
      const newState = { ...state, screenMode: action.payload };

      storeItem("store", newState);

      return newState;
    }
    case ADD_USER: {
      const user = {
        id: generateRandomID(64),
        ...action.payload,
      };

      const newState = { ...state, user, screenMode: 0.5 };

      storeItem("store", newState);

      return newState;
    }
    case UPDATE_USER: {
      const user = { ...state.user, ...action.payload };

      const newState = { ...state, user };

      storeItem("store", newState);

      return newState;
    }

    case DELETE_USER: {
      const newState = { ...state, user: {} };

      storeItem("store", newState);

      return newState;
    }

    case ADD_PREFERENCES: {
      const newState = {
        ...state,
        user: { ...state.user, preferences: { ...action.payload } },
      };

      storeItem("store", newState);

      return newState;
    }

    case ADD_PANTRY_ITEM: {
      const pantryItems = [...state.pantryItems];

      const item = {
        id: generateRandomID(12),
        itemName: action.payload.name,
        image: action.payload.image,
        dateAdded: Date.now(),
      };

      pantryItems.push(item);

      const newState = { ...state, pantryItems };

      storeItem("store", newState);

      return newState;
    }

    case UPDATE_PANTRY_ITEM:
      // logic to update pantry item
      break;

    case DELETE_PANTRY_ITEM: {
      const pantryItems = [...state.pantryItems];

      const indexOfItem = pantryItems.findIndex(
        (item) => item.id === action.payload
      );

      pantryItems.splice(indexOfItem, 1);

      const newState = { ...state, pantryItems };

      storeItem("store", newState);

      return newState;
    }

    case SET_SEARCH_TERM: {
      const newState = { ...state, searchTerm: action.payload };
      return newState;
    }

    case SAVE_RECIPE:
      const savedRecipes = [...state.savedRecipes];

      const recipe = {
        id: action.payload.id,
        name: action.payload.title,
        image: action.payload.image,
        likes: action.payload.likes,
      };

      const indexOfRecipe = savedRecipes.findIndex((recipe) => {
        return recipe.id === action.payload.id;
      });

      if (indexOfRecipe > -1) {
        return state;
      } else {
        savedRecipes.push(recipe);
      }

      const newState = { ...state, savedRecipes };

      storeItem("store", newState);

      return newState;

    case DELETE_RECIPE: {
      const savedRecipes = [...state.savedRecipes];

      const indexOfRecipe = savedRecipes.findIndex(
        (item) => item.id === action.payload
      );

      savedRecipes.splice(indexOfRecipe, 1);

      const newState = { ...state, savedRecipes };

      storeItem("store", newState);

      return newState;
    }

    default:
      return state;
  }
}
