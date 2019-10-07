import {
  SET_TODOS,
  SET_IS_LOADING,
  SET_SORT_OPTION,
  SORT_OPTIONS,
} from '../actions/actionTypes';

const initialState = {
  todos: [],
  isLoading: true,
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
      return {
        ...state,
        sortOption: action.sortOption,
      };
    }
    case SORT_OPTIONS: {
      return {
        ...state,
        sortOptions: action.sortOptions,
      };
    }
    default: {
      return state;
    }
  }
};
