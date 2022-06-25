import { Empty } from './misc';

type StringOrNull = string | null;

export interface NotificationState {
  pending: boolean;
  totalCount?: number;
  error: string | null;
  isUnreadNotification: boolean;
  notificationList?: INotificationData[];
  filter: {
    sort: string;
    order: string;
  };
}

export interface IGetUserNotificationPayload {
  skip: Number;
  take: Number;
  sort: String;
  order: String;
}
export interface IUpdateUserNotificationPayload {
  notificationIds: number[];
}
export interface IGetUserNotificationResponse {
  totalCount: number;
  list: INotificationData[];
}

export interface INotificationData {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  type: string;
  title: string;
  message: string | null;
  userId: number;
  isRead: boolean;
}

export interface INotificationFilterState {
  sort?: StringOrNull;
  order?: StringOrNull;
}
export interface IPatchNotificationResponse extends Empty {}
