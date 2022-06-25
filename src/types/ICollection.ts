export interface ITrait {
  type: string;
  values: string[];
  description: string;
}

export enum TraitTypes {
  string = 'string',
  date = 'date',
  integer = 'integer',
  boolean = 'boolean',
}
export interface ITraitNFT {
  key: string;
  value: string;
  type: TraitTypes;
  count: number;
}

export interface ICollection {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: any;
  name: string;
  symbol: string;
  description: string;
  imageUrl: any;
  dropDate: Date;
  generative: boolean;
  rarities: string[];
  redeemable?: boolean;
  redeemOptions?: string[];
  distribution: string;
  auctionEndDate?: any;
  traits: ITrait[];
  published: boolean;
  publishedAt: Date;
  smartContractAddress: string;
  status: string;
  gasFee?: string;
}
