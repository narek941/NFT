import { $apiWithToken } from 'src/common/api';
import { AxiosResponse } from 'axios';
import {
  IGetCollectionsPayload,
  IGetCollectionsResponse,
  IGetCollectionByIdPayload,
  IGetCollectionByIdResponse,
} from 'src/common/models/nftCollection';
import {
  ICheckAbilityToBuyPayload,
  ICheckAbilityToBuyResponse,
} from '@type/restriction';
import { NFTCollectionRepo } from '../model/NFTCollectionRepo';

class HTTPNFTCollectionRepo implements NFTCollectionRepo {
  getCollections: (
    data: IGetCollectionsPayload
  ) => Promise<AxiosResponse<IGetCollectionsResponse, any>> = (params) =>
    $apiWithToken.get('/collections/collections', {
      params,
    });
  getCollectionById: (
    data: IGetCollectionByIdPayload
  ) => Promise<AxiosResponse<IGetCollectionByIdResponse, any>> = ({ id }) =>
    $apiWithToken.get(`/collections/${id}`);
  checkAbilityToBuy: (
    data: ICheckAbilityToBuyPayload
  ) => Promise<AxiosResponse<ICheckAbilityToBuyResponse, any>> = ({ id }) =>
    $apiWithToken.get(`/collections/${id}/check-ability-to-buy`);
}

export default HTTPNFTCollectionRepo;
