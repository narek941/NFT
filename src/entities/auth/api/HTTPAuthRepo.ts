import { AxiosResponse } from 'axios';
import {
  ICheckResetCodePayload,
  ICheckResetCodeResponse,
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
  IActivateEmailPayload,
  IActivateEmailResponse,
  IResendEmailPayload,
  IResendEmailResponse,
} from 'src/common/models/auth';
import { AuthRepo } from '../model/AuthRepo';

import $api, { $apiWithToken } from 'src/common/api';

class HTTPAuthRepo implements AuthRepo {
  activateEmail: (
    data: IActivateEmailPayload
  ) => Promise<AxiosResponse<IActivateEmailResponse, any>> = (data) =>
    $api.post('/auth/activate-email', data);
  twoFASetup: (
    data: ITwoFASetupPayload
  ) => Promise<AxiosResponse<ITwoFASetupResponse, any>> = () =>
    $apiWithToken.get('/users/2fa-setup');
  twoFAEnable: (
    data: ITwoFAEnablePayload
  ) => Promise<AxiosResponse<ITwoFAEnableResponse, any>> = (data) =>
    $apiWithToken.put('/users/2fa-enable', data);
  twoFADisable: (
    data: ITwoFADisablePayload
  ) => Promise<AxiosResponse<ITwoFADisableResponse, any>> = (data) =>
    $apiWithToken.put('/users/2fa-disable', data);
  twoFASignIn: (
    data: ITwoFASignInPayload
  ) => Promise<AxiosResponse<ITwoFASignInResponse, any>> = (data) =>
    $apiWithToken.post('/auth/authenticate-2fa', data);
  resetPassword: (
    data: IResetPasswordPayload
  ) => Promise<AxiosResponse<IResetPasswordResponse, any>> = (data) =>
    $api.post('/auth/reset-password', data);
  checkResetCode: (
    data: ICheckResetCodePayload
  ) => Promise<AxiosResponse<ICheckResetCodeResponse, any>> = (data) =>
    $api.post('auth/check-reset-code', data);
  setNewPassword: (
    data: ISetNewPasswordPayload
  ) => Promise<AxiosResponse<ISetNewPasswordResponse, any>> = (data) =>
    $api.post('auth/set-new-password', data);
  signIn: (
    data: ISignInPayload
  ) => Promise<AxiosResponse<ISignInResponse, any>> = (data) =>
    $api.post('/auth/login', data);
  signUp: (
    data: ISignUpPayload
  ) => Promise<AxiosResponse<ISignUpResponse, any>> = (data) =>
    $api.post('/users', data);
  resendEmail: (
    data: IResendEmailPayload
  ) => Promise<AxiosResponse<IResendEmailResponse, any>> = (data) =>
    $api.post('/users/resend-activation-email', data);
}

export default HTTPAuthRepo;
