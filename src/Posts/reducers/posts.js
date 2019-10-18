import {SET_POSTS, SET_ERROR} from '../actions/actionTypes';

const initialState = {
  posts: [],
  isLoading: true,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS: {
      return {
        ...state,
        posts: action.payload.posts,
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
