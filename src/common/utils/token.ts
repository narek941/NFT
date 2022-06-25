import { isServer, jsonParse } from './common';
import { getCookie } from './cookies';

export const getToken = () => {
  if (!isServer) {
    const authCookie = getCookie('auth');
    if (authCookie === undefined) {
      return;
    }
    const auth = jsonParse(getCookie('auth') as string) || {};

    return auth?.token;
  }
};

export const user2FAPassed = () => {
  const auth = (!isServer && jsonParse(getCookie('auth') as string)) || {};
  const twoFactorPassed = auth?.twoFactorPassed || false;
  if (auth.twoFactorAuthEnabled && twoFactorPassed) {
    return true;
  }
  if (!auth.twoFactorAuthEnabled) {
    return true;
  }
};

export const getUserId = () => {
  if (!isServer) {
    const userCookie = getCookie('user');
    if (userCookie === undefined) {
      return;
    }
    const userDetails = jsonParse(userCookie as string) || {};

    return userDetails?.id;
  }
};

export const isLoggedIn = () => !!getToken();
