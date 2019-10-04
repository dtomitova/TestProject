import {SET_TODOS} from './actionTypes';

export const getTodos = userId => {
  return dispatch => {
    const userTodosUrl =
      'https://jsonplaceholder.typicode.com/todos?userId=' + userId;

    fetch(userTodosUrl)
      .then(response => response.json())
      .then(responseJson => {
        dispatch(setTodos(responseJson));
      });
  };
};

export const setTodos = todos => {
  return {
    type: SET_TODOS,
    todos: todos,
  };
};
