import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ModalSubtitle from '@shared/ModalSubtitle';

export default {
  title: 'Shared/ModalSubtitle',
  component: ModalSubtitle,
} as ComponentMeta<typeof ModalSubtitle>;

const Template: ComponentStory<typeof ModalSubtitle> = (args) => (
  <ModalSubtitle {...args} />
);

export const BoldModalSubtitle = Template.bind({});
BoldModalSubtitle.args = {
  text: 'test',
  style: 'bold',
};

export const DefaultModalSubtitle = Template.bind({});
DefaultModalSubtitle.args = {
  text: 'test',
};
