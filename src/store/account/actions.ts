import {
  AccountActionTypes,
  LOAD_CURRENT_LOGIN_USER_FAILURE,
  LOAD_CURRENT_LOGIN_USER_REQUEST,
  LOAD_CURRENT_LOGIN_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOG_OUT,
} from './types';

import { Dispatch } from 'react';
import { userService } from './../../services/user.service';

export const login = (email: string, password: string) => {
  return async (dispatch: Dispatch<AccountActionTypes>) => {
    dispatch({
      type: LOGIN_REQUEST,
      payload: {
        email: email,
        password: password,
      },
    });

    try {
      const response = await userService.login(email, password);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: { error: error.toString() },
      });
    }
  };
};

export const logout = (): AccountActionTypes => {
  return { type: LOG_OUT };
};

export const getCurrentLoginUser = () => {
  return async (dispatch: Dispatch<AccountActionTypes>) => {
    dispatch({
      type: LOAD_CURRENT_LOGIN_USER_REQUEST,
    });
    try {
      const response = await userService.getCurrentLoginUser();
      dispatch({
        type: LOAD_CURRENT_LOGIN_USER_SUCCESS,
        payload: { user: response },
      });
    } catch (error) {
      dispatch({
        type: LOAD_CURRENT_LOGIN_USER_FAILURE,
        payload: { error: error.toString() },
      });
    }
  };
};
