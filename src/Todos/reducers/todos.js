import {SET_TODOS} from '../actions/actionTypes';

const initialState = {
  todos: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TODOS: {
      return {
        ...state,
        todos: action.todos,
      };
    }
    default: {
      return state;
    }
  }
};
