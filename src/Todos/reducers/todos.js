import {SET_TODOS, SET_ERROR, SET_SORT_OPTION} from '../actions/actionTypes';

const initialState = {
  todos: [],
  isLoading: true,
  sortOption: 'default',
  sortOptions: [
    {title: 'Default', value: 'default'},
    {title: 'Name', value: 'name'},
    {title: 'Completion', value: 'completion'},
  ],
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TODOS: {
      return {
        ...state,
        todos: action.payload.todos,
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
    case SET_SORT_OPTION: {
      let {todos} = state;

      switch (action.sortOption) {
        case 'name':
          todos = [...todos];
          todos.sort((a, b) => a.title > b.title);
          break;
        case 'completion':
          todos = [...todos];
          todos.sort((a, b) => a.completed > b.completed);
          break;
      }

      return {
        ...state,
        sortOption: action.payload.sortOption,
        todos,
      };
    }
    default: {
      return state;
    }
  }
};
