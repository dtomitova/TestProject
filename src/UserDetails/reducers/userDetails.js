import {SET_USER_DETAILS, SET_ERROR} from 'UserDetails/actions/actionTypes';

const initialState = {
  userDetails: null,
  isLoading: true,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DETAILS: {
      return {
        ...state,
        userDetails: action.payload.userDetails,
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
