import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { ChangeSourse, UserState } from 'src/common/models/user';
import { errorReducer } from 'src/common/utils/extraReducers';
import {
  activateChangeEmailRequest,
  metamaskSendRequest,
  setPending,
  updateEmailRequest,
  updateUserInfoRequest,
  updateUserPhotoRequest,
  updatePasswordRequest,
  userInfoRequest,
  userPhotoRequest,
  clearUserError,
  resetNewEmail,
} from './actions';
import { setCookie } from '../../../common/utils/cookies';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from 'src/storage/configureStore';

const initialState: UserState = {
  pending: false,
  error: null,
};

const userPendingReducer = (state, action) => {
  state.pending = true;
  state.error = null;
  state.source = undefined;
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: PayloadAction<RootState, any>) => {
      state.pending = false;
      state.error = null;
      state.user = action.payload.user.user;
      state.metamaskAddress = action.payload.user.metamaskAddress;
    });
    builder.addCase(setPending, (state, action) => {
      state.pending = action.payload;
    });
    builder.addCase(resetNewEmail, (state) => {
      if (state.user) {
        state.user.newEmail = undefined;
      }
    });
    builder.addCase(metamaskSendRequest.fulfilled, (state, action) => {
      state.metamaskAddress = action.meta.arg.address;
      state.pending = false;
      state.error = null;
    });
    builder.addCase(userInfoRequest.fulfilled, (state, action) => {
      state.user = action.payload;
      if (state.profilePhoto !== undefined) {
        state.user.photo = state.profilePhoto;
        state.profilePhoto = undefined;
      }
      if (action.meta.arg.source) {
        state.source = action.meta.arg.source;
      }
      state.pending = false;
      state.error = null;
      setCookie(
        'user',
        JSON.stringify({
          ...(action.payload && { id: action.payload.id }),
          ...(state.user.address && { address: state.user.address.address }),
        }),
        10
      );
    });
    builder.addCase(updateUserInfoRequest.fulfilled, (state, action) => {
      state.user = action.payload;
      state.pending = false;
      state.error = null;
      setCookie(
        'user',
        JSON.stringify({
          ...(action.payload && { id: action.payload.id }),
          ...(state.user.address && { address: state.user.address.address }),
        }),
        10
      );
    });
    builder.addCase(userPhotoRequest.fulfilled, (state, action) => {
      if (state.user) {
        state.user.photo = action.payload.photo || null;
      } else {
        state.profilePhoto = action.payload.photo || null;
      }
      state.pending = false;
      state.error = null;
    });
    builder.addCase(updateUserPhotoRequest.fulfilled, (state, action) => {
      if (state.user && action.payload.photo) {
        state.user.photo = action.payload.photo;
      }
      state.pending = false;
      state.error = null;
    });
    builder.addCase(updateEmailRequest.fulfilled, (state, action) => {
      state.pending = false;
      state.error = null;
      const updatedEmail = action.meta.arg.email;
      if (state.user) {
        state.user.newEmail = updatedEmail;
      }
    });

    builder.addCase(activateChangeEmailRequest.fulfilled, (state, action) => {
      state.pending = false;
      state.error = null;
    });

    builder.addCase(userPhotoRequest.rejected, (state, action) => {
      if (state.user) {
        state.user.photo = null;
      } else {
        state.profilePhoto = null;
      }
    });

    builder.addCase(updatePasswordRequest.fulfilled, (state, action) => {
      state.pending = false;
      state.error = null;
      state.source = ChangeSourse.PASSWORD;
    });

    builder.addCase(clearUserError, (state) => {
      state.error = null;
    });

    builder.addMatcher(
      isAnyOf(
        metamaskSendRequest.pending,
        userInfoRequest.pending,
        updateUserInfoRequest.pending,
        updateUserPhotoRequest.pending,
        updateEmailRequest.pending,
        activateChangeEmailRequest.pending,
        updatePasswordRequest.pending
      ),
      userPendingReducer
    );
    builder.addMatcher(
      isAnyOf(
        metamaskSendRequest.rejected,
        userInfoRequest.rejected,
        updateUserInfoRequest.rejected,
        updateUserPhotoRequest.rejected,
        updateEmailRequest.rejected,
        activateChangeEmailRequest.rejected,
        updatePasswordRequest.rejected
      ),
      errorReducer
    );
  },
});

export const { reset: resetUserState } = slice.actions;

export default slice.reducer;
