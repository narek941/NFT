import { AxiosResponse } from 'axios';
import {
  IGetBuyNFTPayload,
  IGetCollectionNFTSPayload,
  IGetCollectionNFTSResponse,
  IGetNFTByIdPayload,
  IGetNFTByIdResponse,
  IGetUserNFTSPayload,
  IGetUserNFTSResponse,
  IGetRedeemNFTSPayload,
  IGetRedeemNFTSResponse,
  IRedeemNFTPayload,
  IRedeemNFTResponse,
  INFTClaimPayload,
  INFTClaimResponse,
  IGetUserLikedNFTSPayload,
  IGetUserLikedNFTSResponse,
  ILikeNFTPayload,
  ILikeNFTResponse,
} from 'src/common/models/nft';

export interface NFTRepo {
  getCollectionNFTs: (
    data: IGetCollectionNFTSPayload
  ) => Promise<AxiosResponse<IGetCollectionNFTSResponse, any>>;
  getUserNFTs: (
    data: IGetUserNFTSPayload
  ) => Promise<AxiosResponse<IGetUserNFTSResponse, any>>;
  getNFTById: (
    data: IGetNFTByIdPayload
  ) => Promise<AxiosResponse<IGetNFTByIdResponse, any>>;
  getRedeemNFTs: (
    data: IGetRedeemNFTSPayload
  ) => Promise<AxiosResponse<IGetRedeemNFTSResponse, any>>;
  redeemNFT: (
    data: IRedeemNFTPayload
  ) => Promise<AxiosResponse<IRedeemNFTResponse, any>>;
  getBuyNFTs: (
    data: IGetBuyNFTPayload
  ) => Promise<AxiosResponse<IGetCollectionNFTSResponse, any>>;
  claimNFT: (
    data: INFTClaimPayload
  ) => Promise<AxiosResponse<INFTClaimResponse, any>>;
  getUserLikedNFTs: (
    data: IGetUserLikedNFTSPayload
  ) => Promise<AxiosResponse<IGetUserLikedNFTSResponse, any>>;
  likeNFT: (
    data: ILikeNFTPayload
  ) => Promise<AxiosResponse<ILikeNFTResponse, any>>;
}
