import { INFTDetail } from '@type/nft';
import { collection } from './collection';

export const nft: INFTDetail = {
  id: 21,
  createdAt: new Date('2022-03-10T12:52:58.382Z'),
  updatedAt: new Date('2022-03-10T12:53:02.145Z'),
  deletedAt: null,
  filename: '5.png',
  name: 'NFT 5',
  description: '',
  rarity: 'legendary',
  supply: 1,
  availableSupply: 1,
  mediaType: 'image/png',
  mediaUrl:
    'https://niftables-dev-collection-bucket.s3.eu-central-1.amazonaws.com/5.png',
  metadataUrl: null,
  price: '100',
  draft: false,
  utilityType: 'activatable',
  utilityExperience: '',
  utilityOption: '',
  mergeable: true,
  tokens: [],
  traits: {},
  collection,
};
