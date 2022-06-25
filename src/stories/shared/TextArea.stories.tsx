import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TextArea from '@shared/TextArea';

export default {
  title: 'Shared/TextArea',
  component: TextArea,
} as ComponentMeta<typeof TextArea>;

const Template: ComponentStory<typeof TextArea> = (args) => (
  <TextArea {...args} />
);

export const DefaultTextArea = Template.bind({});
DefaultTextArea.args = {
  placeholder: 'Enter your description',
};
export const TextAreaWhitLabel = Template.bind({});
TextAreaWhitLabel.args = {
  labelText: 'Bio',
  placeholder: 'Enter your bio',
  size: 'l',
};
export const ErrorTextArea = Template.bind({});
ErrorTextArea.args = {
  error: { type: 'required', message: 'This is required message' },
};
