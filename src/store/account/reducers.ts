import {
  AccountActionTypes,
  AccountState,
  LOAD_CURRENT_LOGIN_USER_FAILURE,
  LOAD_CURRENT_LOGIN_USER_REQUEST,
  LOAD_CURRENT_LOGIN_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOG_OUT,
} from './types';
const initialState: AccountState = {
  user: null,
  loading: false,
  error: null,
  token: null,
};
const accountReducer = (
  state: AccountState = initialState,
  action: AccountActionTypes
): AccountState => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return { ...state, loading: true };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        token: action.payload.token,
      };
    }
    case LOGIN_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }
    case LOG_OUT: {
      return {
        ...state,
        user: null,
        token: null,
        error: null,
      };
    }
    case LOAD_CURRENT_LOGIN_USER_REQUEST: {
      return { ...state, loading: true };
    }
    case LOAD_CURRENT_LOGIN_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        user: action.payload.user,
      };
    }
    case LOAD_CURRENT_LOGIN_USER_FAILURE: {
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
export { accountReducer };
