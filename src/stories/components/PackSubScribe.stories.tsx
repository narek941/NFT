import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { PackItemSubscribe } from '@components/PacksSubscribe/PackItemSubscribe';
import { pack } from 'src/__mocks__/packSubscribe';
import { IPackItem } from '@type/general';

export default {
  title: 'Components/PackItemSubscribe',
  component: PackItemSubscribe,
} as ComponentMeta<typeof PackItemSubscribe>;

const Template: ComponentStory<typeof PackItemSubscribe> = (args) => (
  <div
    style={{
      padding: '20px',
      margin: '0 auto',
      maxWidth: '370px',
      width: '100%',
    }}
  >
    <PackItemSubscribe {...args} />
  </div>
);

export const DefaultCard = Template.bind({});
DefaultCard.args = {
  item: pack,
  onCardClick: (pack: IPackItem) => console.log('pack is clicked: ', pack),
  onButtonClick: (pack: IPackItem) =>
    console.log('pack button is clicked: ', pack),
};
