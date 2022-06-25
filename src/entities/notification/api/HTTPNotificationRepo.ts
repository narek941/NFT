import { AxiosResponse } from 'axios';
import { $apiWithToken } from 'src/common/api';
import {
  IGetUserNotificationPayload,
  IGetUserNotificationResponse,
  IPatchNotificationResponse,
  IUpdateUserNotificationPayload,
} from 'src/common/models/notification';
import { NotificationRepo } from '../model/NotificationRepo';

class HTTPNotificationRepo implements NotificationRepo {
  getNotifications: (
    data: IGetUserNotificationPayload
  ) => Promise<AxiosResponse<IGetUserNotificationResponse, any>> = (params) =>
    $apiWithToken.get('users/notifications', { params });

  updateNotification: (
    data: IUpdateUserNotificationPayload
  ) => Promise<AxiosResponse<IPatchNotificationResponse, any>> = (data) =>
    $apiWithToken.patch('users/notifications', data);
}

export default HTTPNotificationRepo;
