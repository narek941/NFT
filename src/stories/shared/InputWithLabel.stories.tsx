import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import InputWithLabel from '@shared/InputWithLabel';

export default {
  title: 'Shared/InputWithLabel',
  component: InputWithLabel,
} as ComponentMeta<typeof InputWithLabel>;

const Template: ComponentStory<typeof InputWithLabel> = (args) => (
  <InputWithLabel {...args} />
);

export const DefaultInputWithLabel = Template.bind({});
DefaultInputWithLabel.args = {
  labelText: 'Username',
};
