import { nft } from './nft';

const nft0 = { ...nft };
nft0.id = 0;
nft0.name = 'NFT 0';
nft0.rarity = 'rare';
nft0.mergeable = false;

const nft1 = { ...nft };
nft1.id = 1;
nft1.name = 'NFT 1';
nft1.rarity = 'common';
nft1.mergeable = false;

const nft2 = { ...nft };
nft2.id = 2;
nft2.name = 'NFT 2';
nft0.rarity = 'rare';
nft0.mergeable = false;

const nft3 = { ...nft };
nft3.id = 3;
nft3.name = 'NFT 3';
nft3.rarity = 'common';
nft3.mergeable = false;
nft3.utilityType = null;

const nft4 = { ...nft };
nft4.id = 4;
nft4.name = 'NFT 4';
nft4.rarity = 'rare';
nft4.utilityType = null;
nft4.price = '200';

const nft5 = { ...nft };
nft5.id = 5;
nft5.name = 'NFT 5';
nft5.utilityType = null;
nft5.price = '200';

const nft6 = { ...nft };
nft6.id = 6;
nft6.name = 'NFT 6';
nft6.utilityType = null;
nft6.price = '200';

const nft7 = { ...nft };
nft7.id = 7;
nft7.name = 'NFT 7';
nft7.utilityType = null;
nft7.price = '300';

const nft8 = { ...nft };
nft8.id = 8;
nft8.name = 'NFT 8';
nft8.utilityType = null;
nft8.price = '300';

const nft9 = { ...nft };
nft9.id = 9;
nft9.name = 'NFT 9';
nft9.utilityType = null;
nft9.price = '400';

export const nftList = [
  nft0,
  nft1,
  nft2,
  nft3,
  nft4,
  nft5,
  nft6,
  nft7,
  nft8,
  nft9,
];
