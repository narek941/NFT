import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { PackCard } from '@components/pack/PackCard';
import { pack } from 'src/__mocks__/pack';
import { IPack } from 'src/common/models/pack';

export default {
  title: 'Components/PackCard',
  component: PackCard,
} as ComponentMeta<typeof PackCard>;

const sold_pack = { ...pack };
sold_pack.availableSupply = 0;

const ownedPack = { ...pack };
ownedPack.packsNft = [];

const Template: ComponentStory<typeof PackCard> = (args) => (
  <PackCard {...args} />
);

export const DefaultCard = Template.bind({});
DefaultCard.args = {
  item: pack,
  onCardClick: (pack: IPack) => console.log('pack is clicked: ', pack),
  onButtonClick: (pack: IPack) => console.log('pack button is clicked: ', pack),
};

export const SoldCard = Template.bind({});
SoldCard.args = {
  item: sold_pack,
  onCardClick: (pack: IPack) => console.log('pack is clicked: ', pack),
  onButtonClick: (pack: IPack) => console.log('pack button is clicked: ', pack),
};

export const OwnedCard = Template.bind({});
OwnedCard.args = {
  item: ownedPack,
  onCardClick: (pack: IPack) => console.log('pack is clicked: ', pack),
  onButtonClick: (pack: IPack) => console.log('pack button is clicked: ', pack),
};
