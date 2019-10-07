import {SET_TODOS, SET_IS_LOADING} from '../actions/actionTypes';

const initialState = {
  todos: [],
  isLoading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TODOS: {
      return {
        ...state,
        todos: action.todos,
      };
    }
    case SET_IS_LOADING: {
      return {
        ...state,
        isLoading: action.isLoading,
      };
    }
    default: {
      return state;
    }
  }
};
