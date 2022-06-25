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
  IResendEmailPayload,
  IResendEmailResponse,
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
} from 'src/common/models/auth';

export interface AuthRepo {
  signIn: (
    data: ISignInPayload
  ) => Promise<AxiosResponse<ISignInResponse, any>>;
  signUp: (
    data: ISignUpPayload
  ) => Promise<AxiosResponse<ISignUpResponse, any>>;
  resetPassword: (
    data: IResetPasswordPayload
  ) => Promise<AxiosResponse<IResetPasswordResponse, any>>;
  checkResetCode: (
    data: ICheckResetCodePayload
  ) => Promise<AxiosResponse<ICheckResetCodeResponse, any>>;
  setNewPassword: (
    data: ISetNewPasswordPayload
  ) => Promise<AxiosResponse<ISetNewPasswordResponse, any>>;
  twoFASetup: (
    data: ITwoFASetupPayload
  ) => Promise<AxiosResponse<ITwoFASetupResponse, any>>;
  twoFAEnable: (
    data: ITwoFAEnablePayload
  ) => Promise<AxiosResponse<ITwoFAEnableResponse, any>>;
  twoFADisable: (
    data: ITwoFADisablePayload
  ) => Promise<AxiosResponse<ITwoFADisableResponse, any>>;
  twoFASignIn: (
    data: ITwoFASignInPayload
  ) => Promise<AxiosResponse<ITwoFASignInResponse, any>>;
  activateEmail: (
    data: IActivateEmailPayload
  ) => Promise<AxiosResponse<IActivateEmailResponse, any>>;
  resendEmail: (
    data: IResendEmailPayload
  ) => Promise<AxiosResponse<IResendEmailResponse, any>>;
}
