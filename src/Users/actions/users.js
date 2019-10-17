import {SET_USERS, SET_IS_LOADING, SET_ERROR} from './actionTypes';
import Constants from '../../common/Constants';

export const getUsers = () => {
  return dispatch => {
    dispatch(setIsLoading(true));
    const usersUrl = Constants.BASE_URL + '/users';

    fetch(usersUrl)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong');
        }
      })
      .then(responseJson => {
        dispatch(setUsers(responseJson));
        dispatch(setIsLoading(false));
      })
      .catch(error => {
        dispatch(setError(error));
        dispatch(setIsLoading(false));
      });
  };
};

export const setUsers = users => {
  return {
    type: SET_USERS,
    payload: {users},
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
