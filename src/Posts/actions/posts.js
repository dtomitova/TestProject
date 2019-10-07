import {SET_POSTS, SET_IS_LOADING} from './actionTypes';

export const getPosts = userId => {
  return dispatch => {
    const userPostsUrl =
      'https://jsonplaceholder.typicode.com/posts?userId=' + userId;

    fetch(userPostsUrl)
      .then(response => response.json())
      .then(responseJson => {
        dispatch(setPosts(responseJson));
        dispatch(setIsLoading(false));
      });
  };
};

export const setPosts = posts => {
  return {
    type: SET_POSTS,
    posts: posts,
  };
};

export const getIsLoading = isLoading => {
  return dispatch => {
    dispatch(setIsLoading(isLoading));
  };
};

export const setIsLoading = isLoading => {
  return {
    type: SET_IS_LOADING,
    isLoading,
  };
};
