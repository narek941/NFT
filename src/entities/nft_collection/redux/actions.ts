import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { IRejectValue } from 'src/common/models/misc';
import {
  IGetCollectionsResponse,
  IGetCollectionsPayload,
  IGetCollectionByIdPayload,
  IGetCollectionByIdResponse,
} from 'src/common/models/nftCollection';
import {
  ICheckAbilityToBuyPayload,
  ICheckAbilityToBuyResponse,
} from '@type/restriction';
import Injector from 'src/injector';
import { NFT_COLLECTION_REPO } from 'src/injector/constants';
import { NFTCollectionRepo } from '../model/NFTCollectionRepo';

const { getCollectionById, getCollections, checkAbilityToBuy } = Injector.get(
  NFT_COLLECTION_REPO
) as NFTCollectionRepo;

export const getCollectionsRequest = createAsyncThunk<
  IGetCollectionsResponse,
  IGetCollectionsPayload,
  { rejectValue: IRejectValue }
>(
  'nftCollection/getCollections',
  async (data: IGetCollectionsPayload, thunkApi) => {
    try {
      const response = await getCollections(data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({
        message: 'Get collections request failed',
      });
    }
  }
);

export const getCollectionByIdRequest = createAsyncThunk<
  IGetCollectionByIdResponse,
  IGetCollectionByIdPayload,
  { rejectValue: IRejectValue }
>(
  'nftCollection/getCollectionById',
  async (data: IGetCollectionByIdPayload, thunkApi) => {
    try {
      const response = await getCollectionById(data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({
        message: 'Get collection by id request failed',
      });
    }
  }
);

export const checkAbilityToBuyRequest = createAsyncThunk<
  ICheckAbilityToBuyResponse,
  ICheckAbilityToBuyPayload,
  { rejectValue: IRejectValue }
>(
  'nftCollection/checkAbilityToBuy',
  async (data: ICheckAbilityToBuyPayload, thunkApi) => {
    try {
      const response = await checkAbilityToBuy(data);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue({
        message: error.response.data.message,
      });
    }
  }
);

export const resetAbilityToBuy = createAction(
  'nftCollection/resetAbilityToBuy'
);
