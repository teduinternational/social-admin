import {
  AccountActionTypes,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOG_OUT,
} from './types';

export const loginRequest = (
  email: string,
  password: string
): AccountActionTypes => {
  return {
    type: LOGIN_REQUEST,
    payload: { email: email, password: password },
  };
};

export const loginSuccess = (token: string): AccountActionTypes => {
  return {
    type: LOGIN_SUCCESS,
    payload: { token: token },
  };
};

export const loginFailure = (error: string): AccountActionTypes => {
  return {
    type: LOGIN_FAILURE,
    payload: {
      error: error,
    },
  };
};

export const logout = (): AccountActionTypes => {
  return {
    type: LOG_OUT,
  };
};
