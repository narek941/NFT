import { ICardItem } from '@components/Card/Card';
import { MyProfileTab } from '@components/profile/ MyProfileTab';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IPack } from 'src/common/models/pack';
import { nftList } from 'src/__mocks__/nftList';
import { packs } from 'src/__mocks__/packs';

export default {
  title: 'Components/MyProfileTab',
  component: MyProfileTab,
} as ComponentMeta<typeof MyProfileTab>;

const Template: ComponentStory<typeof MyProfileTab> = (args) => (
  <MyProfileTab {...args} />
);

export const DefaultTab = Template.bind({});
DefaultTab.args = {
  nftList,
  packList: packs,
  onClickHandlers: {
    all: () => console.log('all is clicked'),
    utility: () => console.log('utility is clicked'),
    mergeable: () => console.log('mergeable is clicked'),
    pack: () => console.log('packs is clicked'),
  },
  onNFTCardClick: (nft: ICardItem) => console.log('nft is clicked: ', nft),
  onPackCardClick: (pack: IPack) => console.log('pack is clicked', pack),
  onPackAction: (pack: IPack) => console.log('pack action fired: ', pack),
};
