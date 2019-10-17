import {
  SET_TODOS,
  SET_IS_LOADING,
  SET_SORT_OPTION,
  SET_ERROR,
} from './actionTypes';
import Constants from '../../common/Constants';

export const getTodos = userId => {
  return dispatch => {
    dispatch(setIsLoading(true));

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
        dispatch(setIsLoading(false));
      })
      .catch(error => {
        dispatch(setError(error));
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
