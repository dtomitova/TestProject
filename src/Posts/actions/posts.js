import {SET_POSTS, SET_IS_LOADING} from './actionTypes';
import Constants from '../../common/Constants';

export const getPosts = userId => {
  return dispatch => {
    dispatch(setIsLoading(true));
    const userPostsUrl = Constants.BASE_URL + '/posts?userId=' + userId;

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

export const setIsLoading = isLoading => {
  return {
    type: SET_IS_LOADING,
    isLoading,
  };
};
