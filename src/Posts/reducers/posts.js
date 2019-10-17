import {SET_POSTS, SET_IS_LOADING, SET_ERROR} from '../actions/actionTypes';

const initialState = {
  posts: [],
  isLoading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS: {
      return {
        ...state,
        posts: action.payload.posts,
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
