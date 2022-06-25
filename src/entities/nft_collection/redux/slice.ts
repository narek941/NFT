import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { NFTCollectionState } from 'src/common/models/nftCollection';
import { AbilityToBuyValues } from '@type/restriction';
import { errorReducer, pendingReducer } from 'src/common/utils/extraReducers';
import { RootState } from 'src/storage/configureStore';
import {
  getCollectionByIdRequest,
  getCollectionsRequest,
  checkAbilityToBuyRequest,
  resetAbilityToBuy,
} from './actions';

const initialState: NFTCollectionState = {
  pending: false,
  error: null,
  list: [],
  totalCount: 0,
};

const slice = createSlice({
  name: 'nftCollection',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: PayloadAction<RootState, any>) => {
      state.pending = false;
      state.error = null;
      state.list = action.payload.nftCollection.list;
      state.totalCount = action.payload.nftCollection.totalCount;
    });
    builder.addCase(getCollectionsRequest.fulfilled, (state, action) => {
      state.pending = false;
      state.error = null;
      state.list = action.payload.list;
      state.totalCount = action.payload.totalCount;
    });
    builder.addCase(getCollectionByIdRequest.fulfilled, (state, action) => {
      state.pending = false;
      state.error = null;
      state.collection = action.payload;
    });
    builder.addCase(checkAbilityToBuyRequest.fulfilled, (state, action) => {
      state.abilityToBuy = AbilityToBuyValues.SUCCESS;
    });
    builder.addCase(checkAbilityToBuyRequest.rejected, (state, action) => {
      if (action.payload?.message) {
        state.abilityToBuy = AbilityToBuyValues[action.payload.message];
      }
    });
    builder.addCase(resetAbilityToBuy, (state, action) => {
      state.abilityToBuy = undefined;
    });
    builder.addMatcher(
      isAnyOf(getCollectionsRequest.pending, getCollectionByIdRequest.pending),
      pendingReducer
    );
    builder.addMatcher(
      isAnyOf(
        getCollectionsRequest.rejected,
        getCollectionByIdRequest.rejected
      ),
      errorReducer
    );
  },
});

export default slice.reducer;
