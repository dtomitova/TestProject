import {SET_USERS} from './actionTypes';

export const getUsers = () => {
  return dispatch => {
    const usersUrl = 'https://jsonplaceholder.typicode.com/users';

    fetch(usersUrl)
      .then(response => response.json())
      .then(responseJson => {
        dispatch(setUsers(responseJson));
      });
  };
};

export const setUsers = users => {
  return {
    type: SET_USERS,
    users: users,
  };
};
