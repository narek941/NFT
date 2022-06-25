import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Input from '@shared/Input';

export default {
  title: 'Shared/Input',
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const DefaultInput = Template.bind({});
DefaultInput.args = {};

export const InvalidInput = Template.bind({});
InvalidInput.args = {
  isValid: true,
};

export const ErrorInput = Template.bind({});
ErrorInput.args = {
  error: { type: 'required', message: 'This is required message' },
};
export const customTypeInput = Template.bind({});
customTypeInput.args = {
  customType: 'password',
};
