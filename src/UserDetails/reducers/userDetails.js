import {SET_USER_DETAILS, SET_IS_LOADING} from '../actions/actionTypes';

const initialState = {
  userDetails: null,
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DETAILS: {
      return {
        ...state,
        userDetails: action.userDetails,
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
