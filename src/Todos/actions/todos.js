import {SET_TODOS, SET_IS_LOADING, SET_SORT_OPTION} from './actionTypes';

export const getTodos = userId => {
  return dispatch => {
    dispatch(setIsLoading(true));

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

export const setIsLoading = isLoading => {
  return {
    type: SET_IS_LOADING,
    isLoading,
  };
};

export const setSortOption = sortOption => {
  return {
    type: SET_SORT_OPTION,
    sortOption,
  };
};
