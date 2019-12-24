export const addBusiness = listing => {
    return {
      type: "ADD_BUSINESS",
      value: listing
    };
  };
  
  export const deleteBusiness = index => {
    return {
      type: "DELETE_BUSINESS",
      value: index
    };
  };
  export const login = user => {
    return {
      type: "LOGIN_SUCCESS",
      value: user
    };
  };
  export const logout = () => {
    return {
      type: "LOGOUT_SUCCESS"
    };
  };
  
  export const getCoordinates = index => {
    return {
      type: "GET_COORDINATES",
      value: index
    };
  };