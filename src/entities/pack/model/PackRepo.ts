import { AxiosResponse } from 'axios';
import {
  IGetPacksPayload,
  IGetPacksResponse,
  IGetPackByIdPayload,
  IGetPackByIdResponse,
  IGetUserPacksPayload,
  IGetUserPacksResponse,
  IBuyPackPayload,
  IBuyPackResponse,
  IOpenPackPayload,
  IOpenPackResponse,
} from 'src/common/models/pack';

export interface PackRepo {
  getPacks: (
    data: IGetPacksPayload
  ) => Promise<AxiosResponse<IGetPacksResponse, any>>;
  getUserPacks: (
    data: IGetUserPacksPayload
  ) => Promise<AxiosResponse<IGetUserPacksResponse, any>>;
  getPackById: (
    data: IGetPackByIdPayload
  ) => Promise<AxiosResponse<IGetPackByIdResponse, any>>;
  buyPack: (
    data: IBuyPackPayload
  ) => Promise<AxiosResponse<IBuyPackResponse, any>>;
  openPack: (
    data: IOpenPackPayload
  ) => Promise<AxiosResponse<IOpenPackResponse, any>>;
}
