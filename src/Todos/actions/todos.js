import {
  SET_TODOS,
  SET_IS_LOADING,
  SET_SORT_OPTION,
  SORT_OPTIONS,
} from './actionTypes';

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

export const getSortOption = sortOption => {
  return (dispatch, getState) => {
    const {todos} = getState().todos;
    const sortedTodos = [...todos];
    switch (sortOption) {
      case 'name':
        sortedTodos.sort((a, b) => a.title > b.title);
        break;
      case 'completion':
        sortedTodos.sort((a, b) => a.completed > b.completed);
        break;
    }
    dispatch(setTodos(sortedTodos));
    dispatch(setSortOption(sortOption));
  };
};

export const setSortOption = sortOption => {
  return {
    type: SET_SORT_OPTION,
    sortOption,
  };
};

export const getSortOptions = () => {
  return dispatch => {
    dispatch(sortOptions());
  };
};

export const sortOptions = () => {
  return {
    type: SORT_OPTIONS,
    sortOptions,
  };
};
