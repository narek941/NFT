import { $apiWithToken } from 'src/common/api';
import { AxiosResponse } from 'axios';
import {
  IGetPacksResponse,
  IGetPackByIdResponse,
  IGetPacksPayload,
  IGetUserPacksPayload,
  IGetUserPacksResponse,
  IGetPackByIdPayload,
  IBuyPackPayload,
  IBuyPackResponse,
  IOpenPackPayload,
  IOpenPackResponse,
} from 'src/common/models/pack';
import { mockSuccess } from 'src/common/utils/mock';
import { PackRepo } from '../model/PackRepo';

class HTTPPackRepo implements PackRepo {
  getPacks: (
    data: IGetPacksPayload
  ) => Promise<AxiosResponse<IGetPacksResponse, any>> = ({
    skip,
    take,
    sort,
  }) =>
    $apiWithToken.get(`/collections/listed-packs`, {
      params: { skip, take, sort },
    });

  getUserPacks: (
    data: IGetUserPacksPayload
  ) => Promise<AxiosResponse<IGetUserPacksResponse, any>> = ({
    skip,
    take,
    sort,
  }) =>
    $apiWithToken.get(`/collections/user-packs`, {
      params: { skip, take, sort },
    });

  getPackById: (
    data: IGetPackByIdPayload
  ) => Promise<AxiosResponse<IGetPackByIdResponse, any>> = ({ id }) =>
    $apiWithToken.get(`collections/pack/${id}`);

  buyPack: (
    data: IBuyPackPayload
  ) => Promise<AxiosResponse<IBuyPackResponse, any>> = ({ id }) =>
    $apiWithToken.post('collections/pack/buy', {
      packId: id,
    });

  openPack: (
    data: IOpenPackPayload
  ) => Promise<AxiosResponse<IOpenPackResponse, any>> = ({ id }) =>
    $apiWithToken.post('collections/pack/open', {
      packId: id,
    });
}

export default HTTPPackRepo;
