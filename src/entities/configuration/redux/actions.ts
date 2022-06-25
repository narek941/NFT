import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  IGetNavigationConfigPayload,
  IGetNavigationConfigResponse,
} from 'src/common/models/configuration';
import { IRejectValue } from 'src/common/models/misc';
import Injector from 'src/injector';
import { CONFIGURATION_REPO } from 'src/injector/constants';
import { ConfigurationRepo } from '../model/ConfigurationRepo';

const { getNavigationConfig } = Injector.get(
  CONFIGURATION_REPO
) as ConfigurationRepo;

export const getNavigationConfigRequest = createAsyncThunk<
  IGetNavigationConfigResponse,
  IGetNavigationConfigPayload,
  { rejectValue: IRejectValue }
>(
  'configuration/getNavigationConfig',
  async (data: IGetNavigationConfigPayload, thunkApi) => {
    try {
      const response = await getNavigationConfig(data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({
        message: 'Get Navigation Config request failed',
      });
    }
  }
);
