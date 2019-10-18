import {SET_TODOS, SET_SORT_OPTION, SET_ERROR} from './actionTypes';
import Constants from '../../common/Constants';

export const getTodos = userId => {
  return dispatch => {
    const userTodosUrl = Constants.BASE_URL + '/todos?userId=' + userId;

    fetch(userTodosUrl)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong');
        }
      })
      .then(responseJson => {
        dispatch(setTodos(responseJson));
      })
      .catch(error => {
        dispatch(setError(error));
      });
  };
};

export const setTodos = todos => {
  return {
    type: SET_TODOS,
    payload: {todos},
  };
};
export const setError = error => {
  return {
    type: SET_ERROR,
    payload: {error},
  };
};

export const setSortOption = sortOption => {
  return {
    type: SET_SORT_OPTION,
    payload: {sortOption},
  };
};
