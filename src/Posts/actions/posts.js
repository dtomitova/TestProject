import {SET_POSTS, SET_IS_LOADING, SET_ERROR} from './actionTypes';
import Constants from '../../common/Constants';

export const getPosts = userId => {
  return dispatch => {
    dispatch(setIsLoading(true));
    const userPostsUrl = Constants.BASE_URL + '/posts?userId=' + userId;

    fetch(userPostsUrl)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong');
        }
      })
      .then(responseJson => {
        dispatch(setPosts(responseJson));
        dispatch(setIsLoading(false));
      })
      .catch(error => {
        dispatch(setError(error));
        dispatch(setIsLoading(false));
      });
  };
};

export const setPosts = posts => {
  return {
    type: SET_POSTS,
    payload: {posts},
  };
};

export const setError = error => {
  return {
    type: SET_ERROR,
    payload: {error},
  };
};

export const setIsLoading = isLoading => {
  return {
    type: SET_IS_LOADING,
    payload: {isLoading},
  };
};
