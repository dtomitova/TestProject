import {SET_USERS, SET_ERROR} from 'Users/actions/actionTypes';
import Constants from 'common/Constants';

export const getUsers = () => {
  return dispatch => {
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
      })
      .catch(error => {
        dispatch(setError(error));
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
