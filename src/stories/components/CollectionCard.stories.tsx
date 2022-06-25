import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { collection } from 'src/__mocks__/collection';
import { MockFilterStore } from 'src/storage/mockFilterStore';
import { CollectionCard } from '@components/Card/CollectionCard';

export default {
  title: 'Components/CollectionCard',
  component: CollectionCard,
} as ComponentMeta<typeof CollectionCard>;

const Template: ComponentStory<typeof CollectionCard> = (args) => (
  <MockFilterStore>
    <CollectionCard {...args} />
  </MockFilterStore>
);

export const DefaultCard = Template.bind({});
DefaultCard.args = {
  item: collection,
};
