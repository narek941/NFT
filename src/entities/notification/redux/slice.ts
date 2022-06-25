import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { errorReducer, pendingReducer } from 'src/common/utils/extraReducers';
import {
  getUserNotificationsRequest,
  notificationFiltersUpdate,
  updateNotificationRequest,
} from './actions';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from 'src/storage/configureStore';
import { NotificationState } from 'src/common/models/notification';

const initialState: NotificationState = {
  pending: false,
  error: null,
  notificationList: [],
  totalCount: 0,
  isUnreadNotification: false,
  filter: {
    sort: 'id',
    order: 'DESC',
  },
};

const slice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: PayloadAction<RootState, any>) => {
      state.pending = false;
      state.error = null;
    });

    builder.addCase(getUserNotificationsRequest.fulfilled, (state, action) => {
      state.pending = false;
      state.error = null;
      state.notificationList = action.payload.list;
      state.totalCount = action.payload.totalCount;

      state.notificationList?.find(({ isRead }) => {
        if (!isRead) {
          state.isUnreadNotification = true;
        }
      });
    });

    builder.addCase(updateNotificationRequest.fulfilled, (state) => {
      state.pending = false;
      state.error = null;
      state.isUnreadNotification = false;
    });

    builder.addCase(notificationFiltersUpdate, (state, action) => {
      state.filter = { ...state.filter, ...action.payload };
    });

    builder.addMatcher(
      isAnyOf(
        getUserNotificationsRequest.pending,
        updateNotificationRequest.pending
      ),

      pendingReducer
    );
    builder.addMatcher(
      isAnyOf(
        getUserNotificationsRequest.rejected,
        updateNotificationRequest.rejected
      ),
      errorReducer
    );
  },
});

export const { reset: resetNotificationState } = slice.actions;

export default slice.reducer;
