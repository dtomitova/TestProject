import { SET_POSTS } from './actionTypes';

export const getPosts = (userId) => {
    return (dispatch) => {
    const userPostsUrl =
      'https://jsonplaceholder.typicode.com/posts?userId=' + userId;

    fetch(userPostsUrl)
      .then(response => response.json())
      .then(responseJson => {
          dispatch(setPosts(responseJson));
      });
    }
}

export const setPosts = posts => {
    return {
        type: SET_POSTS,
        posts: posts
    }
}