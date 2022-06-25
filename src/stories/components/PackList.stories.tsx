import { PackList } from '@components/pack/PackList';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IPack } from 'src/common/models/pack';
import { packs } from 'src/__mocks__/packs';

export default {
  title: 'Components/PackList',
  component: PackList,
} as ComponentMeta<typeof PackList>;

const Template: ComponentStory<typeof PackList> = (args) => (
  <div style={{ width: '100%' }}>
    <PackList {...args} />
  </div>
);

export const DefaultPackList = Template.bind({});
DefaultPackList.args = {
  packs,
  onCardClick: (pack: IPack) => console.log('pack is clicked: ', pack),
  onPackAction: (pack: IPack) => console.log('pack button is clicked: ', pack),
};
