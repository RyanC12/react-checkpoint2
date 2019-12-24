import { combineReducers } from "redux";

const user = (state = [], action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...action.value,
        isAuthenticated: true,
        isLoading: false,
        isLoaded: true
      };
    case "LOGOUT_SUCCESS":
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        isLoaded: false
      };
    default:
      return state;
  }
};

const listings = (state = [], action) => {
  switch (action.type) {
    case "ADD_BUSINESS":
      return [...state, action.value];
    case "DELETE_BUSINESS":
      const listings = [...state];
      listings.splice(action.value, 1);
      return listings;
    default:
      return state;
  }
};

export default combineReducers({ user, listings });