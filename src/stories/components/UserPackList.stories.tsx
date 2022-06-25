import { UserPackList } from '@components/pack/UserPackList';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IPack } from 'src/common/models/pack';
import { packs } from 'src/__mocks__/packs';

export default {
  title: 'Components/UserPackList',
  component: UserPackList,
} as ComponentMeta<typeof UserPackList>;

const userPacks = packs.map((item) => {
  const newPack = { ...item };
  item.packsNft = [];
  return newPack;
});

const Template: ComponentStory<typeof UserPackList> = (args) => (
  <div style={{ width: '100%' }}>
    <UserPackList {...args} />
  </div>
);

export const DefaultUserPackList = Template.bind({});
DefaultUserPackList.args = {
  packs: userPacks,
  onCardClick: (pack: IPack) => console.log('pack is clicked: ', pack),
  onPackAction: (pack: IPack) => console.log('pack is opening: ', pack),
};
