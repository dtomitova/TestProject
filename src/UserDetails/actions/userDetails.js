import {SET_USER_DETAILS, SET_IS_LOADING} from './actionTypes';

export const getUserDetails = userId => {
  return dispatch => {
    dispatch(setIsLoading(true));
    const userDetailsUrl =
      'https://jsonplaceholder.typicode.com/users/' + userId;

    fetch(userDetailsUrl)
      .then(response => response.json())
      .then(responseJson => {
        dispatch(setUserDetails(responseJson));
        dispatch(setIsLoading(false));
      });
  };
};

export const setUserDetails = userDetails => {
  return {
    type: SET_USER_DETAILS,
    userDetails,
  };
};

export const setIsLoading = isLoading => {
  return {
    type: SET_IS_LOADING,
    isLoading,
  };
};
