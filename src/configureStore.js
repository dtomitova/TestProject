import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import postsReducer from './Posts/reducers/posts';
import todosReducer from './Todos/reducers/todos';
import usersReducer from './Users/reducers/users';

const rootReducer = combineReducers({
  posts: postsReducer,
  todos: todosReducer,
  users: usersReducer,
});

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;
