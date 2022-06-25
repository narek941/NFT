import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Collection } from '@components/Collection';
import { MockFilterStore } from 'src/storage/mockFilterStore';
import { collectionList } from 'src/__mocks__/collectionList';

export default {
  title: 'Components/Collection',
  component: Collection,
} as ComponentMeta<typeof Collection>;

const Template: ComponentStory<typeof Collection> = (args) => (
  <MockFilterStore>
    <Collection {...args} />
  </MockFilterStore>
);

export const DefaultCollection = Template.bind({});
DefaultCollection.args = {
  list: collectionList,
  totalCount: collectionList.length,
};
