import {
  ADD_USER_FAILURE,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  IAddUserRequest,
  LOAD_USERS_PAGING_FAILURE,
  LOAD_USERS_PAGING_REQUEST,
  LOAD_USERS_PAGING_SUCCESS,
  UsersActionTypes,
} from './types';
import { alertError, alertSuccess, clearAlert } from '../alert/actions';

import { AlertActionTypes } from './../alert/types';
import { Dispatch } from 'redux';
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
