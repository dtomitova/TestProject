import {SET_POSTS, SET_ERROR} from 'Posts/actions/actionTypes';
import Constants from 'common/Constants';

export const getPosts = userId => {
  return dispatch => {
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
      })
      .catch(error => {
        dispatch(setError(error));
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
