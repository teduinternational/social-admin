export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const MARK_AS_READ = 'MARK_AS_READ';
export const MARK_ALL_AS_READ = 'MARK_ALL_AS_READ';
export const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION';

interface AddNotification {
  type: typeof ADD_NOTIFICATION;
  payload: {
    id: string;
    message: string;
  };
}

interface MarkAsRead {
  type: typeof MARK_AS_READ;
  payload: {
    id: string;
  };
}

interface MarkAllAsRead {
  type: typeof MARK_ALL_AS_READ;
}

interface ClearNotification {
  type: typeof CLEAR_NOTIFICATION;
}

export interface INotification {
  _id: string;
  message: string;
  date: number;
  read: boolean;
}

export interface NotificationState {
  items: INotification[];
}

export type NotificationActionTypes =
  | AddNotification
  | MarkAsRead
  | MarkAllAsRead
  | ClearNotification;
