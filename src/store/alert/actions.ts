import {
  ALERT_ERROR,
  ALERT_SUCCESS,
  AlertActionTypes,
  CLEAR_ALERT,
} from './types';

const alertSuccess = (message: string): AlertActionTypes => {
  return { type: ALERT_SUCCESS, payload: { message } };
};

const alertError = (message: string): AlertActionTypes => {
  return { type: ALERT_ERROR, payload: { message } };
};

const clearAlert = (): AlertActionTypes => {
  return { type: CLEAR_ALERT };
};

export { alertSuccess, alertError, clearAlert };
