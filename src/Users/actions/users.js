import {SET_USERS, SET_IS_LOADING} from './actionTypes';

export const getUsers = () => {
  return dispatch => {
    dispatch(setIsLoading(true));
    const usersUrl = 'https://jsonplaceholder.typicode.com/users';

    fetch(usersUrl)
      .then(response => response.json())
      .then(responseJson => {
        dispatch(setUsers(responseJson));
        dispatch(setIsLoading(false));
      });
  };
};

export const setUsers = users => {
  return {
    type: SET_USERS,
    users,
  };
};

export const setIsLoading = isLoading => {
  return {
    type: SET_IS_LOADING,
    isLoading,
  };
};
