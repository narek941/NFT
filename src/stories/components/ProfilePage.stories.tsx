import { ICardItem } from '@components/Card/Card';
import { ProfilePageComponent } from '@components/profile/ProfilePage/ProfilePageComponent';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IPack } from 'src/common/models/pack';
import { nftList } from 'src/__mocks__/nftList';
import { packs } from 'src/__mocks__/packs';

export default {
  title: 'Components/ProfilePage',
  component: ProfilePageComponent,
} as ComponentMeta<typeof ProfilePageComponent>;

const Template: ComponentStory<typeof ProfilePageComponent> = (args) => (
  <div style={{ width: '100%' }}>
    <ProfilePageComponent {...args} />
  </div>
);

export const DefaultProfilePage = Template.bind({});
DefaultProfilePage.args = {
  nftList: nftList,
  packList: packs,
  onNFTCardClick: (item: ICardItem) =>
    console.log('nft card is clicked: ', item),
  onPackCardClick: (pack: IPack) => console.log('pack card is clicked: ', pack),
  onPackAction: (pack: IPack) => console.log('on pack action: ', pack),
};
