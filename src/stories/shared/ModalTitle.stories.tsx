import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ModalTitle from '@shared/ModalTitle';

export default {
  title: 'Shared/ModalTitle',
  component: ModalTitle,
} as ComponentMeta<typeof ModalTitle>;

const Template: ComponentStory<typeof ModalTitle> = (args) => (
  <ModalTitle {...args} />
);

export const DefaultModalTitle = Template.bind({});
DefaultModalTitle.args = {
  highLightedText: 'Modal Title',
};
