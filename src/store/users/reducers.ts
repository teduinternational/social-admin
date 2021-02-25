import {
  GET_USER_BY_ID_FAILURE,
  GET_USER_BY_ID_REQUEST,
  GET_USER_BY_ID_SUCCESS,
  LOAD_USERS_PAGING_FAILURE,
  LOAD_USERS_PAGING_REQUEST,
  LOAD_USERS_PAGING_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UsersActionTypes,
  UsersState,
} from './types';

const initialState: UsersState = {
  items: [],
  page: 1,
  total: 0,
  pageSize: 0,
  loading: false,
  deletedCount: 0,
  error: null,
  editUser: null,
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
        pageSize: action.payload.pageSize,
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
    case GET_USER_BY_ID_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_USER_BY_ID_SUCCESS: {
      return {
        ...state,
        editUser: action.payload.user,
        loading: false,
        error: null,
      };
    }
    case GET_USER_BY_ID_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }
    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
      };
    }
    case UPDATE_USER_FAILURE: {
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
