import $api, { $apiWithToken } from 'src/common/api';
import { AxiosResponse } from 'axios';
import {
  IGetCollectionNFTSPayload,
  IGetCollectionNFTSResponse,
  IGetUserNFTSPayload,
  IGetUserNFTSResponse,
  IGetNFTByIdPayload,
  IGetNFTByIdResponse,
  IGetRedeemNFTSPayload,
  IGetRedeemNFTSResponse,
  IRedeemNFTPayload,
  IRedeemNFTResponse,
  IGetBuyNFTPayload,
  INFTClaimPayload,
  INFTClaimResponse,
  ILikeNFTResponse,
  ILikeNFTPayload,
  IGetUserLikedNFTSPayload,
  IGetUserLikedNFTSResponse,
} from 'src/common/models/nft';
import { NFTRepo } from '../model/NFTRepo';

class HTTPNFTRepo implements NFTRepo {
  getCollectionNFTs: (
    data: IGetCollectionNFTSPayload
  ) => Promise<AxiosResponse<IGetCollectionNFTSResponse, any>> = (payload) => {
    const { id, ...params } = payload;
    return $apiWithToken.get(`/collections/${id}/nft`, {
      params,
    });
  };

  getUserNFTs: (
    data: IGetUserNFTSPayload
  ) => Promise<AxiosResponse<IGetUserNFTSResponse, any>> = (params) =>
    $apiWithToken.get('/collections/user-nfts', {
      params,
    });
  getNFTById: (
    data: IGetNFTByIdPayload
  ) => Promise<AxiosResponse<IGetNFTByIdResponse, any>> = ({ id }) =>
    $apiWithToken.get(`collections/nft/${id}`);
  getBuyNFTs: (
    data: IGetBuyNFTPayload
  ) => Promise<AxiosResponse<IGetCollectionNFTSResponse>> = (params) =>
    $apiWithToken.get('/collections/listed-nfts', {
      params,
    });

  getRedeemNFTs: (
    data: IGetRedeemNFTSPayload
  ) => Promise<AxiosResponse<IGetRedeemNFTSResponse, any>> = ({
    take,
    skip,
    sort,
    redeemable,
    search,
  }) =>
    $apiWithToken.get('/collections/user-nfts', {
      params: { skip, take, sort, redeemable, search },
    });

  redeemNFT: (
    data: IRedeemNFTPayload
  ) => Promise<AxiosResponse<IRedeemNFTResponse, any>> = (data) =>
    $apiWithToken.post('/collections/redeem-nft-utility', data);
  claimNFT: (
    data: INFTClaimPayload
  ) => Promise<AxiosResponse<INFTClaimResponse, any>> = (data) =>
    $apiWithToken.post(`collections/nft-claim`, data);

  getUserLikedNFTs: (
    data: IGetUserLikedNFTSPayload
  ) => Promise<AxiosResponse<IGetUserLikedNFTSResponse, any>> = (params) =>
    $apiWithToken.get('/collections/nfts/liked', {
      params,
    });

  likeNFT: (
    data: ILikeNFTPayload
  ) => Promise<AxiosResponse<ILikeNFTResponse, any>> = (data) =>
    $apiWithToken.put('/collections/like', data);
}

export default HTTPNFTRepo;
