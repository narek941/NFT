export interface ILoginRes {
  token?: string;
  role?: string;
  twoFactorAuthEnabled?: boolean;
}

export interface IRegisterRes {
  role: string;
  status: string;
  email: string;
  username: string;
  deletedAt: null | string;
  twoFactorSecret: null | string;
  id: number;
  createdAt: string;
  updatedAt: string;
  token: string;
}

export interface IResetPasswordRes {
  email: string;
}

export interface IActivateEmail {
  code: string;
}

export interface I2FASetupRes {
  secret: string;
  otpauthUrl: string;
}
