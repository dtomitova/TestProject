import {SET_USER_DETAILS, SET_IS_LOADING, SET_ERROR} from './actionTypes';
import Constants from '../../common/Constants';

export const getUserDetails = userId => {
  return dispatch => {
    dispatch(setIsLoading(true));
    const userDetailsUrl = Constants.BASE_URL + '/users/' + userId;

    fetch(userDetailsUrl)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong');
        }
      })
      .then(responseJson => {
        dispatch(setIsLoading(false));
        dispatch(setUserDetails(responseJson));
      })
      .catch(error => {
        dispatch(setIsLoading(false));
        dispatch(setError(error));
      });
  };
};

export const setUserDetails = userDetails => {
  return {
    type: SET_USER_DETAILS,
    payload: {userDetails},
  };
};

export const setError = error => {
  return {
    type: SET_ERROR,
    payload: {error},
  };
};

export const setIsLoading = isLoading => {
  return {
    type: SET_IS_LOADING,
    payload: {isLoading},
  };
};
