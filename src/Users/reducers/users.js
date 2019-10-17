import {SET_USERS, SET_IS_LOADING} from '../actions/actionTypes';

const initialState = {
  users: [],
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS: {
      return {
        ...state,
        users: action.payload.users,
      };
    }
    case SET_IS_LOADING: {
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    }
    default: {
      return state;
    }
  }
};
