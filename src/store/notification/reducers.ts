import {
  ADD_NOTIFICATION,
  CLEAR_NOTIFICATION,
  MARK_ALL_AS_READ,
  MARK_AS_READ,
  NotificationActionTypes,
  NotificationState,
} from './types';

const initialState: NotificationState = {
  items: [],
};
const notificationReducer = (
  state: NotificationState = initialState,
  action: NotificationActionTypes
): NotificationState => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      state.items.push({
        _id: action.payload.id,
        message: action.payload.message,
        date: Date.now(),
        read: false,
      });
      return state;
    case MARK_AS_READ:
      state.items = state.items.map((notification, i) =>
        notification._id === action.payload.id
          ? { ...notification, read: true }
          : notification
      );
      return state;
    case MARK_ALL_AS_READ:
      state.items = state.items.map((notification) => ({
        ...notification,
        read: true,
      }));
      return state;

    case CLEAR_NOTIFICATION:
      return {
        items: [],
      };
    default:
      return state;
  }
};
export { notificationReducer };
