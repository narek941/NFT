import { AxiosResponse } from 'axios';
import {
  ISignInPayload,
  ISignInResponse,
  ISignUpPayload,
  ISignUpResponse,
  IActivateEmailPayload,
  IActivateEmailResponse,
  ICheckResetCodePayload,
  ICheckResetCodeResponse,
  IResetPasswordPayload,
  IResetPasswordResponse,
  ISetNewPasswordPayload,
  ISetNewPasswordResponse,
  ITwoFADisablePayload,
  ITwoFADisableResponse,
  ITwoFAEnablePayload,
  ITwoFAEnableResponse,
  ITwoFASetupPayload,
  ITwoFASetupResponse,
  ITwoFASignInPayload,
  ITwoFASignInResponse,
  IResendEmailPayload,
  IResendEmailResponse,
} from 'src/common/models/auth';
import { AuthRepo } from '../model/AuthRepo';

import $api, { $apiWithToken } from 'src/common/api';
import { mockSuccess } from 'src/common/utils/mock';
import { ILoginRes } from 'src/types/authService';

class MockAuthRepo implements AuthRepo {
  private mockSignInResponse: ILoginRes = {
    token: 'mockaccesstoken',
    role: 'user',
    twoFactorAuthEnabled: false,
  };

  activateEmail: (
    data: IActivateEmailPayload
  ) => Promise<AxiosResponse<IActivateEmailResponse, any>> = (data) =>
    $api.post('/auth/activate-email', data);
  twoFASetup: (
    data: ITwoFASetupPayload
  ) => Promise<AxiosResponse<ITwoFASetupResponse, any>> = () =>
    $api.get('/users/2fa-setup');
  twoFAEnable: (
    data: ITwoFAEnablePayload
  ) => Promise<AxiosResponse<ITwoFAEnableResponse, any>> = (data) =>
    $api.put('/users/2fa-enable', data);
  twoFADisable: (
    data: ITwoFADisablePayload
  ) => Promise<AxiosResponse<ITwoFADisableResponse, any>> = (data) =>
    $api.put('/users/2fa-disable', data);
  twoFASignIn: (
    data: ITwoFASignInPayload
  ) => Promise<AxiosResponse<ITwoFASignInResponse, any>> = (data) =>
    $api.post('/auth/authenticate-2fa', data);
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
    mockSuccess(this.mockSignInResponse);
  signUp: (
    data: ISignUpPayload
  ) => Promise<AxiosResponse<ISignUpResponse, any>> = (data) =>
    $api.post('/users', data);
  resendEmail: (
    data: IResendEmailPayload
  ) => Promise<AxiosResponse<IResendEmailResponse, any>> = (data) =>
    $api.post('/users/resend-activation-email', data);
}

export default MockAuthRepo;
