import { AxiosResponse } from 'axios';
import {
  IGetCollectionByIdPayload,
  IGetCollectionByIdResponse,
  IGetCollectionsPayload,
  IGetCollectionsResponse,
} from 'src/common/models/nftCollection';
import {
  ICheckAbilityToBuyPayload,
  ICheckAbilityToBuyResponse,
} from '@type/restriction';

export interface NFTCollectionRepo {
  getCollections: (
    data: IGetCollectionsPayload
  ) => Promise<AxiosResponse<IGetCollectionsResponse, any>>;
  getCollectionById: (
    data: IGetCollectionByIdPayload
  ) => Promise<AxiosResponse<IGetCollectionByIdResponse, any>>;
  checkAbilityToBuy: (
    data: ICheckAbilityToBuyPayload
  ) => Promise<AxiosResponse<ICheckAbilityToBuyResponse, any>>;
}
