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
  UNSAVE_RECIPE,
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
        username: action.payload.username,
      };

      const newState = { ...state, user, screenmode: 4 };

      storeItem("store", newState);

      return newState;
    }
    case UPDATE_USER: {
      const user = { ...state.user };

      user.username = action.payload.username;

      const newState = { ...state, user };

      storeItem("store", newState);

      return newState;
    }

    case DELETE_USER: {
      const newState = { ...state, user: {} };

      storeItem("store", newState);

      return newState;
    }

    case ADD_PANTRY_ITEM: {
      const newState = { ...state.data };

      const item = {
        id: generateRandomID(12),
        itemName: action.payload,
      };

      newState.data.pantryItems.push(item);

      storeItem("store", newState);

      return newState;
    }

    case UPDATE_PANTRY_ITEM:
      // logic to update pantry item
      break;

    case DELETE_PANTRY_ITEM:
      // logic to delete item from pantry
      break;

    case SET_SEARCH_TERM: {
      const newState = { ...state, searchTerm: action.payload };
      return newState;
    }

    case SAVE_RECIPE:
      //logic to add recipe to favourites // save
      break;

    case UNSAVE_RECIPE:
      // logic to remove recipe from favourites // unsave
      break;

    default:
      break;
  }
}
