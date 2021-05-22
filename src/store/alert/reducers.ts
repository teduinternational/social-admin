import {
  ALERT_ERROR,
  ALERT_SUCCESS,
  AlertActionTypes,
  AlertState,
  CLEAR_ALERT,
} from './types';

const initialState: AlertState = {
  type: null,
  message: null,
};
const alertReducer = (
  state: AlertState = initialState,
  action: AlertActionTypes
): AlertState => {
  switch (action.type) {
    case ALERT_SUCCESS:
      return {
        type: 'alert-success',
        message: action.payload.message,
      };
    case ALERT_ERROR:
      return {
        type: 'alert-danger',
        message: action.payload.message,
      };
    case CLEAR_ALERT:
      return {
        type: null,
        message: null,
      };
    default:
      return state;
  }
};
export { alertReducer };
