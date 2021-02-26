import {
  ADD_USER_FAILURE,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  DELETE_USERS_FAILURE,
  DELETE_USERS_REQUEST,
  DELETE_USERS_SUCCESS,
  GET_USER_BY_ID_FAILURE,
  GET_USER_BY_ID_REQUEST,
  GET_USER_BY_ID_SUCCESS,
  IAddUserRequest,
  IUpdateUserRequest,
  LOAD_USERS_PAGING_FAILURE,
  LOAD_USERS_PAGING_REQUEST,
  LOAD_USERS_PAGING_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UsersActionTypes,
} from './types';
import { AnyAction, Dispatch } from 'redux';
import { alertError, alertSuccess, clearAlert } from '../alert/actions';

import { AlertActionTypes } from './../alert/types';
import { ThunkDispatch } from 'redux-thunk';
import { UrlConstants } from '../../constants';
import { history } from '../../helpers';
import { userService } from '../../services';

export const loadUsersPaging = (keyword: string, currentPage: number) => {
  return async (dispatch: Dispatch<UsersActionTypes>) => {
    try {
      dispatch({
        type: LOAD_USERS_PAGING_REQUEST,
      });

      const res = await userService.getUsersPaging(keyword, currentPage);

      dispatch({
        type: LOAD_USERS_PAGING_SUCCESS,
        payload: res,
      });
    } catch (error) {
      dispatch({
        type: LOAD_USERS_PAGING_FAILURE,
        payload: { error: error.toString() },
      });
    }
  };
};

export const addUser = (user: IAddUserRequest) => {
  return async (dispatch: Dispatch<UsersActionTypes | AlertActionTypes>) => {
    try {
      dispatch({
        type: ADD_USER_REQUEST,
      });

      await userService.addUser(user);

      dispatch({
        type: ADD_USER_SUCCESS,
      });

      dispatch(alertSuccess('Thêm người dùng thành công'));

      history.push(UrlConstants.USERS_LIST);
    } catch (error) {
      dispatch({
        type: ADD_USER_FAILURE,
        payload: { error: error.toString() },
      });
      dispatch(alertError('Thêm người dùng thất bại'));
    }
    setTimeout(() => {
      dispatch(clearAlert());
    }, 3000);
  };
};

export const updateUser = (id: string, user: IUpdateUserRequest) => {
  return async (dispatch: Dispatch<UsersActionTypes | AlertActionTypes>) => {
    try {
      dispatch({
        type: UPDATE_USER_REQUEST,
      });

      await userService.updateUser(id, user);

      dispatch({
        type: UPDATE_USER_SUCCESS,
      });

      dispatch(alertSuccess('Cập nhật người dùng thành công'));

      history.push(UrlConstants.USERS_LIST);
    } catch (error) {
      dispatch({
        type: UPDATE_USER_FAILURE,
        payload: { error: error.toString() },
      });
      dispatch(alertError('Cập nhật người dùng thất bại'));
    }
    setTimeout(() => {
      dispatch(clearAlert());
    }, 3000);
  };
};

export const getUserById = (id: string) => {
  return async (dispatch: Dispatch<UsersActionTypes>) => {
    try {
      dispatch({
        type: GET_USER_BY_ID_REQUEST,
      });

      const res = await userService.getUserById(id);

      dispatch({
        type: GET_USER_BY_ID_SUCCESS,
        payload: {
          user: res,
        },
      });
    } catch (error) {
      dispatch({
        type: GET_USER_BY_ID_FAILURE,
        payload: { error: error.toString() },
      });
    }
  };
};

export const deleteUsers = (userIds: string[]) => {
  return async (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    try {
      dispatch({
        type: DELETE_USERS_REQUEST,
      });

      await userService.deleteUsers(userIds);

      dispatch({
        type: DELETE_USERS_SUCCESS,
      });
      dispatch(loadUsersPaging('', 1));
    } catch (error) {
      dispatch({
        type: DELETE_USERS_FAILURE,
        payload: { error: error.toString() },
      });
    }
  };
};
