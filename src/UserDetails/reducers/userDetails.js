import {
  SET_USER_DETAILS,
  SET_IS_LOADING,
  SET_ERROR,
} from '../actions/actionTypes';

const initialState = {
  userDetails: null,
  isLoading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DETAILS: {
      return {
        ...state,
        userDetails: action.payload.userDetails,
      };
    }
    case SET_ERROR: {
      return {
        ...state,
        error: action.payload.error,
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
