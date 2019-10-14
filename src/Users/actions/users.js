import {SET_USERS, SET_IS_LOADING} from './actionTypes';
import Constants from '../../common/Constants';

export const getUsers = () => {
  return dispatch => {
    dispatch(setIsLoading(true));
    const usersUrl = Constants.BASE_URL + '/users';
    console.log(usersUrl);
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
