import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { PackState } from 'src/common/models/pack';
import { errorReducer, pendingReducer } from 'src/common/utils/extraReducers';
import { RootState } from 'src/storage/configureStore';
import {
  getPackByIdRequest,
  getPacksRequest,
  getUserPacksRequest,
  buyPackRequest,
  openPackRequest,
} from './actions';

const initialState: PackState = {
  pending: false,
  error: null,
  list: [],
};

const slice = createSlice({
  name: 'pack',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: PayloadAction<RootState, any>) => {
      state.pending = false;
      state.error = null;
      state.list = action.payload.pack.list;
      state.totalCount = action.payload.pack.totalCount;
    });
    builder.addCase(getPacksRequest.fulfilled, (state, action) => {
      state.pending = false;
      state.error = null;
      state.totalCount = action.payload.totalCount;
      state.list = action.payload.list;
      state.rarities = action.payload.rarities;
    });
    builder.addCase(getUserPacksRequest.fulfilled, (state, action) => {
      state.pending = false;
      state.error = null;
      state.totalCount = action.payload.totalCount;
      state.list = action.payload.list;
    });
    builder.addCase(getPackByIdRequest.fulfilled, (state, action) => {
      state.pending = false;
      state.error = null;
      state.pack = action.payload;
    });
    builder.addCase(buyPackRequest.fulfilled, (state, action) => {
      state.pending = false;
      state.error = null;
      state.revealedNFT = undefined;
    });
    builder.addCase(openPackRequest.fulfilled, (state, action) => {
      state.pending = false;
      state.error = null;
      state.revealedNFT = action.payload[0];
      const openedPackId = action.meta.arg.id;
      const newList = state.list.filter((item) => item.id !== openedPackId);
      state.list = newList;
    });
    builder.addMatcher(
      isAnyOf(
        getPacksRequest.pending,
        getPackByIdRequest.pending,
        getUserPacksRequest.pending,
        buyPackRequest.pending,
        openPackRequest.pending
      ),
      pendingReducer
    );
    builder.addMatcher(
      isAnyOf(
        getPacksRequest.rejected,
        getPackByIdRequest.rejected,
        getUserPacksRequest.rejected,
        buyPackRequest.rejected,
        openPackRequest.rejected
      ),
      errorReducer
    );
  },
});

export default slice.reducer;
