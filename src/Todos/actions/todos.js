import {SET_TODOS, SET_IS_LOADING, SET_SORT_OPTION} from './actionTypes';
import Constants from '../../common/Constants';

export const getTodos = userId => {
  return dispatch => {
    dispatch(setIsLoading(true));

    const userTodosUrl = Constants.BASE_URL + '/todos?userId=' + userId;
    fetch(userTodosUrl)
      .then(response => response.json())
      .then(responseJson => {
        dispatch(setTodos(responseJson));
        dispatch(setIsLoading(false));
      });
  };
};

export const setTodos = todos => {
  return {
    type: SET_TODOS,
    payload: {todos},
  };
};

export const setIsLoading = isLoading => {
  return {
    type: SET_IS_LOADING,
    payload: {isLoading},
  };
};

export const setSortOption = sortOption => {
  return {
    type: SET_SORT_OPTION,
    payload: {sortOption},
  };
};
