export const ALERT_SUCCESS = 'ALERT_SUCCESS';
export const ALERT_ERROR = 'ALERT_ERROR';
export const CLEAR_ALERT = 'CLEAR_ALERT';

interface AlertSuccess {
  type: typeof ALERT_SUCCESS;
  payload: {
    message: string;
  };
}

interface AlertError {
  type: typeof ALERT_ERROR;
  payload: {
    message: string;
  };
}

interface ClearAlert {
  type: typeof CLEAR_ALERT;
}

export interface AlertState {
  type: string | null;
  message: string | null;
}

export type AlertActionTypes = AlertSuccess | AlertError | ClearAlert;
