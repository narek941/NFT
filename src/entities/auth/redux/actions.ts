import router from 'next/router';
import { AxiosError } from 'axios';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  IActivateEmailPayload,
  IActivateEmailResponse,
  ICheckResetCodePayload,
  ICheckResetCodeResponse,
  IResendEmailPayload,
  IResendEmailResponse,
  IResetPasswordPayload,
  IResetPasswordResponse,
  ISetNewPasswordPayload,
  ISetNewPasswordResponse,
  ISignInPayload,
  ISignInResponse,
  ISignUpPayload,
  ISignUpResponse,
  ITwoFADisablePayload,
  ITwoFADisableResponse,
  ITwoFAEnablePayload,
  ITwoFAEnableResponse,
  ITwoFASetupPayload,
  ITwoFASetupResponse,
  ITwoFASignInPayload,
  ITwoFASignInResponse,
} from 'src/common/models/auth';
import { IRejectValue } from 'src/common/models/misc';
import Injector from 'src/injector';
import { AUTH_REPO } from 'src/injector/constants';
import { AuthRepo } from '../model/AuthRepo';
import {
  convertErrorMessage,
  EmailVerificationError,
  parseErrorMessage,
} from '../../../common/utils/parse-utils';
import { jsonParse } from '@utils/common';
import { setCookie } from '@utils/cookies';

const {
  signIn,
  signUp,
  resetPassword,
  checkResetCode,
  setNewPassword,
  twoFADisable,
  twoFAEnable,
  twoFASetup,
  twoFASignIn,
  resendEmail,
  activateEmail,
} = Injector.get(AUTH_REPO) as AuthRepo;

export const logOut = createAction('auth/logOut');
export const logOutFrom2FA = createAction('auth/logOutFrom2FA');
export const clearLoginFlow = createAction('auth/clearloginFlow');
export const clearAuthError = createAction('auth/clearAuthError');
export const clearAuthPending = createAction('auth/clearAuthPending');

export const toggleShowActivateNotification = createAction(
  'auth/toggleShowActivateNotification'
);

export const signInRequest = createAsyncThunk<
  ISignInResponse,
  ISignInPayload,
  { rejectValue: IRejectValue }
>('auth/signIn', async (data: ISignInPayload, thunkApi) => {
  try {
    const response = await signIn(data);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    if (err.response?.data.message.includes(EmailVerificationError)) {
      const { email, message } = jsonParse(err.response?.data.message);
      router.push({
        pathname: '/signup/activate',
        query: { email },
      });
      return thunkApi.rejectWithValue({
        message: convertErrorMessage(message),
      });
    }
    return thunkApi.rejectWithValue({
      message: convertErrorMessage(err.response?.data.message),
    });
  }
});

export const signUpRequest = createAsyncThunk<
  ISignUpResponse,
  ISignUpPayload,
  { rejectValue: IRejectValue }
>('auth/signUp', async (data: ISignUpPayload, thunkApi) => {
  try {
    const response = await signUp(data);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;

    return thunkApi.rejectWithValue({
      message: parseErrorMessage(err.response?.data.message),
    });
  }
});

export const resetPasswordRequest = createAsyncThunk<
  IResetPasswordResponse,
  IResetPasswordPayload,
  { rejectValue: IRejectValue }
>('auth/resetPassword', async (data: IResetPasswordPayload, thunkApi) => {
  try {
    const response = await resetPassword(data);
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({
      message: 'Reset password request failed',
    });
  }
});

export const checkResetCodeRequest = createAsyncThunk<
  ICheckResetCodeResponse,
  ICheckResetCodePayload,
  { rejectValue: IRejectValue }
>('auth/checkResetCode', async (data: ICheckResetCodePayload, thunkApi) => {
  try {
    const response = await checkResetCode(data);
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({
      message: 'Check reset code request failed',
    });
  }
});

export const setNewPasswordRequest = createAsyncThunk<
  ISetNewPasswordResponse,
  ISetNewPasswordPayload,
  { rejectValue: IRejectValue }
>('auth/setNewPassword', async (data: ISetNewPasswordPayload, thunkApi) => {
  try {
    const response = await setNewPassword(data);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;

    return thunkApi.rejectWithValue({
      message: err.response?.data.message,
    });
  }
});

export const twoFADisableRequest = createAsyncThunk<
  ITwoFADisableResponse,
  ITwoFADisablePayload,
  { rejectValue: IRejectValue }
>('auth/2faDisable', async (data: ITwoFADisablePayload, thunkApi) => {
  try {
    const response = await twoFADisable(data);
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({
      message: 'WRONG_OTP',
    });
  }
});

export const twoFAEnableRequest = createAsyncThunk<
  ITwoFAEnableResponse,
  ITwoFAEnablePayload,
  { rejectValue: IRejectValue }
>('auth/2faEnable', async (data: ITwoFAEnablePayload, thunkApi) => {
  try {
    const response = await twoFAEnable(data);
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({
      message: 'WRONG_OTP',
    });
  }
});

export const twoFASetupRequest = createAsyncThunk<
  ITwoFASetupResponse,
  ITwoFASetupPayload,
  { rejectValue: IRejectValue }
>('auth/2faSetup', async (data: ITwoFASetupPayload, thunkApi) => {
  try {
    const response = await twoFASetup(data);
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({
      message: 'Invalid credentials or 6-digit code',
    });
  }
});

export const twoFASignInRequest = createAsyncThunk<
  ITwoFASignInResponse,
  ITwoFASignInPayload,
  { rejectValue: IRejectValue }
>('auth/2faSignIn', async (data: ITwoFASignInPayload, thunkApi) => {
  try {
    const response = await twoFASignIn(data);
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({
      message: '2fa signin request failed',
    });
  }
});

export const activateEmailRequest = createAsyncThunk<
  IActivateEmailResponse,
  IActivateEmailPayload,
  { rejectValue: IRejectValue }
>('auth/activateEmail', async (data: IActivateEmailPayload, thunkApi) => {
  try {
    const response = await activateEmail(data);
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({
      message: 'Activate email request failed',
    });
  }
});

export const resendEmailRequest = createAsyncThunk<
  IResendEmailResponse,
  IResendEmailPayload,
  { rejectValue: IRejectValue }
>(
  'users/resend-activation-email',
  async (data: IResendEmailPayload, thunkApi) => {
    try {
      const response = await resendEmail(data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({
        message: 'Resend email request failed',
      });
    }
  }
);
