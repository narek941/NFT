import { collection } from './collection';

export const newMergeNFT = {
  id: 0,
  name: 'Cool Cat #7777',
  price: '100',
  imageUrl:
    'https://niftables-dev-collection-bucket.s3.eu-central-1.amazonaws.com/ad263d57-e07f-46dc-8f0d-ca128a11b973.png',

  description: 'Lorem ipsum 1',
  createdAt: new Date(),
  updatedAt: new Date(),
  supply: 0,
  quantity: 0,
  availableSupply: 2,
  status: 'draft',
  contentRule: {
    epic: 1,
    legendary: 3,
    rare: 0,
    common: 5,
  },
};
