import { AxiosResponse } from 'axios';
import $api, { $apiWithToken } from 'src/common/api';
import {
  INotification,
  IUserPhotoResponse,
  IUserInfoSendPayload,
  IMetaMaskSendPayload,
  IMetaMaskSendResponse,
  IUserInfoSendResponse,
  IActivateChangeEmailPayload,
  IActivateChangeEmailResponse,
  IUpdateEmailPayload,
  IUpdateEmailResponse,
  IUpdateUserInfoPayload,
  IUpdatePasswordPayload,
  IUpdateUserPhotoPayload,
  IUpdateUserInfoResponse,
  IUpdatePasswordResponse,
  ISetNotificationResponse,
} from 'src/common/models/user';
import { UserRepo } from '../model/UserRepo';

class HTTPUserRepo implements UserRepo {
  metaMaskSendAddress: (
    data: IMetaMaskSendPayload
  ) => Promise<AxiosResponse<IMetaMaskSendResponse, any>> = (data) =>
    $apiWithToken.put('users/address', data);

  userInfo: (
    data: IUserInfoSendPayload
  ) => Promise<AxiosResponse<IUserInfoSendResponse, any>> = () =>
    $apiWithToken.get('users/me');

  userPhoto: () => Promise<AxiosResponse<IUserPhotoResponse, any>> = () =>
    $apiWithToken.get('users/photo');

  updateInfo: (
    data: IUpdateUserInfoPayload
  ) => Promise<AxiosResponse<IUpdateUserInfoResponse, any>> = (data) =>
    $apiWithToken.put('/users/profile', data);

  setNotifications: (
    data: INotification
  ) => Promise<AxiosResponse<ISetNotificationResponse, any>> = (data) =>
    $apiWithToken.put('users/notification-settings', data);

  updatePassword: (
    data: IUpdatePasswordPayload
  ) => Promise<AxiosResponse<IUpdatePasswordResponse, any>> = (data) =>
    $apiWithToken.put('users/password', data);

  updateUserPhoto: (
    data: IUpdateUserPhotoPayload
  ) => Promise<AxiosResponse<any, any>> = (data) =>
    $apiWithToken.post('users/upload-photo', data);

  updateEmail: (
    data: IUpdateEmailPayload
  ) => Promise<AxiosResponse<IUpdateEmailResponse, any>> = (data) =>
    $apiWithToken.put('users/email', data);

  activateChangeEmail: (
    data: IActivateChangeEmailPayload
  ) => Promise<AxiosResponse<IActivateChangeEmailResponse, any>> = (data) =>
    $api.post('users/activate-change-email', data);
}

export default HTTPUserRepo;
