import {
  ADD_NOTIFICATION,
  CLEAR_NOTIFICATION,
  MARK_ALL_AS_READ,
  MARK_AS_READ,
  NotificationActionTypes,
} from './types';

const addNotification = (
  id: string,
  message: string
): NotificationActionTypes => {
  return { type: ADD_NOTIFICATION, payload: { id: id, message: message } };
};

const markAsRead = (id: string): NotificationActionTypes => {
  return { type: MARK_AS_READ, payload: { id: id } };
};

const markAllAsRead = (): NotificationActionTypes => {
  return { type: MARK_ALL_AS_READ };
};

const clearNotification = (): NotificationActionTypes => {
  return { type: CLEAR_NOTIFICATION };
};

export { addNotification, markAllAsRead, markAsRead, clearNotification };
