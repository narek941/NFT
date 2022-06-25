import { ICardItem } from '@components/Card/Card';
import { ICollection } from '@type/ICollection';
import { INFT } from '@type/nft';
import { IMyNFT } from '@type/ntf-token';
import { format, isValid } from 'date-fns';

export const getNFTOwnerId = (nft: INFT): number | undefined => {
  if (!nft || !nft.tokens || nft.tokens.length === 0) {
    return;
  }

  return nft?.tokens?.[0].user?.id;
};

export const createCardItemFromNFt = (nft: any) => {
  const item: ICardItem = {
    id: nft.id,
    name: nft.name,
    description: nft.description,
    price: nft.price,
    imageUrl: nft.mediaUrl,
    mediaType: nft.mediaType,
    preview: nft.mediaPreviewUrl,
    supply: nft.supply,
    availableSupply: nft.availableSupply,
    ownerId: getNFTOwnerId(nft),
    rarity: nft.rarity,
    rarityScore: nft.rarityScore,
    utilityType: nft.utilityType,
    mergeable: nft.mergeable,
    likes: nft.likes,
    liked: nft.liked,
    openSeaLink: nft.openSeaLink,
    rarityRank: nft.rarityRank,
    ...(nft.collection && { distribution: nft.collection?.distribution }),
  };
  return item;
};

export const createCardItemFromNFTToken = (token: IMyNFT) => {
  const item: ICardItem = {
    ...token,
    id: token.id, //token ID
    name: token.nft.name,
    description: token.nft.description,
    price: token.nft.price,
    imageUrl: token.nft.mediaUrl,
    mediaUrl: token.nft.mediaUrl,
    supply: token.nft.supply,
    availableSupply: token.nft.availableSupply,
    ownerId: token.nft.collection.whitelabel.id,
    rarity: token.nft.rarity,
    rarityScore: token.nft.rarityScore,
    utilityType: token.nft.utilityType,
    rarityRank: token.nft.rarityRank,
  };
  return item;
};

export const createCardItemFromCollection = (collection: ICollection) => {
  const item: ICardItem = {
    id: collection.id,
    name: collection.name,
    description: collection.description,
    price: '41841.79',
    imageUrl: collection.imageUrl,
  };

  return item;
};

export const renderTraitIndex = (index: number): string => {
  if (index < 9) {
    return `0${index + 1}.`;
  }
  return `${index + 1}.`;
};

export const renderDescription = (
  value: string,
  dateFormat = 'dd/MM/yyyy'
): string => {
  const valueArr = value.split('-');
  if (valueArr.length !== 3) {
    return value;
  }
  const date = new Date(+valueArr[0], +valueArr[1] - 1, +valueArr[2]);
  if (!isValid(date)) {
    return value;
  }
  return format(date, dateFormat || 'dd/MM/yyyy');
};

export const handleTraitBooleanValue = (value): string => {
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }
  return value;
};
