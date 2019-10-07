import {SET_POSTS, SET_IS_LOADING} from '../actions/actionTypes';

const initialState = {
  posts: [],
  isLoading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS: {
      return {
        ...state,
        posts: action.posts,
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
