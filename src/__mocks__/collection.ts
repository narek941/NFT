export const collection = {
  id: 6,
  createdAt: new Date('2022-02-28T13:57:25.260Z'),
  updatedAt: new Date('2022-02-28T13:59:07.437Z'),
  deletedAt: null,
  name: 'Test Collection',
  symbol: 'TEST',
  description: 'This is a test collection',
  imageUrl:
    'https://niftables-dev-collection-bucket.s3.eu-central-1.amazonaws.com/ad263d57-e07f-46dc-8f0d-ca128a11b973.png',
  dropDate: new Date('2022-09-14T02:35:43.753Z'),
  generative: true,
  rarities: ['common', 'uncommon', 'rare', 'epic', 'legendary', 'good'],
  distribution: 'FIXED_PRICE',
  auctionEndDate: null,
  traits: [
    {
      type: 'string',
      values: ['a', 'b', 'c'],
      description: 'head',
    },
    {
      type: 'string',
      values: ['a', 'b', 'c'],
      description: 'arms',
    },
    {
      type: 'string',
      values: ['a', 'b', 'c'],
      description: 'whristband',
    },
  ],
  published: true,
  publishedAt: new Date('2022-02-28T13:59:07.425Z'),
  smartContractAddress: '0x5A039Cf0e7B64300370f5f953be1E9fc1a335be9',
  status: 'available',
};
