import { createAsyncThunk } from '@reduxjs/toolkit';
import { IRejectValue } from 'src/common/models/misc';
import {
  IGetPacksResponse,
  IGetPacksPayload,
  IGetPackByIdResponse,
  IGetPackByIdPayload,
  IGetUserPacksResponse,
  IGetUserPacksPayload,
  IBuyPackPayload,
  IBuyPackResponse,
  IOpenPackPayload,
  IOpenPackResponse,
} from 'src/common/models/pack';
import Injector from 'src/injector';
import { PACK_REPO } from 'src/injector/constants';
import { PackRepo } from '../model/PackRepo';

const { getPacks, getPackById, getUserPacks, buyPack, openPack } = Injector.get(
  PACK_REPO
) as PackRepo;

export const getPacksRequest = createAsyncThunk<
  IGetPacksResponse,
  IGetPacksPayload,
  { rejectValue: IRejectValue }
>('pack/getPacks', async (data: IGetPacksPayload, thunkApi) => {
  try {
    const response = await getPacks(data);
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({
      message: 'Get packs request failed',
    });
  }
});

export const getUserPacksRequest = createAsyncThunk<
  IGetUserPacksResponse,
  IGetUserPacksPayload,
  { rejectValue: IRejectValue }
>('pack/getUserPacks', async (data: IGetUserPacksPayload, thunkApi) => {
  try {
    const response = await getUserPacks(data);
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({
      message: 'Get user packs request failed',
    });
  }
});

export const getPackByIdRequest = createAsyncThunk<
  IGetPackByIdResponse,
  IGetPackByIdPayload,
  { rejectValue: IRejectValue }
>('pack/getPackById', async (data: IGetPackByIdPayload, thunkApi) => {
  try {
    const response = await getPackById(data);
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({
      message: 'Get pack by id request failed',
    });
  }
});

export const buyPackRequest = createAsyncThunk<
  IBuyPackResponse,
  IBuyPackPayload,
  { rejectValue: IRejectValue }
>('pack/buyPack', async (data: IBuyPackPayload, thunkApi) => {
  try {
    const response = await buyPack(data);
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({
      message: 'Buy pack request failed',
    });
  }
});

export const openPackRequest = createAsyncThunk<
  IOpenPackResponse,
  IOpenPackPayload,
  { rejectValue: IRejectValue }
>('pack/openPack', async (data: IOpenPackPayload, thunkApi) => {
  try {
    const response = await openPack(data);
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({
      message: 'Open pack request failed',
    });
  }
});
