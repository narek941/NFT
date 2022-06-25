interface IContentRule {
  epic: number;
  rare: number;
  common: number;
  legendary: number;
}

interface ITrait {
  type: string;
  description: string;
  values: string[];
}

interface IWhitelabel {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: any;
  name: string;
  email: string;
}

interface ICollection {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: any;
  name: string;
  symbol: string;
  description: string;
  imageUrl: string;
  dropDate: Date;
  generative: boolean;
  rarities: string[];
  redeemable: boolean;
  redeemOptions?: any;
  distribution: string;
  auctionEndDate?: any;
  traits: ITrait[];
  published: boolean;
  publishedAt: Date;
  smartContractAddress: string;
  status: string;
  whitelabel: IWhitelabel;
}

interface IPack {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: any;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  supply: number;
  quantity: number;
  availableSupply: number;
  contentRule: IContentRule;
  collection: ICollection;
}

export interface IMyPack {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: any;
  opened: boolean;
  pack: IPack;
}
