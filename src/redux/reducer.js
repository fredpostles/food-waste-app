import { initialState } from "./initialState";
import { generateRandomID } from "../utils";
import {
  ADD_USER,
  UPDATE_USER,
  DELETE_USER,
  SET_SEARCH_TERM,
  ADD_PANTRY_ITEM,
  DELETE_PANTRY_ITEM,
  EDIT_QUANTITY,
  SAVE_RECIPE,
  UNSAVE_RECIPE,
  DELETE_RECIPE,
  ADD_PREFERENCES,
  UPDATE_PREFERENCES,
  SET_INGREDIENT_SEARCH,
  CLEAR_INGREDIENT_SEARCH,
  SET_RECIPE_INFO,
  ADD_TOKEN,
  DELETE_TOKEN,
} from "./types";
import { storeItem, getItem } from "../localStorage";

export function reducer(state = getItem("store") || initialState, action) {
  switch (action.type) {
    case ADD_USER: {
      const user = {
        id: generateRandomID(64),
        ...action.payload,
      };

      const newState = { ...state, user };

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
      const newState = { ...state, user: null };

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

    case UPDATE_PREFERENCES: {
      const newState = {
        ...state,
        user: {
          ...state.user,
          preferences: { ...state.user.preferences, ...action.payload },
        },
      };

      storeItem("store", newState);

      return newState;
    }

    case ADD_TOKEN: {
      const newState = { ...state, token: action.payload };

      storeItem("store", newState);

      return newState;
    }

    case DELETE_TOKEN: {
      const newState = { ...state, token: null };

      storeItem("store", newState);

      return newState;
    }

    case ADD_PANTRY_ITEM: {
      const pantryItems = [...state.pantryItems];

      const item = {
        id: generateRandomID(12),
        name: action.payload.name,
        image: action.payload.image,
        dateAdded: Date.now(),
      };

      if (pantryItems.some((element) => element.name === action.payload.name)) {
        return state;
      } else {
        pantryItems.push(item);
      }

      const newState = { ...state, pantryItems };

      storeItem("store", newState);

      return newState;
    }

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

    case EDIT_QUANTITY: {
      const pantryItems = [...state.pantryItems];

      const indexOfItem = pantryItems.findIndex(
        (item) => item.id === action.payload.id
      );

      pantryItems[indexOfItem] = {
        ...pantryItems[indexOfItem],
        quantity: action.payload.quantity,
      };

      const newState = { ...state, pantryItems };

      storeItem("store", newState);

      return newState;
    }

    case SET_SEARCH_TERM: {
      const newState = { ...state, searchTerm: action.payload };

      storeItem("store", newState);

      return newState;
    }

    case SAVE_RECIPE:
      const savedRecipes = [...state.savedRecipes];

      const recipe = action.payload;

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

    case UNSAVE_RECIPE: {
      const savedRecipes = [...state.savedRecipes];

      const indexOfRecipe = savedRecipes.findIndex((recipe) => {
        return recipe.id === action.payload;
      });

      savedRecipes.splice(indexOfRecipe, 1);

      const newState = { ...state, savedRecipes };

      storeItem("store", newState);

      return newState;
    }

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

    case SET_INGREDIENT_SEARCH: {
      const ingredientSearch = [...action.payload];

      const newState = { ...state, ingredientSearch };

      storeItem("store", newState);

      return newState;
    }

    case CLEAR_INGREDIENT_SEARCH: {
      const clearedIngredientSearch = null;

      const newState = { ...state, ingredientSearch: clearedIngredientSearch };

      storeItem("store", newState);
      return newState;
    }

    case SET_RECIPE_INFO: {
      const recipeInfo = [...action.payload];

      const newState = { ...state, recipeInfo };

      storeItem("store", newState);

      return newState;
    }

    default:
      return state;
  }
}
