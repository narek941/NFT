import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Card } from '@components/Card';
import { collection } from 'src/__mocks__/collection';
import { nft } from 'src/__mocks__/nft';
import { ICardItem } from '@components/Card/Card';
import { createCardItemFromNFt } from '@utils/nftUtils';
import { MockFilterStore } from 'src/storage/mockFilterStore';

export default {
  title: 'Components/Card',
  component: Card,
} as ComponentMeta<typeof Card>;

const ownedItem: ICardItem = createCardItemFromNFt(nft);

const Template: ComponentStory<typeof Card> = (args) => (
  <MockFilterStore>
    <Card {...args} />
  </MockFilterStore>
);

export const DefaultCard = Template.bind({});
DefaultCard.args = {
  item: {
    id: collection.id,
    name: collection.name,
    description: collection.description,
    price: '41841.79',
    imageUrl: collection.imageUrl,
  },
  onClick: () => {},
  isLarge: true,
};

export const NFTCard = Template.bind({});
NFTCard.args = {
  item: nft,
  isNFTEntity: true,
  onClick: () => console.log('on card click'),
};

export const NFTLikeCard = Template.bind({});
NFTLikeCard.args = {
  item: nft,
  isNFTEntity: true,
  showLike: true,
  onClick: () => console.log('on card click'),
};

export const LargeNFTCard = Template.bind({});
LargeNFTCard.args = {
  item: nft,
  isNFTEntity: true,
  onClick: () => console.log('on card click'),
  isLarge: true,
};

export const OwnedNFTCard = Template.bind({});
NFTCard.args = {
  item: ownedItem,
  isNFTEntity: true,
  onClick: () => console.log('on card click'),
};
