import { ICollection } from './ICollection';

export interface TokenUser {
  id: number;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: any;
  username: string;
  email: string;
  status: string;
}

export interface Token {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: any;
  minted: boolean;
  utilityStatus: 'redeemable' | 'activated';
  user?: TokenUser;
  claimed: boolean;
}

export type IUtilityType = 'activatable' | 'redeemable' | null;

export interface INFT {
  id: number;
  tokenId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: any;
  filename?: string;
  name: string;
  description: string;
  rarity?: string;
  supply?: number;
  mediaType?: string;
  mediaUrl?: string;
  mediaPreviewUrl?: string;
  metadataUrl?: any;
  traits?: Record<string, string>;
  utilityType?: IUtilityType;
  utilityOption?: string | null;
  utilityExperience?: string | null;
  price: string;
  draft?: boolean;
  tokens: Token[];
  availableSupply: number;
  mergeable?: boolean;
  redeem?: string;
  rarityScore?: string;
  rarityRank?: string;
  likes?: Record<string, any>[];
  likesAmount?: string;
  liked?: boolean;
  openSeaLink?: string;
  collection?: ICollection;
}

export interface INFTDetail extends INFT {
  collection?: ICollection;
}
