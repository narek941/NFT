import { ICollection } from '@type/ICollection';
import { AbilityToBuyValues } from '@type/restriction';
import { INFTFilters, ISorted } from './misc';

export interface NFTCollectionState {
  pending: boolean;
  error: string | null;
  totalCount: number;
  list: ICollection[];
  collection?: ICollection;
  abilityToBuy?: AbilityToBuyValues;
}

export interface IGetCollectionsPayload extends ISorted, INFTFilters {} // todo replace to filter collection interface

export interface IGetCollectionsResponse {
  totalCount: number;
  list: ICollection[];
}

export interface IGetCollectionByIdPayload {
  id: number;
}

export interface IGetCollectionByIdResponse extends ICollection {}
