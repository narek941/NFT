import { ILoginRes, IRegisterRes } from 'src/types/authService';
import { UserType } from 'src/types/general';
import { Empty } from './misc';

export interface AuthState {
  pending: boolean;
  error: string | null;
  token?: string;
  role?: string;
  twoFactorAuthEnabled?: boolean;
  twoFactorAuthSecret?: null | string;
  email?: string;
  code?: string;
  otpAuthUrl?: string;
  userType: UserType;
  showActivateNotification: boolean;
  twoFactorPassed: boolean;
}

export interface ISignInPayload {
  email: string;
  password: string;
}

export interface ISignInResponse extends ILoginRes {}

export interface ISignUpPayload {
  username: string;
  email: string;
  password: string;
}

export interface ISignUpResponse extends IRegisterRes {}

export interface IResetPasswordPayload {
  email: string;
}

export interface IResetPasswordResponse extends Empty {}

export interface ICheckResetCodePayload {
  email: string;
  code: string;
}

export interface ICheckResetCodeResponse extends Empty {}

export interface ISetNewPasswordPayload {
  email: string;
  code: string;
  password: string;
}

export interface ISetNewPasswordResponse extends Empty {}

export interface ITwoFASetupPayload extends Empty {}

export interface ITwoFASetupResponse {
  secret: string;
  otpauthUrl: string;
}

export interface ITwoFAEnablePayload {
  otp: string;
}

export interface ITwoFAEnableResponse {
  token: string;
}

export interface ITwoFADisablePayload {
  otp: string;
}

export interface ITwoFADisableResponse extends Empty {}

export interface ITwoFASignInPayload {
  otp: string;
}

export interface ITwoFASignInResponse {
  token: string;
}

export interface IActivateEmailPayload {
  code: string;
}
export interface IResendEmailPayload {
  email: string;
}

export interface IActivateEmailResponse extends Empty {}

export interface IResendEmailResponse extends Empty {}
