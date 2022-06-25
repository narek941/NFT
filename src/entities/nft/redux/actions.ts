import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { DEFAULT_LIMIT, getOffset } from '@utils/pagination';
import { IRejectValue } from 'src/common/models/misc';
import {
  IGetBuyNFTPayload,
  IGetCollectionNFTSPayload,
  IGetCollectionNFTSResponse,
  IGetNFTByIdPayload,
  IGetNFTByIdResponse,
  IGetUserNFTSPayload,
  IGetUserNFTSResponse,
  IGetRedeemNFTSPayload,
  IGetRedeemNFTSResponse,
  IRedeemNFTResponse,
  IRedeemNFTPayload,
  INFTClaimPayload,
  INFTClaimResponse,
  IGetUserLikedNFTSResponse,
  IGetUserLikedNFTSPayload,
  ILikeNFTPayload,
  ILikeNFTResponse,
} from 'src/common/models/nft';
import Injector from 'src/injector';
import { NFT_REPO } from 'src/injector/constants';
import { NFTRepo } from '../model/NFTRepo';

const {
  getCollectionNFTs,
  getUserNFTs,
  getNFTById,
  getRedeemNFTs,
  redeemNFT,
  getBuyNFTs,
  claimNFT,
  getUserLikedNFTs,
  likeNFT,
} = Injector.get(NFT_REPO) as NFTRepo;

export const clearClaimStatus = createAction('nft/clearClaimStatus');

export const getCollectionNFTsRequest = createAsyncThunk<
  IGetCollectionNFTSResponse,
  IGetCollectionNFTSPayload,
  { rejectValue: IRejectValue }
>(
  'nft/getCollectionNFTs',
  async (data: IGetCollectionNFTSPayload, thunkApi) => {
    try {
      const response = await getCollectionNFTs(data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({
        message: 'Get collection nfts request failed',
      });
    }
  }
);

export const getUserNFTsRequest = createAsyncThunk<
  IGetUserNFTSResponse,
  IGetUserNFTSPayload,
  { rejectValue: IRejectValue }
>(
  'nft/getUserNFTs',
  async ({ isAllNFT, ...data }: IGetUserNFTSPayload, thunkApi) => {
    try {
      const response = await getUserNFTs(data);

      return { ...response.data, isAllNFT };
    } catch (error) {
      return thunkApi.rejectWithValue({
        message: 'Get user nfts request failed',
      });
    }
  }
);

export const getUserRedeemNFTsRequest = createAsyncThunk<
  IGetRedeemNFTSResponse,
  IGetRedeemNFTSPayload,
  { rejectValue: IRejectValue }
>('nft/user-redeem-nfts', async (data: IGetRedeemNFTSPayload, thunkApi) => {
  try {
    const response = await getRedeemNFTs(data);
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({
      message: 'Get user redeem nfts request failed',
    });
  }
});

export const getNFTByIdRequest = createAsyncThunk<
  IGetNFTByIdResponse,
  IGetNFTByIdPayload,
  { rejectValue: IRejectValue }
>('nft/getNFTById', async (data: IGetNFTByIdPayload, thunkApi) => {
  try {
    const response = await getNFTById(data);
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({
      message: 'Get nft by id request failed',
    });
  }
});

export const claimNFTRequest = createAsyncThunk<
  INFTClaimResponse,
  INFTClaimPayload,
  { rejectValue: IRejectValue }
>('collections/nft-claim', async (data: INFTClaimPayload, thunkApi) => {
  try {
    const response = await claimNFT(data);
    if (response.status === (200 || 201)) {
      return { id: data.tokenIds[0] };
    } else {
      return response.data;
    }
  } catch (error) {
    return thunkApi.rejectWithValue({
      message: 'Claim nft request failed',
    });
  }
});

export const redeemNFTRequest = createAsyncThunk<
  IRedeemNFTResponse,
  IRedeemNFTPayload,
  { rejectValue: IRejectValue }
>('nft/redeemNFT', async (data: IRedeemNFTPayload, thunkApi) => {
  try {
    const response = await redeemNFT(data);
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({
      message: 'Redeem nft request failed',
    });
  }
});

export const getBuyNFTsRequest = createAsyncThunk<
  IGetCollectionNFTSResponse,
  IGetBuyNFTPayload,
  { rejectValue: IRejectValue }
>('nft/getBuyNFTs', async (data: IGetBuyNFTPayload, thunkApi) => {
  try {
    const response = await getBuyNFTs(data);
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({
      message: 'Get buy nfts request failed',
    });
  }
});

export const getUserLikedNFTsRequest = createAsyncThunk<
  IGetUserLikedNFTSResponse,
  IGetUserLikedNFTSPayload,
  { rejectValue: IRejectValue }
>('nft/getUserLikedNFTs', async (data: IGetUserLikedNFTSPayload, thunkApi) => {
  try {
    const response = await getUserLikedNFTs(data);
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({
      message: 'Get user liked nfts request failed',
    });
  }
});

export const likeNFTRequest = createAsyncThunk<
  ILikeNFTResponse,
  ILikeNFTPayload,
  { rejectValue: IRejectValue }
>('nft/likeNFT', async (data: ILikeNFTPayload, thunkApi) => {
  try {
    await likeNFT(data);
    const response = await getNFTById(data);
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({
      message: 'Like nft request failed',
    });
  }
});
