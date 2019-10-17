import {SET_POSTS, SET_IS_LOADING} from '../actions/actionTypes';

const initialState = {
  posts: [],
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS: {
      return {
        ...state,
        posts: action.payload.posts,
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
