import {SET_TODOS, SET_IS_LOADING} from './actionTypes';

export const getTodos = userId => {
  return dispatch => {
    const userTodosUrl =
      'https://jsonplaceholder.typicode.com/todos?userId=' + userId;

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
    todos: todos,
  };
};

export const getIsLoading = isLoading => {
  return dispatch => {
    dispatch(setIsLoading(isLoading));
  };
};

export const setIsLoading = isLoading => {
  return {
    type: SET_IS_LOADING,
    isLoading,
  };
};
