import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { AuthState } from 'src/common/models/auth';
import {
  pendingReducer,
  errorReducer,
} from '../../../common/utils/extraReducers';
import {
  signInRequest,
  signUpRequest,
  resetPasswordRequest,
  checkResetCodeRequest,
  setNewPasswordRequest,
  twoFADisableRequest,
  twoFAEnableRequest,
  twoFASetupRequest,
  twoFASignInRequest,
  activateEmailRequest,
  logOut,
  logOutFrom2FA,
  clearLoginFlow,
  clearAuthError,
  clearAuthPending,
  toggleShowActivateNotification,
  resendEmailRequest,
} from './actions';
import { eraseCookie, getCookie, setCookie } from 'src/common/utils/cookies';
import { isServer, jsonParse } from 'src/common/utils/common';
import { UserType } from '@type/general';

const authFromCookie = !isServer && jsonParse(getCookie('auth') || '{}');

const initialState: AuthState = {
  pending: false,
  error: null,
  userType: authFromCookie.userType || 'visitor',
  showActivateNotification: authFromCookie.showActivateNotification || false,
  token: authFromCookie.token || null,
  role: authFromCookie.role || null,
  twoFactorAuthEnabled: authFromCookie.twoFactorAuthEnabled || false,
  twoFactorPassed: authFromCookie.twoFactorPassed || false,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: () => ({
      role: '',
      token: '',
      error: null,
      pending: false,
      twoFactorPassed: false,
      twoFactorAuthEnabled: false,
      showActivateNotification: false,
      userType: 'visitor' as UserType,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(logOut, (state, action) => {
      eraseCookie('auth');
      eraseCookie('user');
      localStorage.clear();
      window.location.replace('/');
    });
    builder.addCase(logOutFrom2FA, (state) => {
      eraseCookie('auth');
      eraseCookie('user');
      localStorage.clear();
    });
    builder.addCase(clearLoginFlow, (state, action) => {
      eraseCookie('auth');
      eraseCookie('user');
      localStorage.clear();
      window.location.replace('/signin/step1?error=code');
    });
    builder.addCase(clearAuthError, (state) => {
      state.error = null;
    });
    builder.addCase(clearAuthPending, (state) => {
      state.pending = false;
    });
    builder.addCase(toggleShowActivateNotification, (state, action) => {
      state.showActivateNotification = !state.showActivateNotification;
      setCookie(
        'auth',
        JSON.stringify({
          ...state,
          showActivateNotification: !state.showActivateNotification,
        }),
        10
      );
    });
    builder.addCase(signInRequest.fulfilled, (state, action) => {
      // todo get expiration time from token
      setCookie(
        'auth',
        JSON.stringify({ ...action.payload, userType: 'authorized' }),
        10
      );
      state.pending = false;
      state.error = null;
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.userType = 'authorized';
      state.twoFactorAuthEnabled = action.payload.twoFactorAuthEnabled;
    });
    builder.addCase(signUpRequest.fulfilled, (state, action) => {
      state.error = null;
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.email = action.payload.email;
      state.showActivateNotification = true;
      state.userType = 'prospect';
      setCookie(
        'auth',
        JSON.stringify({
          ...action.payload,
          userType: 'prospect',
          showActivateNotification: true,
        }),
        10
      );
    });
    builder.addCase(resetPasswordRequest.fulfilled, (state, action) => {
      state.pending = false;
      state.error = null;
      state.email = action.meta.arg.email;
      setCookie(
        'reset',
        JSON.stringify({
          email: action.meta.arg.email,
        }),
        10
      );
    });
    builder.addCase(checkResetCodeRequest.fulfilled, (state, action) => {
      state.pending = false;
      state.error = null;
      state.email = action.meta.arg.email;
      state.code = action.meta.arg.code;
    });
    builder.addCase(setNewPasswordRequest.fulfilled, (state, action) => {
      state.pending = false;
      state.error = null;
      state.code = undefined;
    });
    builder.addCase(twoFADisableRequest.fulfilled, (state, action) => {
      state.pending = false;
      state.error = null;
      state.twoFactorAuthEnabled = false;
      setCookie(
        'auth',
        JSON.stringify({
          ...state,
          twoFactorAuthEnabled: false,
        }),
        10
      );
    });
    builder.addCase(twoFAEnableRequest.fulfilled, (state, action) => {
      state.pending = false;
      state.error = null;
      state.token = action.payload.token;
      state.twoFactorAuthEnabled = true;
      state.twoFactorPassed = true;
      setCookie(
        'auth',
        JSON.stringify({
          ...state,
          token: action.payload.token,
          twoFactorAuthEnabled: true,
          twoFactorPassed: true,
        }),
        10
      );
    });
    builder.addCase(twoFASetupRequest.fulfilled, (state, action) => {
      state.pending = false;
      state.error = null;
      state.twoFactorAuthSecret = action.payload.secret;
      state.otpAuthUrl = action.payload.otpauthUrl;
    });
    builder.addCase(twoFASignInRequest.fulfilled, (state, action) => {
      state.pending = false;
      state.error = null;
      state.token = action.payload.token;
      state.twoFactorAuthEnabled = true;
      state.twoFactorPassed = true;
      setCookie(
        'auth',
        JSON.stringify({
          ...state,
          token: action.payload.token,
          twoFactorAuthEnabled: true,
          twoFactorPassed: true,
        }),
        10
      );
    });
    builder.addCase(activateEmailRequest.fulfilled, (state, action) => {
      state.pending = false;
      state.error = null;
      state.twoFactorAuthEnabled = false;
      state.userType = 'visitor';
    });
    builder.addCase(resendEmailRequest.fulfilled, (state, action) => {
      state.pending = false;
      state.error = null;
      state.twoFactorAuthEnabled = false;
      state.userType = 'visitor';
    });
    builder.addMatcher(
      isAnyOf(
        signInRequest.pending,
        signUpRequest.pending,
        resetPasswordRequest.pending,
        checkResetCodeRequest.pending,
        setNewPasswordRequest.pending,
        twoFADisableRequest.pending,
        twoFAEnableRequest.pending,
        twoFASetupRequest.pending,
        twoFASignInRequest.pending,
        activateEmailRequest.pending,
        resendEmailRequest.pending
      ),
      pendingReducer
    );
    builder.addMatcher(
      isAnyOf(
        signInRequest.rejected,
        signUpRequest.rejected,
        resetPasswordRequest.rejected,
        checkResetCodeRequest.rejected,
        setNewPasswordRequest.rejected,
        twoFADisableRequest.rejected,
        twoFAEnableRequest.rejected,
        twoFASetupRequest.rejected,
        twoFASignInRequest.rejected,
        activateEmailRequest.rejected,
        resendEmailRequest.rejected
      ),
      errorReducer
    );
  },
});

export const { reset: resetAuthState } = slice.actions;

export default slice.reducer;
