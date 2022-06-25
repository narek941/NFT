import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { NFTState } from 'src/common/models/nft';
import { errorReducer, pendingReducer } from 'src/common/utils/extraReducers';
import { RootState } from 'src/storage/configureStore';
import {
  getCollectionNFTsRequest,
  getNFTByIdRequest,
  getUserNFTsRequest,
  getUserRedeemNFTsRequest,
  getBuyNFTsRequest,
  claimNFTRequest,
  getUserLikedNFTsRequest,
  clearClaimStatus,
  likeNFTRequest,
  redeemNFTRequest,
} from './actions';

const initialState: NFTState = {
  pending: false,
  error: null,
  totalCount: 0,
  likedTotalCount: 0,
  list: [],
  likedList: [],
  redeemOptions: [],
  traits: [],
  rarities: {},
  userAllNFT: [],
  claimedSuccess: false,
};

const slice = createSlice({
  name: 'nft',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: PayloadAction<RootState, any>) => {
      state.pending = false;
      state.error = null;
      state.list = action.payload.nft.list;
      state.likedList = action.payload.nft.likedList;
      state.userAllNFT = action.payload.nft.userAllNFT;
      state.totalCount = action.payload.nft.totalCount;
      state.traits = action.payload.nft.traits || [];
      state.redeemOptions = action.payload.nft.redeemOptions || [];
      state.rarities = action.payload.nft.rarities || {};
    });

    builder.addCase(getCollectionNFTsRequest.fulfilled, (state, action) => {
      state.pending = false;
      state.error = null;
      state.totalCount = action.payload.totalCount;
      state.list = action.payload.list;
      state.traits = action.payload.traits || [];
      state.rarities = action.payload.rarities || {};
    });

    builder.addCase(getUserNFTsRequest.fulfilled, (state, action) => {
      state.pending = false;
      state.error = null;
      state.totalCount = action.payload.totalCount;
      state.list = action.payload.list;

      if (action.payload.isAllNFT) {
        state.userAllNFT = action.payload.list;
      }
    });

    builder.addCase(getBuyNFTsRequest.fulfilled, (state, action) => {
      state.pending = false;
      state.error = null;
      state.totalCount = action.payload.totalCount;
      state.list = action.payload.list;
      state.traits = action.payload.traits || [];
      state.redeemOptions = action.payload.redeemOptions || [];
      state.rarities = action.payload.rarities || {};
    });

    builder.addCase(getUserRedeemNFTsRequest.fulfilled, (state, action) => {
      state.pending = false;
      state.error = null;
      state.totalCount = action.payload.totalCount;
      state.list = action.payload.list;
    });

    builder.addCase(claimNFTRequest.fulfilled, (state, action) => {
      state.pending = false;
      state.error = null;
      state.claimedSuccess = true;
      if (action.payload && action.payload.id) {
        state.list = state.list.map((listItem) => {
          if (listItem.id === action.payload.id) {
            listItem.isClaimed = true;
          }
          return listItem;
        });
      }
    });

    builder.addCase(clearClaimStatus, (state, action) => {
      state.claimedSuccess = false;
    });

    builder.addCase(getNFTByIdRequest.fulfilled, (state, action) => {
      state.pending = false;
      state.error = null;
      state.nft = action.payload;
      const newNFTlist = state.list.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      state.list = newNFTlist;
    });

    builder.addCase(likeNFTRequest.fulfilled, (state, action) => {
      state.pending = false;
      state.error = null;
      state.nft = action.payload;
      const newNFTlist = state.list.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      state.list = newNFTlist;
      if (
        action.payload.liked &&
        state.likedList.find((item) => item.id === action.payload.id) ===
          undefined
      ) {
        state.likedList.push(action.payload);
      } else {
        state.likedList = state.likedList.filter((item) => {
          return item.id !== action.payload.id;
        });
      }
    });

    builder.addCase(getUserLikedNFTsRequest.fulfilled, (state, action) => {
      state.pending = false;
      state.error = null;
      state.likedList = action.payload.list;
      state.likedTotalCount = action.payload.totalCount;
    });

    builder.addCase(redeemNFTRequest.fulfilled, (state, action) => {
      const { id, utilityStatus } = action.payload || {};
      if (!id || !utilityStatus) return;
      if (utilityStatus === 'REDEEMED') {
        state.list = state.list.filter((item) => item.id !== id);
        return;
      }
      state.list = state.list.map((item) => {
        if (item.id !== action.payload.id) return item;
        return {
          ...item,
          utilityStatus: action.payload.utilityStatus,
        };
      });
    });

    builder.addMatcher(
      isAnyOf(
        getCollectionNFTsRequest.pending,
        getUserNFTsRequest.pending,
        getNFTByIdRequest.pending,
        getBuyNFTsRequest.pending,
        getUserRedeemNFTsRequest.pending,
        claimNFTRequest.pending,
        getUserLikedNFTsRequest.pending
      ),
      pendingReducer
    );

    builder.addMatcher(
      isAnyOf(
        getCollectionNFTsRequest.rejected,
        getUserNFTsRequest.rejected,
        getNFTByIdRequest.rejected,
        getBuyNFTsRequest.rejected,
        getUserRedeemNFTsRequest.rejected,
        claimNFTRequest.rejected,
        getUserLikedNFTsRequest.rejected
      ),
      errorReducer
    );
  },
});

export default slice.reducer;
