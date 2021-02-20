import {
  LOAD_USERS_PAGING_FAILURE,
  LOAD_USERS_PAGING_REQUEST,
  LOAD_USERS_PAGING_SUCCESS,
  UsersActionTypes,
  UsersState,
} from './types';

const initialState: UsersState = {
  items: [],
  page: 1,
  total: 0,
  loading: false,
  deletedCount: 0,
  error: null,
};

const usersReducer = (
  state: UsersState = initialState,
  action: UsersActionTypes
): UsersState => {
  switch (action.type) {
    case LOAD_USERS_PAGING_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case LOAD_USERS_PAGING_SUCCESS: {
      return {
        ...state,
        items: action.payload.items,
        total: action.payload.total,
        page: action.payload.page,
        loading: false,
        error: null,
      };
    }
    case LOAD_USERS_PAGING_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }
    default:
      return state;
  }
};

export { usersReducer };
