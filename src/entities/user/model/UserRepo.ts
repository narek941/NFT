import { AxiosResponse } from 'axios';
import {
  IActivateChangeEmailPayload,
  IActivateChangeEmailResponse,
  IMetaMaskSendPayload,
  IMetaMaskSendResponse,
  INotification,
  ISetNotificationResponse,
  IUpdateEmailPayload,
  IUpdateEmailResponse,
  IUpdatePasswordPayload,
  IUpdatePasswordResponse,
  IUpdateUserInfoPayload,
  IUpdateUserInfoResponse,
  IUpdateUserPhotoPayload,
  IUpdateUserPhotoResponse,
  IUserInfoSendPayload,
  IUserInfoSendResponse,
  IUserPhotoResponse,
} from 'src/common/models/user';

export interface UserRepo {
  metaMaskSendAddress: (
    data: IMetaMaskSendPayload
  ) => Promise<AxiosResponse<IMetaMaskSendResponse, any>>;

  userInfo: (
    data: IUserInfoSendPayload
  ) => Promise<AxiosResponse<IUserInfoSendResponse, any>>;

  userPhoto: () => Promise<AxiosResponse<IUserPhotoResponse, any>>;

  updateInfo: (
    data: IUpdateUserInfoPayload
  ) => Promise<AxiosResponse<IUpdateUserInfoResponse, any>>;

  setNotifications: (
    data: INotification // temporary solution , waiting for backend to update it to be an array
  ) => Promise<AxiosResponse<ISetNotificationResponse, any>>;

  updatePassword: (
    data: IUpdatePasswordPayload
  ) => Promise<AxiosResponse<IUpdatePasswordResponse, any>>;

  updateUserPhoto: (
    data: IUpdateUserPhotoPayload
  ) => Promise<AxiosResponse<IUpdateUserPhotoResponse, any>>;

  updateEmail: (
    data: IUpdateEmailPayload
  ) => Promise<AxiosResponse<IUpdateEmailResponse, any>>;

  activateChangeEmail: (
    data: IActivateChangeEmailPayload
  ) => Promise<AxiosResponse<IActivateChangeEmailResponse, any>>;
}
