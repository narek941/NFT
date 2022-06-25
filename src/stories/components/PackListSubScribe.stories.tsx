import PacksListSubScribe from '@components/PacksSubscribe';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { packs } from 'src/__mocks__/packSubscribe';
import { IPackItem } from '@type/general';

export default {
  title: 'Components/PacksListSubScribe',
  component: PacksListSubScribe,
} as ComponentMeta<typeof PacksListSubScribe>;

const Template: ComponentStory<typeof PacksListSubScribe> = (args) => (
  <div
    style={{
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 0 48px',
    }}
  >
    <PacksListSubScribe {...args} />
  </div>
);

export const DefaultPackList = Template.bind({});
DefaultPackList.args = {
  packs,
  onCardClick: (pack: IPackItem) => console.log('pack is clicked: ', pack),
  onBuyPack: (pack: IPackItem) => console.log('pack button is clicked: ', pack),
};
