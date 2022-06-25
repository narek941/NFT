import { AxiosResponse } from 'axios';
import {
  IGetUserNotificationPayload,
  IGetUserNotificationResponse,
  IPatchNotificationResponse,
  IUpdateUserNotificationPayload,
} from 'src/common/models/notification';

export interface NotificationRepo {
  getNotifications: (
    data: IGetUserNotificationPayload
  ) => Promise<AxiosResponse<IGetUserNotificationResponse, any>>;

  updateNotification: (
    data: IUpdateUserNotificationPayload
  ) => Promise<AxiosResponse<IPatchNotificationResponse, any>>;
}
