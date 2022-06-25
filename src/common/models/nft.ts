import { ITraitNFT } from '@type/ICollection';
import { INFT, INFTDetail } from '@type/nft';
import { Empty, INFTFilters, ISorted } from './misc';
import { IMyNFT } from '@type/ntf-token';

export interface NFTState {
  pending: boolean;
  error: string | null;
  totalCount: number;
  likedTotalCount: number;
  list: any[];
  userAllNFT: any[];
  likedList: INFT[];
  nft?: INFTDetail | null;
  redeemOptions?: string[];
  traits?: ITraitNFT[];
  rarities?: { [key: string]: number };
  claimedSuccess?: boolean;
}

export interface IGetCollectionNFTSPayload extends ISorted {
  id: string | string[];
}

export interface IGetCollectionNFTSResponse {
  totalCount: number;
  list: INFT[];
  redeemOptions: string[];
  traits: ITraitNFT[];
  rarities: { [key: string]: number };
}

export interface IGetUserNFTSPayload extends ISorted, INFTFilters {
  isAllNFT?: boolean;
}

export interface IGetBuyNFTPayload extends ISorted, INFTFilters {}

export interface IGetUserNFTSResponse {
  totalCount: number;
  list: IMyNFT[];
  isAllNFT?: boolean;
}

export interface IGetUserLikedNFTSResponse {
  totalCount: number;
  list: INFT[];
}
export interface IGetUserLikedNFTSPayload extends IGetUserNFTSPayload {}

export interface IGetNFTByIdPayload {
  id: number;
}

export interface INFTClaimPayload {
  tokenIds: number[];
}

export interface INFTClaimResponse {
  id: any;
}

export interface IGetNFTByIdResponse extends INFTDetail {}

export interface IGetRedeemNFTSPayload extends ISorted {
  redeemable: boolean;
  search?: string;
}
export interface IGetRedeemNFTSResponse {
  totalCount: number;
  list: IMyNFT[];
}

export interface IRedeemNFTPayload {
  tokenId: number;
}
export interface IRedeemNFTResponse extends Empty {}

export interface ILikeNFTPayload {
  id: number;
  like: boolean;
}
export interface ILikeNFTResponse extends INFTDetail {}
