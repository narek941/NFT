import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { IRejectValue } from 'src/common/models/misc';
import {
  IGetUserNotificationResponse,
  IGetUserNotificationPayload,
  IUpdateUserNotificationPayload,
  IPatchNotificationResponse,
} from 'src/common/models/notification';
import Injector from 'src/injector';
import { NOTIFICATION_REPO } from 'src/injector/constants';
import { NotificationRepo } from '../model/NotificationRepo';

const { getNotifications, updateNotification } = Injector.get(
  NOTIFICATION_REPO
) as NotificationRepo;

export const getUserNotificationsRequest = createAsyncThunk<
  IGetUserNotificationResponse,
  IGetUserNotificationPayload,
  { rejectValue: IRejectValue }
>(
  'users/notifications',
  async (data: IGetUserNotificationPayload, thunkApi) => {
    try {
      const response = await getNotifications(data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({
        message: 'Get user notification request failed',
      });
    }
  }
);
export const notificationFiltersUpdate = createAction<Partial<any>>(
  'notification/filters/update'
);

export const updateNotificationRequest = createAsyncThunk<
  IPatchNotificationResponse,
  IUpdateUserNotificationPayload,
  { rejectValue: IRejectValue }
>(
  'users/updateNotification',
  async (data: IUpdateUserNotificationPayload, thunkApi) => {
    try {
      const response = await updateNotification(data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({
        message: 'Update user notification request failed',
      });
    }
  }
);
