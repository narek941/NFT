export enum AbilityToBuyValues {
  SUCCESS = 'success',
  NOT_IN_COLLECTION_WHITELIST = 'Public NFT sale is not live yet.',
  NOT_LAUNCHED_COLLECTION_WHITELIST = 'Public NFT sale is not live yet.',
  EXCEEDED_WHITELIST_LIMIT = 'Public NFT sale is not live yet.',
  EXCEEDED_WHITELIST_LIMIT_PER_USER = 'You have already minted the maximum number of NFTs available per wallet.',
  EXCEEDED_LIMIT_PER_USER = 'You have already minted the maximum number of NFTs available per wallet.',
}

export interface ICheckAbilityToBuyPayload {
  id: number;
}

export interface ICheckAbilityToBuyResponse {}
