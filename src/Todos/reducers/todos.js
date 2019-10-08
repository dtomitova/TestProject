import {
  SET_TODOS,
  SET_IS_LOADING,
  SET_SORT_OPTION,
} from '../actions/actionTypes';

const initialState = {
  todos: [],
  isLoading: false,
  sortOption: 'default',
  sortOptions: [
    {title: 'Default', value: 'default'},
    {title: 'Name', value: 'name'},
    {title: 'Completion', value: 'completion'},
  ],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TODOS: {
      return {
        ...state,
        todos: action.todos,
      };
    }
    case SET_IS_LOADING: {
      return {
        ...state,
        isLoading: action.isLoading,
      };
    }
    case SET_SORT_OPTION: {
      let {todos} = state;

      switch (action.sort) {
        case 'name':
          todos = [...todos];
          todos.sort((a, b) => a.title > b.title);
          break;
        case 'completion':
          todos = [...todos].sort((a, b) => a.completed > b.completed);
          break;
      }

      return {
        ...state,
        sortOption: action.sortOption,
        todos,
      };
    }
    default: {
      return state;
    }
  }
};
