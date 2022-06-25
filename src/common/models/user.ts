import { Empty } from './misc';

export interface IUser {
  role?: string;
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: any;
  username?: string;
  email?: string;
  newEmail?: string;
  status?: string;
  profile?: Profile;
  settings?: Settings;
  notificationSettings?: Notification[];
  photo?: string | null;
  address?: IAddress;
}

export interface IAddress {
  id: string;
  address: string;
}

export interface UserState {
  pending: boolean;
  error: string | null;
  user?: IUser;
  profilePhoto?: string | null;
  metamaskAddress?: string;
  source?: ChangeSourse;
}

export interface IMetaMaskSendPayload {
  address: string;
}

export interface IMetaMaskSendResponse extends Empty {}

export interface Profile {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: any;
  displayName?: string;
  bio?: string;
  website?: string;
  photo?: any;
}

export interface Settings {
  id: number;
  createdAt: Date;
  updatedAt: Date | string;
  deletedAt?: any;
  twoFactorAuthEnabled: boolean;
}

export interface Notification {
  id: number;
  type: string;
  isEmail: boolean;
  isPlatform: boolean;
}

export enum ChangeSourse {
  EMAIL = 'email',
  PASSWORD = 'password',
  TWOFA = '2fa',
  FORM = 'form',
}

export interface IUserInfoSendResponse extends Empty {}
export interface IUserInfoSendPayload {
  source?: ChangeSourse;
}

export interface IUserPhotoResponse {
  photo: string;
}
export interface IUserPhotoPayload {}

export interface IUpdateUserInfoResponse extends IUser {}
export interface IUpdateUserInfoPayload {
  payload: IUser;
}

export interface INotification {
  id: number;
  type: string;
  isEmail: boolean;
  isPlatform: boolean;
}

export interface ISetNotificationResponse extends Empty {}

export interface IUpdatePasswordPayload {
  currentPassword: string;
  password: string;
}

export interface IUpdatePasswordResponse extends Empty {}

export interface IUpdateUserPhotoResponse extends IUserPhotoResponse {}
export interface IUpdateUserPhotoPayload {
  file: string;
}

export interface IUpdateEmailResponse extends Empty {}

export interface IUpdateEmailPayload {
  email: string;
  password: string;
  otp?: string;
}

export interface IActivateChangeEmailPayload {
  code: string;
}

export interface IActivateChangeEmailResponse extends Empty {}
