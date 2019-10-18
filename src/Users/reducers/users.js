import {SET_USERS, SET_ERROR} from '../actions/actionTypes';

const initialState = {
  users: [],
  isLoading: true,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS: {
      return {
        ...state,
        users: action.payload.users,
        isLoading: false,
      };
    }
    case SET_ERROR: {
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      };
    }
    default: {
      return state;
    }
  }
};
