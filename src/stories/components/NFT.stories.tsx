import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import NFTsToBuy from '@components/nft';
import { MockFilterStore } from 'src/storage/mockFilterStore';
import { nftList } from 'src/__mocks__/nftList';

export default {
  title: 'Components/NFTsToBuy',
  component: NFTsToBuy,
} as ComponentMeta<typeof NFTsToBuy>;

const Template: ComponentStory<typeof NFTsToBuy> = (args) => (
  <MockFilterStore>
    <NFTsToBuy {...args} />
  </MockFilterStore>
);

export const DefaultNFT = Template.bind({});
DefaultNFT.args = {};
