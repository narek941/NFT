import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { IRejectValue } from 'src/common/models/misc';
import {
  IMetaMaskSendResponse,
  IMetaMaskSendPayload,
  IUserInfoSendResponse,
  IUserInfoSendPayload,
  IUpdateUserInfoResponse,
  IUpdateUserInfoPayload,
  ISetNotificationResponse,
  INotification,
  IUserPhotoResponse,
  IUserPhotoPayload,
  IUpdatePasswordResponse,
  IUpdatePasswordPayload,
  IUpdateUserPhotoResponse,
  IUpdateUserPhotoPayload,
  IUpdateEmailResponse,
  IUpdateEmailPayload,
  IActivateChangeEmailPayload,
  IActivateChangeEmailResponse,
  ChangeSourse,
} from 'src/common/models/user';
import Injector from 'src/injector';
import { USER_REPO } from 'src/injector/constants';
import { UserRepo } from '../model/UserRepo';
import { setCookie } from '@utils/cookies';
import { AxiosError } from 'axios';

const {
  metaMaskSendAddress,
  userInfo,
  updateInfo,
  setNotifications,
  userPhoto,
  updatePassword,
  updateUserPhoto,
  updateEmail,
  activateChangeEmail,
} = Injector.get(USER_REPO) as UserRepo;

// sync actions example. Please do not remove until there will be othere sync actions in project
export const setPending = createAction<boolean>('user/setPending');
export const clearUserError = createAction('user/clearUserError');
export const resetNewEmail = createAction('user/resetNewEmail');

export const metamaskSendRequest = createAsyncThunk<
  IMetaMaskSendResponse,
  IMetaMaskSendPayload,
  { rejectValue: IRejectValue }
>('user/metaMaskSend', async (data: IMetaMaskSendPayload, thunkApi) => {
  try {
    const response = await metaMaskSendAddress(data);
    if (response.status === 200) {
      const { address } = data;
      setCookie('user', JSON.stringify({ address }), 10);
    }
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({
      message: 'Metamask send address request failed',
    });
  }
});

export const userInfoRequest = createAsyncThunk<
  IUserInfoSendResponse,
  IUserInfoSendPayload,
  { rejectValue: IRejectValue }
>('user/me', async (data: any, thunkApi) => {
  try {
    const response = await userInfo(data);
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({
      message: 'get user info request failed',
    });
  }
});

export const userPhotoRequest = createAsyncThunk<
  IUserPhotoResponse,
  IUserPhotoPayload,
  { rejectValue: IRejectValue }
>('user/photo', async (data: any, thunkApi) => {
  try {
    const response = await userPhoto();
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({
      message: 'get user info request failed',
    });
  }
});

export const updateUserInfoRequest = createAsyncThunk<
  IUpdateUserInfoResponse,
  IUpdateUserInfoPayload,
  { rejectValue: IRejectValue }
>('user/update', async (data: Record<string, any>, thunkApi) => {
  try {
    let newUser;
    const response = await updateInfo(data.payload);
    if (response.status === 200) {
      newUser = await userInfo({ source: ChangeSourse.FORM });
    }
    return newUser.data;
  } catch (error: any) {
    return thunkApi.rejectWithValue({
      message: error.response.data.message,
    });
  }
});

export const setNotificationRequest = createAsyncThunk<
  ISetNotificationResponse,
  INotification, // temporary solution , waiting for backend to update it to be an array
  { rejectValue: IRejectValue }
>('users/notification-settings', async (data: INotification, thunkApi) => {
  try {
    const response = await setNotifications(data);
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({
      message: 'set notification request failed',
    });
  }
});

export const updatePasswordRequest = createAsyncThunk<
  IUpdatePasswordResponse,
  IUpdatePasswordPayload,
  { rejectValue: IRejectValue }
>('users/password', async (data: IUpdatePasswordPayload, thunkApi) => {
  try {
    const response = await updatePassword(data);
    return response.data;
  } catch (error) {
    let errorMessage = '';
    const message = (error as any)?.response?.data?.message;
    if (Array.isArray(message)) {
      errorMessage = message[0];
    } else if (typeof message === 'string') {
      errorMessage = message;
    } else {
      errorMessage = 'update password request failed';
    }
    return thunkApi.rejectWithValue({
      message: errorMessage,
    });
  }
});

export const updateUserPhotoRequest = createAsyncThunk<
  IUpdateUserPhotoResponse,
  IUpdateUserPhotoPayload,
  { rejectValue: IRejectValue }
>('users/updatePhoto', async (data: IUpdateUserPhotoPayload, thunkApi) => {
  try {
    let newUserPhoto;
    const response = await updateUserPhoto(data);
    if (response.status === 201) {
      newUserPhoto = await userPhoto();
    }
    return newUserPhoto.data;
  } catch (error) {
    return thunkApi.rejectWithValue({
      message: 'update user photo request failed',
    });
  }
});

export const updateEmailRequest = createAsyncThunk<
  IUpdateEmailResponse,
  IUpdateEmailPayload,
  { rejectValue: IRejectValue }
>('users/updateEmail', async (data: IUpdateEmailPayload, thunkApi) => {
  try {
    const response = await updateEmail(data);
    return response.data;
  } catch (error) {
    console.log('catching error: ', { ...(error as object) });
    return thunkApi.rejectWithValue({
      message:
        (error as any)?.response?.data?.message ||
        'update email request failed',
    });
  }
});

export const activateChangeEmailRequest = createAsyncThunk<
  IActivateChangeEmailResponse,
  IActivateChangeEmailPayload,
  { rejectValue: IRejectValue }
>(
  'users/activateChangeEmail',
  async (data: IActivateChangeEmailPayload, thunkApi) => {
    try {
      const response = await activateChangeEmail(data);
      return response.data;
    } catch (error) {
      const code = (error as AxiosError).response?.data?.code;
      let message = 'activate change email request failed';
      if (code === 410) {
        message = 'CODE_EXPIRED';
      } else if (code === 409) {
        message = 'CODE_USED';
      }
      return thunkApi.rejectWithValue({
        message,
      });
    }
  }
);
