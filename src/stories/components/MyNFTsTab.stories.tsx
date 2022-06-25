import { ComponentMeta, ComponentStory } from '@storybook/react';
import { MyNFTsTab } from '@components/profile/MyNFTsTab';
import { nftList } from 'src/__mocks__/nftList';
import { collectionList } from 'src/__mocks__/collectionList';
import { MockFilterStore } from 'src/storage/mockFilterStore';

export default {
  title: 'Components/MyNFTsTab',
  component: MyNFTsTab,
} as ComponentMeta<typeof MyNFTsTab>;

const Template: ComponentStory<typeof MyNFTsTab> = (args) => (
  <MockFilterStore>
    <MyNFTsTab {...args} />
  </MockFilterStore>
);

export const DefaultTab = Template.bind({});
DefaultTab.args = {
  nftList,
  collections: collectionList,
  onWithdraw: (nft) => {
    console.log(nft);
  },
};
