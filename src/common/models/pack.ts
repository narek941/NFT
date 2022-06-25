import { ICollection } from '@type/ICollection';
import { INFT } from '@type/nft';
import { AnyProperties, Empty, ISorted, NumberProps } from './misc';

export interface IPackNFT {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: any;
  opened: boolean;
}

export interface IPack {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: any;
  imageUrl?: string;
  name: string;
  price: string;
  collection: ICollection;
  description: string;
  supply: number;
  quantity: number;
  availableSupply: number;
  status: string;
  contentRule: NumberProps;
  packsNft?: IPackNFT[];
}

export interface PackState {
  pending: boolean;
  error: string | null;
  totalCount?: number;
  list: IPack[];
  pack?: IPack;
  rarities?: object;
  revealedNFT?: INFT;
}

export interface IGetPacksPayload extends ISorted {}

export interface IGetPacksResponse {
  totalCount: number;
  list: IPack[];
  rarities: AnyProperties;
}

export interface IGetUserPacksPayload extends ISorted {}

export interface IGetUserPacksResponse {
  totalCount: number;
  list: IPack[];
}

export interface IGetPackByIdPayload {
  id: number;
}

export interface IGetPackByIdResponse extends IPack {}

export interface IBuyPackPayload {
  id: number;
}

export interface IBuyPackResponse extends Empty {}

export interface IOpenPackPayload {
  id: number;
}

export interface IOpenPackResponse extends Array<INFT> {}
