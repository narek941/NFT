interface IWhitelabel {
  id: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  deletedAt?: any;
  name: string;
  email: string;
}

interface ICollection {
  id: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  deletedAt?: any;
  name: string;
  symbol: string;
  description: string;
  imageUrl: string;
  dropDate: Date | string;
  generative: boolean;
  rarities: string[];
  redeemable: boolean;
  redeemOptions: string[];
  distribution: string;
  auctionEndDate?: any;
  traits?: any;
  published: boolean;
  publishedAt: Date | string;
  smartContractAddress: string;
  status: string;
  whitelabel: IWhitelabel;
}

interface INFT {
  id: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  deletedAt?: any;
  filename: string;
  name: string;
  description: string;
  rarity: string;
  rarityScore: string;
  rarityRank?: string;
  supply: number;
  availableSupply: number;
  mediaType: string;
  mediaUrl: string;
  metadataUrl: string;
  traits?: any;
  utilityType: string;
  utilityOption: string;
  utilityExperience: string;
  price: string;
  likesAmount: string;
  collection: ICollection;
  liked: boolean;
}

interface IUser {
  role: string;
  id: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  deletedAt?: any;
  username: string;
  email: string;
  tempEmail?: any;
  status: string;
}

export interface IMyNFT {
  id: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  deletedAt?: any;
  minted: boolean;
  claimed: boolean;
  utilityStatus: string;
  nft: INFT;
  user: IUser;
}
