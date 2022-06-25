import { AxiosResponse } from 'axios';
import {
  IBuyPackPayload,
  IBuyPackResponse,
  IGetPackByIdPayload,
  IGetPackByIdResponse,
  IGetPacksPayload,
  IGetPacksResponse,
  IGetUserPacksPayload,
  IGetUserPacksResponse,
  IOpenPackPayload,
  IOpenPackResponse,
} from 'src/common/models/pack';
import { mockSuccess } from 'src/common/utils/mock';
import { pack } from 'src/__mocks__/pack';
import { packs } from 'src/__mocks__/packs';
import { PackRepo } from '../model/PackRepo';

class MockPackRepo implements PackRepo {
  private mockGetPackResponse: IGetPacksResponse = {
    totalCount: 8,
    list: packs,
    rarities: {
      1: 0,
    },
  };

  private mockGetPackByIdResponse: IGetPackByIdResponse = pack;

  getPacks: (
    data: IGetPacksPayload
  ) => Promise<AxiosResponse<IGetPacksResponse, any>> = ({
    skip,
    take,
    sort,
  }) => mockSuccess(this.mockGetPackResponse);

  getUserPacks: (
    data: IGetUserPacksPayload
  ) => Promise<AxiosResponse<IGetUserPacksResponse, any>> = ({
    skip,
    take,
    sort,
  }) => mockSuccess(this.mockGetPackResponse);

  getPackById: (
    data: IGetPackByIdPayload
  ) => Promise<AxiosResponse<IGetPackByIdResponse, any>> = ({ id }) =>
    mockSuccess(this.mockGetPackByIdResponse);

  buyPack: (
    data: IBuyPackPayload
  ) => Promise<AxiosResponse<IBuyPackResponse, any>> = ({ id }) =>
    mockSuccess({});
  openPack: (
    data: IOpenPackPayload
  ) => Promise<AxiosResponse<IOpenPackResponse, any>> = ({ id }) =>
    mockSuccess({});
}

export default MockPackRepo;
